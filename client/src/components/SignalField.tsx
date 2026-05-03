/*
 * SignalField — Unscaled "Signal in the Void"
 *
 * Features:
 * - Canvas particle field with proximity triangulation lines
 * - Named nodes: pulse, permanent micro-labels, hover ripple
 * - Drag named nodes (mouse + touch): surrounding particles are repelled
 *   with spring-back physics when released
 * - ~25% background particles drift with slow sinusoidal breathing
 *
 * Performance optimizations:
 * 1. Spatial grid for line detection (O(n) instead of O(n²))
 * 2. Early distance checks to avoid unnecessary sqrt
 * 3. Batched Canvas state changes
 * 4. Tooltip via ref instead of state (no re-render)
 */

import { useCallback, useEffect, useRef, useState } from "react";

export interface NavNode {
  id: string;
  label: string;
  url: string;
  nx?: number;
  ny?: number;
}

interface Particle {
  x: number;
  y: number;
  tx: number;
  ty: number;
  dispX: number;
  dispY: number;
  velX: number;
  velY: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  isNamed: boolean;
  node?: NavNode;
  breathPhase: number;
  breathSpeed: number;
  breathAmp: number;
  rippleRadius: number;
  rippleOpacity: number;
  rippleActive: boolean;
  entranceT: number;
  entranceDelay: number;
  entranceDone: boolean;
  drifting: boolean;
  driftPhaseX: number;
  driftPhaseY: number;
  driftSpeedX: number;
  driftSpeedY: number;
  driftAmpX: number;
  driftAmpY: number;
}

export interface SignalFieldProps {
  nodes: NavNode[];
}

const BG_COUNT = 100;
const MAX_DIST = 140;
const NAMED_R = 5.0;
const BG_R_MIN = 0.9;
const BG_R_MAX = 2.4;

const REPEL_RADIUS = 120;
const REPEL_STRENGTH = 0.9;
const SPRING_K = 0.055;
const DAMPING = 0.78;

// Spatial grid cell size for line detection
const GRID_CELL_SIZE = 180;

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

const NAMED_POSITIONS = [
  { nx: 0.42, ny: 0.38 },
  { nx: 0.68, ny: 0.28 },
  { nx: 0.55, ny: 0.62 },
  { nx: 0.78, ny: 0.58 },
  { nx: 0.35, ny: 0.70 },
  { nx: 0.82, ny: 0.38 },
  { nx: 0.60, ny: 0.80 },
  { nx: 0.72, ny: 0.72 },
];

// Spatial grid for fast neighbor lookup
class SpatialGrid {
  private cells: Map<string, Particle[]> = new Map();
  private cellSize: number;

  constructor(cellSize: number) {
    this.cellSize = cellSize;
  }

  clear() {
    this.cells.clear();
  }

  insert(p: Particle) {
    const key = this.getCellKey(p.x, p.y);
    if (!this.cells.has(key)) {
      this.cells.set(key, []);
    }
    this.cells.get(key)!.push(p);
  }

  getNeighbors(x: number, y: number, radius: number): Particle[] {
    const neighbors: Particle[] = [];
    const cellX = Math.floor(x / this.cellSize);
    const cellY = Math.floor(y / this.cellSize);
    const cellRadius = Math.ceil(radius / this.cellSize);

    for (let dx = -cellRadius; dx <= cellRadius; dx++) {
      for (let dy = -cellRadius; dy <= cellRadius; dy++) {
        const key = `${cellX + dx},${cellY + dy}`;
        const cell = this.cells.get(key);
        if (cell) {
          neighbors.push(...cell);
        }
      }
    }
    return neighbors;
  }

  private getCellKey(x: number, y: number): string {
    const cellX = Math.floor(x / this.cellSize);
    const cellY = Math.floor(y / this.cellSize);
    return `${cellX},${cellY}`;
  }
}

