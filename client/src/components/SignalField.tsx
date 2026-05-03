/*
 * SignalField — Unscaled "Signal in the Void"
 *
 * Features:
 * - Canvas particle field with proximity triangulation lines
 * - Named nodes: pulse, permanent micro-labels, hover ripple
 * - Drag named nodes (mouse + touch): surrounding particles are repelled
 *   with spring-back physics when released
 * - ~25% background particles drift with slow sinusoidal breathing
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
  // Anchor (home) position — particles spring back here
  tx: number;
  ty: number;
  // Displacement from anchor caused by repulsion
  dispX: number;
  dispY: number;
  // Velocity for spring physics
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
  // Drift breathing
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
const MAX_DIST_SQ = MAX_DIST * MAX_DIST;
const NAMED_R = 5.0;
const HIT_RADIUS_SQ = (NAMED_R * 6) * (NAMED_R * 6);
const BG_R_MIN = 0.9;
const BG_R_MAX = 2.4;

// Repulsion physics constants
const REPEL_RADIUS = 120;   // px — how far the drag repels particles
const REPEL_RADIUS_SQ = REPEL_RADIUS * REPEL_RADIUS;
const REPEL_STRENGTH = 0.9; // force multiplier
const SPRING_K = 0.055;     // spring stiffness for return
const DAMPING = 0.78;       // velocity damping (0–1)

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
  const tooltipRef = useRef<HTMLDivElement>(null);
  const tooltipPosRef = useRef({ x: 0, y: 0 });
  const tooltipFrameRef = useRef<number | null>(null);

  const [tooltip, setTooltip] = useState<{
    label: string;
    visible: boolean;
  }>({ label: "", visible: false });

  const updateTooltipPosition = useCallback((x: number, y: number) => {
    tooltipPosRef.current = { x, y };
    if (tooltipFrameRef.current !== null) return;

    tooltipFrameRef.current = requestAnimationFrame(() => {
      tooltipFrameRef.current = null;
      const el = tooltipRef.current;
      if (!el) return;
      const pos = tooltipPosRef.current;
      el.style.transform = `translate3d(${pos.x}px, ${pos.y - 34}px, 0) translateX(-50%)`;
    });
  }, []);

  const showTooltip = useCallback(
    (p: Particle) => {
      updateTooltipPosition(p.x, p.y);
      const label = p.node!.label;
      setTooltip((current) =>
        current.visible && current.label === label
          ? current
          : { label, visible: true }
      );
    },
    [updateTooltipPosition]
  );

  const hideTooltip = useCallback(() => {
    setTooltip((current) =>
      current.visible ? { ...current, visible: false } : current
    );
  }, []);

  useEffect(() => {
    return () => {
      if (tooltipFrameRef.current !== null) {
        cancelAnimationFrame(tooltipFrameRef.current);
      }
    };
  }, []);

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
        const tx = rand(0.02 * w, 0.98 * w);
        const ty = rand(0.03 * h, 0.97 * h);
        const sa = rand(0, Math.PI * 2);
        const sd = rand(30, 140);
        const drifting = Math.random() < 0.25;
        list.push({
          x: tx + Math.cos(sa) * sd,
          y: ty + Math.sin(sa) * sd,
          tx, ty,
          dispX: 0, dispY: 0,
          velX: 0, velY: 0,
          vx: 0, vy: 0,
          radius: rand(BG_R_MIN, BG_R_MAX),
          opacity: rand(0.10, 0.45),
          isNamed: false,
          breathPhase: rand(0, Math.PI * 2),
          breathSpeed: rand(0.002, 0.007),
          breathAmp: rand(0.04, 0.13),
          rippleRadius: 0,
          rippleOpacity: 0,
          rippleActive: false,
          entranceT: 0,
          entranceDelay: Math.floor(rand(0, 25)),
          entranceDone: false,
          drifting,
          driftPhaseX: rand(0, Math.PI * 2),
          driftPhaseY: rand(0, Math.PI * 2),
          driftSpeedX: rand(0.0035, 0.0065),
          driftSpeedY: rand(0.0032, 0.0058),
          driftAmpX: drifting ? rand(4, 10) : 0,
          driftAmpY: drifting ? rand(3.5, 9) : 0,
        });
      }

      particlesRef.current = list;
    },
    [nodes]
  );

  // Resize
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const e of entries) {
        const { width, height } = e.contentRect;
        if (width > 0 && height > 0) {
          const size = sizeRef.current;
          if (Math.abs(size.w - width) < 0.5 && Math.abs(size.h - height) < 0.5) {
            continue;
          }
          sizeRef.current = { w: width, h: height };
          initParticles(width, height);
          const canvas = canvasRef.current;
          if (canvas) {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            const ctx = canvas.getContext("2d");
            if (ctx) {
              ctx.setTransform(1, 0, 0, 1, 0, 0);
              ctx.scale(dpr, dpr);
            }
          }
        }
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [initParticles]);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let running = true;
    let framePending = false;

    const scheduleTick = () => {
      if (!running || document.hidden || framePending) return;
      framePending = true;
      animRef.current = requestAnimationFrame(() => {
        framePending = false;
        tick();
      });
    };

    function tick() {
      if (!ctx) return;
      const { w, h } = sizeRef.current;
      if (w === 0) {
        scheduleTick();
        return;
      }

      frameRef.current++;
      const frame = frameRef.current;
      ctx.clearRect(0, 0, w, h);

      const ps = particlesRef.current;
      const dragged = draggedRef.current;

      // ── Update ──────────────────────────────────────────────────────────
      for (const p of ps) {
        if (!p.entranceDone) {
          if (frame > p.entranceDelay) {
            p.entranceT = Math.min(1, p.entranceT + 0.055);
            p.x = p.x + (p.tx - p.x) * 0.07;
            p.y = p.y + (p.ty - p.y) * 0.07;
            if (p.entranceT >= 1) {
              p.x = p.tx;
              p.y = p.ty;
              p.entranceDone = true;
            }
          }
        } else if (p === dragged) {
          // Dragged named node — position set externally by pointer events
          // Apply repulsion to all other particles
          for (const q of ps) {
            if (q === p || !q.entranceDone) continue;
            const dx = q.tx + q.dispX - p.x;
            const dy = q.ty + q.dispY - p.y;
            const distSq = dx * dx + dy * dy;
            // Early distance check: avoid sqrt if too far
            if (distSq > REPEL_RADIUS_SQ || distSq === 0) continue;
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH;
            // Push q away from dragged node
            q.velX -= (dx / dist) * force;
            q.velY -= (dy / dist) * force;
          }
        } else if (!p.isNamed) {
          // Spring back toward anchor + drift
          // Spring force: F = -k * disp
          p.velX += -SPRING_K * p.dispX;
          p.velY += -SPRING_K * p.dispY;
          p.velX *= DAMPING;
          p.velY *= DAMPING;
          p.dispX += p.velX;
          p.dispY += p.velY;

          // Drift breathing on top of displacement
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
          // Non-dragged named nodes: always stay at fixed position
          // No drift, no spring, no displacement
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

      const entryOps = new Array<number>(ps.length);
      for (let i = 0; i < ps.length; i++) {
        const p = ps[i];
        entryOps[i] = p.entranceDone
          ? 1
          : easeOutExpo(Math.max(0, p.entranceT - 0.15) / 0.85);
      }

      // ── Draw lines ──────────────────────────────────────────────────────
      for (let i = 0; i < ps.length; i++) {
        const a = ps[i];
        const aEntryOp = entryOps[i];
        if (aEntryOp < 0.1) continue;
        for (let j = i + 1; j < ps.length; j++) {
          const b = ps[j];
          const bEntryOp = entryOps[j];
          if (bEntryOp < 0.1) continue;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distSq = dx * dx + dy * dy;
          // Early distance check: avoid sqrt if too far
          if (distSq >= MAX_DIST_SQ) continue;
          const dist = Math.sqrt(distSq);

          const distAlpha = (1 - dist / MAX_DIST) * 0.30;
          const eo = Math.min(aEntryOp, bEntryOp);

          const isHovLine =
            (a === hoveredRef.current || b === hoveredRef.current) &&
            (a.isNamed || b.isNamed);
          const isDragLine =
            (a === dragged || b === dragged);
          const isNamedLine = a.isNamed || b.isNamed;

          if (isDragLine) {
            ctx.strokeStyle = `rgba(64,64,192,${Math.min(distAlpha * 4.5, 0.85) * eo})`;
            ctx.lineWidth = 1.1;
          } else if (isHovLine) {
            ctx.strokeStyle = `rgba(64,64,192,${Math.min(distAlpha * 3.5, 0.7) * eo})`;
            ctx.lineWidth = 0.9;
          } else if (isNamedLine) {
            ctx.strokeStyle = `rgba(64,64,192,${distAlpha * 0.55 * eo})`;
            ctx.lineWidth = 0.5;
          } else {
            ctx.strokeStyle = `rgba(190,182,170,${distAlpha * eo})`;
            ctx.lineWidth = 0.4;
          }

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // ── Draw particles ──────────────────────────────────────────────────
      for (let i = 0; i < ps.length; i++) {
        const p = ps[i];
        const eo = entryOps[i];
        if (eo < 0.02) continue;

        const breathScale = 1 + Math.sin(p.breathPhase) * p.breathAmp;
        const r = p.radius * breathScale;

        if (p.isNamed) {
          const isHov = p === hoveredRef.current;
          const isDrag = p === dragged;
          const base = (isHov || isDrag) ? 1 : 0.85;
          const fo = base * eo;

          // Outer glow — larger when dragging
          const glowR = r * (isDrag ? 7.0 : isHov ? 5.5 : 4.0);
          const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR);
          grd.addColorStop(0, `rgba(64,64,192,${fo * (isDrag ? 0.38 : 0.28)})`);
          grd.addColorStop(0.45, `rgba(64,64,192,${fo * 0.07})`);
          grd.addColorStop(1, `rgba(64,64,192,0)`);
          ctx.beginPath();
          ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();

          // Core
          ctx.beginPath();
          ctx.arc(p.x, p.y, r * (isDrag ? 1.35 : 1), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(64,64,192,${fo})`;
          ctx.fill();

          // Highlight
          ctx.beginPath();
          ctx.arc(p.x - r * 0.28, p.y - r * 0.28, r * 0.32, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(180,180,255,${fo * 0.55})`;
          ctx.fill();

          // Ripple
          if (p.rippleActive) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.rippleRadius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(64,64,192,${p.rippleOpacity * eo})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }

          // Micro-label (hidden while dragging to avoid overlap with DOM tooltip)
          if (eo > 0.6 && !isHov && !isDrag) {
            ctx.font = `400 9px 'Space Mono', monospace`;
            ctx.fillStyle = `rgba(64,64,192,${fo * 0.55})`;
            ctx.textAlign = "center";
            ctx.fillText(p.node!.label.toUpperCase(), p.x, p.y - r * 2.2 - 4);
          }
        } else {
          const opBase = p.opacity * (1 + Math.sin(p.breathPhase) * p.breathAmp * 0.5);
          ctx.beginPath();
          ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(165,157,145,${Math.min(opBase, 0.52) * eo})`;
          ctx.fill();
        }
      }

      scheduleTick();
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animRef.current);
        framePending = false;
      } else {
        scheduleTick();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    scheduleTick();
    return () => {
      running = false;
      cancelAnimationFrame(animRef.current);
      framePending = false;
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // ── Pointer helpers ────────────────────────────────────────────────────────
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
      if (dx * dx + dy * dy < HIT_RADIUS_SQ) return p;
    }
    return null;
  }, []);

  const releasePointerCapture = useCallback((canvas: HTMLCanvasElement, pointerId: number) => {
    try {
      if (canvas.hasPointerCapture(pointerId)) {
        canvas.releasePointerCapture(pointerId);
      }
    } catch {
      // Pointer capture can already be gone after cancellation or navigation.
    }
  }, []);

  // ── Pointer events ─────────────────────────────────────────────────────────
  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      if (!e.isPrimary) return;
      const { x, y } = getCanvasPos(e.clientX, e.clientY);
      const found = findNamedAt(x, y);
      if (found) {
        const canvas = e.currentTarget;
        draggedRef.current = found;
        dragOffsetRef.current = { dx: found.x - x, dy: found.y - y };
        hoveredRef.current = found;
        canvas.setPointerCapture(e.pointerId);
        showTooltip(found);
        canvas.style.cursor = "grabbing";
        e.preventDefault();
      }
    },
    [getCanvasPos, findNamedAt, showTooltip]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      if (!e.isPrimary) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const { x, y } = getCanvasPos(e.clientX, e.clientY);

      if (draggedRef.current) {
        const p = draggedRef.current;
        p.x = x + dragOffsetRef.current.dx;
        p.y = y + dragOffsetRef.current.dy;
        updateTooltipPosition(p.x, p.y);
        e.preventDefault();
        return;
      }

      const found = findNamedAt(x, y);
      if (found !== hoveredRef.current) {
        hoveredRef.current = found;
        if (found) {
          found.rippleRadius = found.radius * 1.1;
          found.rippleOpacity = 0.6;
          found.rippleActive = true;
          showTooltip(found);
          canvas.style.cursor = "grab";
        } else {
          hideTooltip();
          canvas.style.cursor = "default";
        }
      }
    },
    [getCanvasPos, findNamedAt, hideTooltip, showTooltip, updateTooltipPosition]
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      if (!e.isPrimary) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const wasDragged = draggedRef.current;

      if (wasDragged) {
        // Check if it was a click (minimal movement)
        const dx = wasDragged.x - (wasDragged.tx + wasDragged.dispX);
        const dy = wasDragged.y - (wasDragged.ty + wasDragged.dispY);
        const moved = Math.sqrt(dx * dx + dy * dy);

        // Release: let spring physics pull it back
        draggedRef.current = null;
        releasePointerCapture(canvas, e.pointerId);
        canvas.style.cursor = "default";

        if (moved < (e.pointerType === "touch" ? 10 : 8)) {
          // Treat as click — navigate
          window.location.href = wasDragged.node!.url;
        }
        hideTooltip();
      }
    },
    [hideTooltip, releasePointerCapture]
  );

  const handlePointerLeave = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = e.currentTarget;
    if (draggedRef.current) {
      draggedRef.current = null;
      releasePointerCapture(canvas, e.pointerId);
    }
    hoveredRef.current = null;
    hideTooltip();
    canvas.style.cursor = "default";
  }, [hideTooltip, releasePointerCapture]);

  const handlePointerCancel = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      const canvas = e.currentTarget;
      draggedRef.current = null;
      hoveredRef.current = null;
      releasePointerCapture(canvas, e.pointerId);
      canvas.style.cursor = "default";
      hideTooltip();
    },
    [hideTooltip, releasePointerCapture]
  );

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", width: "100%", height: "100%" }}
    >
      <canvas
        ref={canvasRef}
        style={{ display: "block", width: "100%", height: "100%", touchAction: "none" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
        onPointerCancel={handlePointerCancel}
      />

      {/* Hover / drag tooltip */}
      <div
        ref={tooltipRef}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          transform: `translate3d(${tooltipPosRef.current.x}px, ${tooltipPosRef.current.y - 34}px, 0) translateX(-50%)`,
          pointerEvents: "none",
          fontFamily: "'Space Mono', monospace",
          fontSize: "11px",
          letterSpacing: "0.15em",
          color: "oklch(0.42 0.22 270)",
          opacity: tooltip.visible ? 1 : 0,
          transition: "opacity 0.15s ease",
          userSelect: "none",
          whiteSpace: "nowrap",
          textTransform: "uppercase",
          fontWeight: 700,
          willChange: "transform, opacity",
        }}
      >
        {tooltip.label}
      </div>
    </div>
  );
}
