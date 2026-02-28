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

interface TrailProps {
  active: boolean;
  nozzleY: number;
  nozzleX: number;
}

export default function Trail({ active, nozzleY, nozzleX }: TrailProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const propsRef = useRef({ active, nozzleY, nozzleX });
  propsRef.current = { active, nozzleY, nozzleX };

  // biome-ignore lint/correctness/useExhaustiveDependencies: active restarts the RAF loop; nozzleY/nozzleX read via propsRef
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    let running = true;
    let last = performance.now();

    const tick = (now: number) => {
      if (!running) return;
      const dt = Math.min((now - last) / 16.67, 3);
      last = now;
      const { active: a, nozzleY: ny, nozzleX: nx } = propsRef.current;
      const w = canvas.width;
      const h = canvas.height;

      if (a) {
        const sx = w - nx;
        const sy = h - ny;
        // More particles, wider spread
        const count = Math.floor(4 * dt) + (Math.random() < (4 * dt) % 1 ? 1 : 0);
        for (let i = 0; i < count; i++) {
          const speed = 0.4 + Math.random() * 1.5;
          particles.current.push({
            x: sx + (Math.random() - 0.5) * 30,
            y: sy + (Math.random() - 0.5) * 10,
            vx: (Math.random() - 0.5) * speed * 3,
            vy: Math.random() * 0.4 - 0.1,
            radius: 6 + Math.random() * 8,
            maxRadius: 35 + Math.random() * 50,
            growRate: 0.5 + Math.random() * 0.6,
            opacity: 0.12 + Math.random() * 0.1,
            fadeRate: 0.001 + Math.random() * 0.001,
          });
        }
      }

      const alive: Particle[] = [];
      for (const p of particles.current) {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vx *= 0.995;
        if (p.radius < p.maxRadius) p.radius += p.growRate * dt;
        p.opacity -= p.fadeRate * dt;
        if (p.opacity > 0.003) alive.push(p);
      }
      particles.current = alive;

      ctx.clearRect(0, 0, w, h);
      for (const p of particles.current) {
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        grad.addColorStop(0, `rgba(200, 200, 200, ${p.opacity})`);
        grad.addColorStop(0.3, `rgba(185, 185, 185, ${p.opacity * 0.6})`);
        grad.addColorStop(0.7, `rgba(170, 170, 170, ${p.opacity * 0.2})`);
        grad.addColorStop(1, 'rgba(160, 160, 160, 0)');
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      if (a || particles.current.length > 0) {
        requestAnimationFrame(tick);
      } else {
        ctx.clearRect(0, 0, w, h);
      }
    };

    requestAnimationFrame(tick);

    return () => {
      running = false;
      window.removeEventListener('resize', onResize);
    };
  }, [active]);

  if (!active && particles.current.length === 0) return null;

  return <canvas ref={canvasRef} className="fixed inset-0 z-30 pointer-events-none" />;
}