export default function SignalField({ nodes }: SignalFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);
  const hoveredRef = useRef<Particle | null>(null);
  const draggedRef = useRef<Particle | null>(null);
  const dragOffsetRef = useRef({ dx: 0, dy: 0 });
  const sizeRef = useRef({ w: 0, h: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);
  const gridRef = useRef(new SpatialGrid(GRID_CELL_SIZE));
  
  // Tooltip via ref instead of state — no re-render
  const tooltipRef = useRef<{
    x: number;
    y: number;
    label: string;
    visible: boolean;
  }>({ x: 0, y: 0, label: "", visible: false });
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    label: string;
    visible: boolean;
  }>({ x: 0, y: 0, label: "", visible: false });

  const initParticles = useCallback(
    (w: number, h: number) => {
      const list: Particle[] = [];

      nodes.forEach((node, i) => {
        const pos = NAMED_POSITIONS[i % NAMED_POSITIONS.length];
        const nx = node.nx ?? pos.nx;
        const ny = node.ny ?? pos.ny;
        const tx = nx * w;
        const ty = ny * h;
        const sa = rand(0, Math.PI * 2);
        const sd = rand(60, 180);
        list.push({
          x: tx + Math.cos(sa) * sd,
          y: ty + Math.sin(sa) * sd,
          tx, ty,
          dispX: 0, dispY: 0,
          velX: 0, velY: 0,
          vx: 0, vy: 0,
          radius: NAMED_R,
          opacity: 1,
          isNamed: true,
          node,
          breathPhase: rand(0, Math.PI * 2),
          breathSpeed: rand(0.005, 0.008),
          breathAmp: 0.20,
          rippleRadius: 0,
          rippleOpacity: 0,
          rippleActive: false,
          entranceT: 0,
          entranceDelay: i * 6,
          entranceDone: false,
          drifting: false,
          driftPhaseX: 0, driftPhaseY: 0,
          driftSpeedX: 0, driftSpeedY: 0,
          driftAmpX: 0, driftAmpY: 0,
        });
      });

      for (let i = 0; i < BG_COUNT; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const drifting = Math.random() < 0.25;
        list.push({
          x, y,
          tx: x, ty: y,
          dispX: 0, dispY: 0,
          velX: 0, velY: 0,
          vx: 0, vy: 0,
          radius: rand(BG_R_MIN, BG_R_MAX),
          opacity: rand(0.35, 0.65),
          isNamed: false,
          breathPhase: rand(0, Math.PI * 2),
          breathSpeed: rand(0.003, 0.006),
          breathAmp: 0.15,
          rippleRadius: 0,
          rippleOpacity: 0,
          rippleActive: false,
          entranceT: 0,
          entranceDelay: rand(0, 60),
          entranceDone: false,
          drifting,
          driftPhaseX: rand(0, Math.PI * 2),
          driftPhaseY: rand(0, Math.PI * 2),
          driftSpeedX: rand(0.008, 0.018),
          driftSpeedY: rand(0.008, 0.018),
          driftAmpX: rand(4, 10),
          driftAmpY: rand(4, 10),
        });
      }

      return list;
    },
    [nodes]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const w = container.clientWidth;
    const h = container.clientHeight;
    canvas.width = w;
    canvas.height = h;
    sizeRef.current = { w, h };

    particlesRef.current = initParticles(w, h);

    const tick = () => {
      const ps = particlesRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      frameRef.current++;
      const dragged = draggedRef.current;

      // Update particles
      for (const p of ps) {
        p.entranceT += 0.016;

        if (!p.entranceDone) {
          if (p.entranceT >= p.entranceDelay + 0.85) {
            p.entranceDone = true;
          }
        } else if (p === dragged) {
          // Dragged node — apply repulsion
          // Optimization 2: Use spatial grid to find nearby particles
          const neighbors = gridRef.current.getNeighbors(p.x, p.y, REPEL_RADIUS);
          for (const q of neighbors) {
            if (q === p || !q.entranceDone) continue;
            const dx = q.tx + q.dispX - p.x;
            const dy = q.ty + q.dispY - p.y;
            const distSq = dx * dx + dy * dy;
            // Early distance check: avoid sqrt if too far
            if (distSq > REPEL_RADIUS * REPEL_RADIUS) continue;
            const dist = Math.sqrt(distSq);
            if (dist > 0) {
              const force = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH;
              q.velX -= (dx / dist) * force;
              q.velY -= (dy / dist) * force;
            }
          }
        } else if (!p.isNamed) {
          // Spring back toward anchor + drift
          p.velX += -SPRING_K * p.dispX;
          p.velY += -SPRING_K * p.dispY;
          p.velX *= DAMPING;
          p.velY *= DAMPING;
          p.dispX += p.velX;
          p.dispY += p.velY;

          if (p.drifting) {
            p.driftPhaseX += p.driftSpeedX;
            p.driftPhaseY += p.driftSpeedY;
            p.x = p.tx + p.dispX + Math.sin(p.driftPhaseX) * p.driftAmpX;
            p.y = p.ty + p.dispY + Math.sin(p.driftPhaseY) * p.driftAmpY;
          } else {
            p.x = p.tx + p.dispX;
            p.y = p.ty + p.dispY;
          }
        } else if (p.isNamed && p !== dragged) {
          p.x = p.tx;
          p.y = p.ty;
        }

        p.breathPhase += p.breathSpeed;

        if (p.rippleActive) {
          p.rippleRadius += 1.5;
          p.rippleOpacity -= 0.014;
          if (p.rippleOpacity <= 0) {
            p.rippleActive = false;
            p.rippleRadius = 0;
            p.rippleOpacity = 0;
          }
        }
      }

      // Build spatial grid for line detection
      gridRef.current.clear();
      for (const p of ps) {
        gridRef.current.insert(p);
      }

      // Clear canvas
      ctx.fillStyle = "oklch(0.98 0.008 85)";
      ctx.fillRect(0, 0, w, h);

      const entryOp = (p: Particle) => {
        if (p.entranceDone) return 1;
        return easeOutExpo(Math.max(0, p.entranceT - 0.15) / 0.85);
      };

      // Optimization 1: Use spatial grid for line detection
      // Only check neighbors within grid cells
      const linesByStyle: Map<string, Array<[number, number, number, number]>> = new Map();

      for (let i = 0; i < ps.length; i++) {
        const a = ps[i];
        if (entryOp(a) < 0.1) continue;

        const neighbors = gridRef.current.getNeighbors(a.x, a.y, MAX_DIST);
        for (const b of neighbors) {
          const bIdx = ps.indexOf(b);
          if (bIdx <= i) continue; // Avoid duplicate lines
          if (entryOp(b) < 0.1) continue;

          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distSq = dx * dx + dy * dy;
          const maxDistSq = MAX_DIST * MAX_DIST;
          if (distSq >= maxDistSq) continue;

          const dist = Math.sqrt(distSq);
          const distAlpha = (1 - dist / MAX_DIST) * 0.30;
          const eo = Math.min(entryOp(a), entryOp(b));

          const isHovLine =
            (a === hoveredRef.current || b === hoveredRef.current) &&
            (a.isNamed || b.isNamed);
          const isDragLine = a === dragged || b === dragged;
          const isNamedLine = a.isNamed || b.isNamed;

          // Optimization 3: Batch lines by style
          let style: string;
          let lineWidth: number;
          if (isDragLine) {
            style = `rgba(64,64,192,${Math.min(distAlpha * 4.5, 0.85) * eo})`;
            lineWidth = 1.1;
          } else if (isHovLine) {
            style = `rgba(64,64,192,${Math.min(distAlpha * 3.5, 0.7) * eo})`;
            lineWidth = 0.9;
          } else if (isNamedLine) {
            style = `rgba(64,64,192,${distAlpha * 0.55 * eo})`;
            lineWidth = 0.5;
          } else {
            style = `rgba(190,182,170,${distAlpha * eo})`;
            lineWidth = 0.4;
          }

          const key = `${style}|${lineWidth}`;
          if (!linesByStyle.has(key)) {
            linesByStyle.set(key, []);
          }
          linesByStyle.get(key)!.push([a.x, a.y, b.x, b.y]);
        }
      }

      // Draw batched lines
      linesByStyle.forEach((lines, key) => {
        const parts = key.split("|");
        const style = parts[0];
        const lineWidthStr = parts[1];
        ctx.strokeStyle = style;
        ctx.lineWidth = parseFloat(lineWidthStr);
        for (const line of lines) {
          const [x1, y1, x2, y2] = line;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
      });

      // Draw particles
      for (const p of ps) {
        const eo = entryOp(p);
        if (eo < 0.01) continue;

        const r = p.radius;
        const isHov = p === hoveredRef.current;
        const isDrag = p === dragged;
        const fo = p.opacity * eo;

        if (p.isNamed) {
          // Ripple
          if (p.rippleActive && p.rippleOpacity > 0) {
            ctx.strokeStyle = `rgba(64,64,192,${p.rippleOpacity * 0.6 * eo})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.rippleRadius, 0, Math.PI * 2);
            ctx.stroke();
          }

          // Core circle
          ctx.beginPath();
          ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
          const pulseAmp = 0.4 + Math.sin(p.breathPhase) * 0.3;
          ctx.fillStyle = `rgba(64,64,192,${fo * (isHov ? 0.95 : isDrag ? 1 : pulseAmp)})`;
          ctx.fill();

          // Micro-label
          if (eo > 0.6 && !isHov && !isDrag) {
            ctx.font = `400 9px 'Space Mono', monospace`;
            ctx.fillStyle = `rgba(64,64,192,${fo * 0.55})`;
            ctx.textAlign = "center";
            ctx.fillText(p.node!.label.toUpperCase(), p.x, p.y - r * 2.2 - 4);
          }
          // Larger label while dragging
          if (isDrag) {
            ctx.font = `700 11px 'Space Mono', monospace`;
            ctx.fillStyle = `rgba(64,64,192,${fo * 0.9})`;
            ctx.textAlign = "center";
            ctx.fillText(p.node!.label.toUpperCase(), p.x, p.y - r * 2.8 - 6);
          }
        } else {
          const opBase = p.opacity * (1 + Math.sin(p.breathPhase) * p.breathAmp * 0.5);
          ctx.beginPath();
          ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(165,157,145,${Math.min(opBase, 0.52) * eo})`;
          ctx.fill();
        }
      }

      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, [initParticles]);

  const getCanvasPos = useCallback(
    (clientX: number, clientY: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return { x: 0, y: 0 };
      const rect = canvas.getBoundingClientRect();
      return { x: clientX - rect.left, y: clientY - rect.top };
    },
    []
  );

  const findNamedAt = useCallback((cx: number, cy: number) => {
    for (const p of particlesRef.current) {
      if (!p.isNamed) continue;
      const dx = p.x - cx;
      const dy = p.y - cy;
      if (Math.sqrt(dx * dx + dy * dy) < NAMED_R * 6) return p;
    }
    return null;
  }, []);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const { x, y } = getCanvasPos(e.clientX, e.clientY);
      const found = findNamedAt(x, y);
      if (found) {
        draggedRef.current = found;
        dragOffsetRef.current = { dx: found.x - x, dy: found.y - y };
        hoveredRef.current = found;
        tooltipRef.current = { x: found.x, y: found.y, label: found.node!.label, visible: true };
        setTooltip(tooltipRef.current);
        (e.target as HTMLCanvasElement).style.cursor = "grabbing";
        e.preventDefault();
      }
    },
    [getCanvasPos, findNamedAt]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const { x, y } = getCanvasPos(e.clientX, e.clientY);

      if (draggedRef.current) {
        const p = draggedRef.current;
        p.x = x + dragOffsetRef.current.dx;
        p.y = y + dragOffsetRef.current.dy;
        tooltipRef.current = { x: p.x, y: p.y, label: p.node!.label, visible: true };
        // Only update state every 3 frames to reduce re-renders
        if (frameRef.current % 3 === 0) {
          setTooltip(tooltipRef.current);
        }
        return;
      }

      const found = findNamedAt(x, y);
      if (found !== hoveredRef.current) {
        hoveredRef.current = found;
        if (found) {
          found.rippleRadius = found.radius * 1.1;
          found.rippleOpacity = 0.6;
          found.rippleActive = true;
          tooltipRef.current = { x: found.x, y: found.y, label: found.node!.label, visible: true };
          setTooltip(tooltipRef.current);
          canvas.style.cursor = "grab";
        } else {
          tooltipRef.current = { ...tooltipRef.current, visible: false };
          setTooltip(tooltipRef.current);
          canvas.style.cursor = "default";
        }
      }
    },
    [getCanvasPos, findNamedAt]
  );

  const handleMouseUp = useCallback(() => {
    draggedRef.current = null;
  }, []);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLCanvasElement>) => {
      const touch = e.touches[0];
      if (!touch) return;
      const { x, y } = getCanvasPos(touch.clientX, touch.clientY);
      const found = findNamedAt(x, y);
      if (found) {
        draggedRef.current = found;
        dragOffsetRef.current = { dx: found.x - x, dy: found.y - y };
        hoveredRef.current = found;
        tooltipRef.current = { x: found.x, y: found.y, label: found.node!.label, visible: true };
        setTooltip(tooltipRef.current);
        e.preventDefault();
      }
    },
    [getCanvasPos, findNamedAt]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLCanvasElement>) => {
      const touch = e.touches[0];
      if (!touch || !draggedRef.current) return;
      const { x, y } = getCanvasPos(touch.clientX, touch.clientY);
      const p = draggedRef.current;
      p.x = x + dragOffsetRef.current.dx;
      p.y = y + dragOffsetRef.current.dy;
      tooltipRef.current = { x: p.x, y: p.y, label: p.node!.label, visible: true };
      if (frameRef.current % 3 === 0) {
        setTooltip(tooltipRef.current);
      }
      e.preventDefault();
    },
    [getCanvasPos]
  );

  const handleTouchEnd = useCallback(() => {
    draggedRef.current = null;
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          cursor: "default",
        }}
      />
      {tooltip.visible && (
        <div
          style={{
            position: "absolute",
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
            transform: "translate(-50%, -120%)",
            pointerEvents: "none",
            opacity: tooltip.visible ? 1 : 0,
            transition: "opacity 0.2s",
          }}
        >
          <div
            style={{
              background: "oklch(0.12 0.008 60)",
              color: "oklch(0.98 0.008 85)",
              padding: "4px 8px",
              borderRadius: "3px",
              fontSize: "11px",
              fontFamily: "'Space Mono', monospace",
              whiteSpace: "nowrap",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            }}
          >
            {tooltip.label}
          </div>
        </div>
      )}
    </div>
  );
}
