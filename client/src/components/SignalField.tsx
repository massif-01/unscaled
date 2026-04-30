/*
 * SignalField — Unscaled "Signal in the Void"
 *
 * Design: Canvas particle field with proximity triangulation lines.
 * Named nodes pulse with electric indigo, have permanent micro-labels,
 * and expand on hover with sonar ripple + full label reveal.
 *
 * To add nodes: edit NAV_NODES in Home.tsx only.
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
}

export interface SignalFieldProps {
  nodes: NavNode[];
}

const BG_COUNT = 100;
const MAX_DIST = 140;
const NAMED_R = 5.0;
const BG_R_MIN = 0.9;
const BG_R_MAX = 2.4;

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

// Predefined positions for up to 8 named nodes (normalized 0-1 in canvas)
// These create a natural organic cluster in the right-center area
const NAMED_POSITIONS = [
  { nx: 0.42, ny: 0.38 }, // Github — upper left of cluster
  { nx: 0.68, ny: 0.28 }, // Podcast — upper right
  { nx: 0.55, ny: 0.62 }, // AI — lower center
  { nx: 0.78, ny: 0.58 }, // Info — right
  { nx: 0.35, ny: 0.70 }, // slot 5
  { nx: 0.82, ny: 0.38 }, // slot 6
  { nx: 0.60, ny: 0.80 }, // slot 7
  { nx: 0.72, ny: 0.72 }, // slot 8
];

export default function SignalField({ nodes }: SignalFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);
  const hoveredRef = useRef<Particle | null>(null);
  const sizeRef = useRef({ w: 0, h: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);

  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    label: string;
    visible: boolean;
  }>({ x: 0, y: 0, label: "", visible: false });

  const initParticles = useCallback(
    (w: number, h: number) => {
      const list: Particle[] = [];

      // Named nodes
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
          tx,
          ty,
          vx: 0,
          vy: 0,
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
        });
      });

      // Background particles — distributed across full canvas
      for (let i = 0; i < BG_COUNT; i++) {
        const tx = rand(0.02 * w, 0.98 * w);
        const ty = rand(0.03 * h, 0.97 * h);
        const sa = rand(0, Math.PI * 2);
        const sd = rand(30, 140);
        list.push({
          x: tx + Math.cos(sa) * sd,
          y: ty + Math.sin(sa) * sd,
          tx,
          ty,
          vx: rand(-0.055, 0.055),
          vy: rand(-0.038, 0.038),
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

    function tick() {
      if (!ctx) return;
      const { w, h } = sizeRef.current;
      if (w === 0) {
        animRef.current = requestAnimationFrame(tick);
        return;
      }

      frameRef.current++;
      const frame = frameRef.current;
      ctx.clearRect(0, 0, w, h);

      const ps = particlesRef.current;

      // Update
      for (const p of ps) {
        if (!p.entranceDone) {
          if (frame > p.entranceDelay) {
            p.entranceT = Math.min(1, p.entranceT + 0.055);
            const t = easeOutExpo(p.entranceT);
            p.x = p.x + (p.tx - p.x) * 0.07;
            p.y = p.y + (p.ty - p.y) * 0.07;
            if (p.entranceT >= 1) {
              p.x = p.tx;
              p.y = p.ty;
              p.entranceDone = true;
            }
          }
        } else if (!p.isNamed) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
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

      // Entry opacity helper
      const entryOp = (p: Particle) => {
        if (p.entranceDone) return 1;
        return easeOutExpo(Math.max(0, p.entranceT - 0.15) / 0.85);
      };

      // Draw lines
      for (let i = 0; i < ps.length; i++) {
        const a = ps[i];
        if (entryOp(a) < 0.1) continue;
        for (let j = i + 1; j < ps.length; j++) {
          const b = ps[j];
          if (entryOp(b) < 0.1) continue;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist >= MAX_DIST) continue;

          const distAlpha = (1 - dist / MAX_DIST) * 0.30;
          const eoA = entryOp(a);
          const eoB = entryOp(b);
          const eo = Math.min(eoA, eoB);

          const isHovLine =
            (a === hoveredRef.current || b === hoveredRef.current) &&
            (a.isNamed || b.isNamed);
          const isNamedLine = a.isNamed || b.isNamed;

          if (isHovLine) {
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

      // Draw particles
      for (const p of ps) {
        const eo = entryOp(p);
        if (eo < 0.02) continue;

        const breathScale = 1 + Math.sin(p.breathPhase) * p.breathAmp;
        const r = p.radius * breathScale;

        if (p.isNamed) {
          const isHov = p === hoveredRef.current;
          const base = isHov ? 1 : 0.85;
          const fo = base * eo;

          // Outer glow
          const glowR = r * (isHov ? 5.5 : 4.0);
          const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR);
          grd.addColorStop(0, `rgba(64,64,192,${fo * 0.28})`);
          grd.addColorStop(0.45, `rgba(64,64,192,${fo * 0.07})`);
          grd.addColorStop(1, `rgba(64,64,192,0)`);
          ctx.beginPath();
          ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();

          // Core
          ctx.beginPath();
          ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
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

          // Permanent micro-label (always visible, very small)
          if (eo > 0.6 && !isHov) {
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

      animRef.current = requestAnimationFrame(tick);
    }

    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  // Mouse
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      let found: Particle | null = null;
      for (const p of particlesRef.current) {
        if (!p.isNamed) continue;
        const dx = p.x - mx;
        const dy = p.y - my;
        if (Math.sqrt(dx * dx + dy * dy) < NAMED_R * 5) {
          found = p;
          break;
        }
      }

      if (found !== hoveredRef.current) {
        hoveredRef.current = found;
        if (found) {
          found.rippleRadius = found.radius * 1.1;
          found.rippleOpacity = 0.6;
          found.rippleActive = true;
          setTooltip({ x: found.x, y: found.y, label: found.node!.label, visible: true });
          canvas.style.cursor = "pointer";
        } else {
          setTooltip((t) => ({ ...t, visible: false }));
          canvas.style.cursor = "crosshair";
        }
      }
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    hoveredRef.current = null;
    setTooltip((t) => ({ ...t, visible: false }));
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      for (const p of particlesRef.current) {
        if (!p.isNamed) continue;
        const dx = p.x - mx;
        const dy = p.y - my;
        if (Math.sqrt(dx * dx + dy * dy) < NAMED_R * 5.5) {
          window.open(p.node!.url, "_blank", "noopener,noreferrer");
          break;
        }
      }
    },
    []
  );

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", width: "100%", height: "100%", cursor: "crosshair" }}
    >
      <canvas
        ref={canvasRef}
        style={{ display: "block", width: "100%", height: "100%" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      />

      {/* Hover tooltip — larger label on hover */}
      <div
        style={{
          position: "absolute",
          left: tooltip.x,
          top: tooltip.y - 34,
          transform: "translateX(-50%)",
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
        }}
      >
        {tooltip.label}
      </div>
    </div>
  );
}
