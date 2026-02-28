import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  maxRadius: number;
  growRate: number;
  opacity: number;
  fadeRate: number;
}

interface SmokeProps {
  active: boolean;
  /** 0–1, controls spawn rate and particle size */
  intensity: number;
}

const W = 200;
const H = 200;

export default function Smoke({ active, intensity }: SmokeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const rafId = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 16.67, 3);
      last = now;

      // Spawn particles
      if (active) {
        // Spawn rate scales with intensity: 0.3 at low, up to 3 per frame at high
        const spawnCount = intensity * 3 * dt;
        const whole = Math.floor(spawnCount);
        const frac = spawnCount - whole;
        const count = whole + (Math.random() < frac ? 1 : 0);

        for (let i = 0; i < count; i++) {
          const angle = Math.random() * Math.PI * 0.6 + Math.PI * 0.2; // mostly downward spread
          const speed = 0.5 + Math.random() * 2 * intensity;
          particles.current.push({
            x: W / 2 + (Math.random() - 0.5) * 20,
            y: 10 + Math.random() * 10,
            vx: Math.cos(angle) * speed * (Math.random() > 0.5 ? 1 : -1),
            vy: Math.abs(Math.sin(angle)) * speed * 0.5 + 0.3,
            radius: 2 + Math.random() * 3,
            maxRadius: 12 + intensity * 25 + Math.random() * 15,
            growRate: 0.3 + intensity * 0.5 + Math.random() * 0.3,
            opacity: 0.3 + Math.random() * 0.3,
            fadeRate: 0.004 + Math.random() * 0.004,
          });
        }
      }

      // Update
      const alive: Particle[] = [];
      for (const p of particles.current) {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vx *= 0.99;
        p.vy += 0.02 * dt; // slight downward drift
        if (p.radius < p.maxRadius) {
          p.radius += p.growRate * dt;
        }
        p.opacity -= p.fadeRate * dt;
        if (p.opacity > 0.01) alive.push(p);
      }
      particles.current = alive;

      // Draw
      ctx.clearRect(0, 0, W, H);
      for (const p of particles.current) {
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        grad.addColorStop(0, `rgba(200, 200, 200, ${p.opacity})`);
        grad.addColorStop(0.4, `rgba(180, 180, 180, ${p.opacity * 0.6})`);
        grad.addColorStop(1, `rgba(160, 160, 160, 0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      // Keep running if active or particles remain
      if (active || particles.current.length > 0) {
        rafId.current = requestAnimationFrame(tick);
      }
    };

    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, [active, intensity]);

  return (
    <canvas
      ref={canvasRef}
      width={W}
      height={H}
      className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
      style={{ top: '85%', width: W, height: H }}
    />
  );
}
