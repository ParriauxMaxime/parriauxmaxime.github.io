import RocketIcon from '@ds/components/rocket-icon';
import { useMoon } from '@modules/floating-controls/to-the-moon';
import { useCallback, useEffect, useRef, useState } from 'react';
import Smoke from './smoke';
import Trail from './trail';

type Phase = 'idle' | 'ignition' | 'ascending' | 'exiting' | 'braking' | 'descending';

export default function Rocket() {
  const { enabled } = useMoon();
  const [nearBottom, setNearBottom] = useState(false);
  const [phase, setPhase] = useState<Phase>('idle');
  const [flame, setFlame] = useState(false);
  const [ignitionProgress, setIgnitionProgress] = useState(0);
  const [nozzleY, setNozzleY] = useState(0);
  const [nozzleX, setNozzleX] = useState(0);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const y = useRef(0);
  const vel = useRef(0);
  const raf = useRef(0);
  const phaseRef = useRef<Phase>('idle');

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  // Show rocket when near the bottom
  useEffect(() => {
    if (!enabled) {
      setNearBottom(false);
      return;
    }
    const onScroll = () => {
      if (phaseRef.current !== 'idle') return;
      setNearBottom(window.innerHeight + window.scrollY >= document.body.scrollHeight - 200);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [enabled]);

  // When rocket becomes visible while idle, reset position to 0
  useEffect(() => {
    if (nearBottom && phase === 'idle') {
      y.current = 0;
      vel.current = 0;
      if (wrapperRef.current) wrapperRef.current.style.transform = '';
    }
  }, [nearBottom, phase]);

  // Progressive flame + shake during ignition
  useEffect(() => {
    if (phase !== 'ignition') {
      setIgnitionProgress(0);
      if (buttonRef.current) buttonRef.current.style.transform = '';
      return;
    }
    const start = performance.now();
    const duration = 1800;
    let id: number;
    const grow = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      setIgnitionProgress(t);

      // Progressive shake: amplitude and speed increase with t
      const btn = buttonRef.current;
      if (btn) {
        const amp = 0.5 + t * 3.5;
        const rot = 0.2 + t * 1.2;
        const freq = now * (0.01 + t * 0.03);
        const x = Math.sin(freq) * amp;
        const r = Math.cos(freq * 1.3) * rot;
        btn.style.transform = `translateX(${x}px) rotate(${r}deg)`;
      }

      if (t < 1) id = requestAnimationFrame(grow);
    };
    id = requestAnimationFrame(grow);
    return () => cancelAnimationFrame(id);
  }, [phase]);

  // Detect user scroll interruption during ascent → initiate landing
  useEffect(() => {
    if (phase !== 'ascending') return;
    let armed = false;
    const armTimer = setTimeout(() => {
      armed = true;
    }, 200);
    const abort = () => {
      if (!armed) return;
      setPhase('braking');
    };
    window.addEventListener('wheel', abort, { passive: true });
    window.addEventListener('touchstart', abort, { passive: true });
    return () => {
      clearTimeout(armTimer);
      window.removeEventListener('wheel', abort);
      window.removeEventListener('touchstart', abort);
    };
  }, [phase]);

  // RAF animation loop
  useEffect(() => {
    if (phase === 'idle' || phase === 'ignition') return;

    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 16.67, 3);
      last = now;
      const el = wrapperRef.current;
      if (!el) return;

      const p = phaseRef.current;

      if (p === 'ascending') {
        vel.current -= 1.2 * dt;
        y.current += vel.current * dt;
        if (y.current < -window.innerHeight * 0.8) {
          setPhase('exiting');
        }
      } else if (p === 'exiting') {
        vel.current -= 3 * dt;
        y.current += vel.current * dt;
        if (y.current < -window.innerHeight * 3) {
          // Done — leave y off-screen, just reset state
          vel.current = 0;
          setFlame(false);
          setPhase('idle');
          setNearBottom(false);
          return;
        }
      } else if (p === 'braking') {
        vel.current += 2.5 * dt;
        y.current += vel.current * dt;
        if (vel.current >= 0) {
          vel.current = 0;
          setPhase('descending');
        }
      } else if (p === 'descending') {
        const alt = Math.abs(y.current);
        // Fast descent that slows near the ground
        const target = alt > 100 ? 12 : Math.max(alt * 0.08, 1);
        vel.current += (target - vel.current) * 0.15 * dt;
        y.current += vel.current * dt;
        // Scroll page back down proportionally to rocket descent
        if (alt > 50) {
          const docH = document.body.scrollHeight - window.innerHeight;
          const ratio = Math.abs(y.current) / (window.innerHeight * 0.8);
          window.scrollTo({ top: docH * (1 - ratio) });
        }
        if (y.current >= -0.5) {
          y.current = 0;
          vel.current = 0;
          el.style.transform = '';
          setFlame(false);
          setPhase('idle');
          // Scroll to bottom where the rocket lives
          window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
          return;
        }
      }

      el.style.transform = `translateY(${y.current}px)`;
      // Track nozzle screen position for trail
      const btn = buttonRef.current;
      if (btn) {
        const rect = btn.getBoundingClientRect();
        setNozzleY(window.innerHeight - rect.bottom);
        setNozzleX(window.innerWidth - (rect.left + rect.width / 2));
      }
      raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [phase]);

  const launch = useCallback(() => {
    if (phase !== 'idle') return;
    setPhase('ignition');
    setFlame(true);
    setTimeout(() => {
      setPhase('ascending');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1800);
  }, [phase]);

  if (!enabled) return null;

  const show = nearBottom || phase !== 'idle';
  const isBraking = phase === 'braking';
  const isDescending = phase === 'descending';
  const isLanding = isBraking || isDescending;

  // Smoke
  const smokeActive = flame;
  let smokeIntensity = 0;
  if (phase === 'ignition') smokeIntensity = ignitionProgress;
  else if (phase === 'ascending') smokeIntensity = 1;
  else if (phase === 'exiting') smokeIntensity = 0.8;
  else if (isBraking) smokeIntensity = 0.9;
  else if (isDescending) smokeIntensity = 0.5;

  // Flame height: ignition ramps from 0→80px, then phase-based after
  let flameStyle: React.CSSProperties | undefined;
  let flameClass = '';
  if (phase === 'ignition') {
    // 8px → 80px with ease-in curve (slow start, fast end)
    const eased = ignitionProgress * ignitionProgress;
    flameStyle = { height: `${8 + eased * 72}px` };
  } else if (phase === 'ascending') {
    flameClass = 'h-28';
  } else if (phase === 'exiting') {
    flameClass = 'h-40';
  } else if (isBraking) {
    flameClass = 'h-32';
  } else if (isDescending) {
    flameClass = 'h-20';
  } else {
    flameClass = 'h-20';
  }

  const trailActive =
    phase === 'ascending' || phase === 'exiting' || phase === 'braking' || phase === 'descending';

  return (
    <>
      <Trail active={trailActive} nozzleY={nozzleY} nozzleX={nozzleX} />
      <div
        className={`fixed bottom-14 md:bottom-16 right-6 z-40 leading-none transition-opacity duration-500 ${show ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <div ref={wrapperRef}>
          <button
            type="button"
            onClick={launch}
            aria-label="Launch to the top"
            ref={buttonRef}
            className="relative cursor-pointer select-none block"
          >
            <Smoke active={smokeActive} intensity={smokeIntensity} />
            <RocketIcon className="h-40 w-auto drop-shadow-lg block relative z-10" />

            {flame && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pointer-events-none">
                <svg
                  className={`w-16 ${flameClass} transition-[height] duration-300 ${isLanding ? 'animate-pulse' : ''}`}
                  style={flameStyle}
                  viewBox="0 0 40 60"
                  fill="none"
                  preserveAspectRatio="xMidYMin meet"
                  aria-hidden="true"
                >
                  <path
                    d="M20 0 C20 0 4 18 6 38 C7 48 13 58 20 60 C27 58 33 48 34 38 C36 18 20 0 20 0Z"
                    fill="#f97316"
                    opacity="0.85"
                  />
                  <path
                    d="M20 4 C20 4 10 18 12 36 C13 44 16 52 20 54 C24 52 27 44 28 36 C30 18 20 4 20 4Z"
                    fill="#facc15"
                    opacity="0.9"
                  />
                  <path
                    d="M20 10 C20 10 15 22 16 34 C16.5 40 18 44 20 46 C22 44 23.5 40 24 34 C25 22 20 10 20 10Z"
                    fill="white"
                    opacity="0.8"
                  />
                </svg>
              </div>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
