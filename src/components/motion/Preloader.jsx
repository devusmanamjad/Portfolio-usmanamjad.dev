import React, { useEffect, useRef, useState } from 'react';
import { gsap, useGSAP, motionAllowed, getLenis } from '../../lib/motion';

/**
 * A short intro on every page load: the name rises into view while a 0–100
 * counter runs for a random 1–3s, then the curtain lifts to reveal the hero.
 */
const Preloader = ({ onDone }) => {
  const [show] = useState(motionAllowed);
  const [gone, setGone] = useState(!show);
  const root = useRef(null);
  const count = useRef(null);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    if (!show) doneRef.current();
  }, [show]);

  useGSAP(
    () => {
      if (!show) return;
      document.documentElement.style.overflow = 'hidden';
      getLenis()?.stop();
      // Always start at the top, since the intro hands over to the hero.
      if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
      window.scrollTo(0, 0);

      const hold = 1 + Math.random() * 2;
      const counter = { v: 0 };

      const finish = () => {
        document.documentElement.style.overflow = '';
        getLenis()?.start();
        doneRef.current();
      };

      gsap
        .timeline({ onComplete: () => setGone(true) })
        .from('[data-pl-word]', { yPercent: 115, duration: 0.6, ease: 'expo.out', stagger: 0.06 }, 0)
        .to(
          counter,
          {
            v: 100,
            duration: hold,
            ease: 'power2.inOut',
            onUpdate: () => {
              if (count.current) count.current.textContent = String(Math.round(counter.v)).padStart(3, '0');
            },
          },
          0
        )
        .to('[data-pl-bar]', { scaleX: 1, duration: hold, ease: 'power2.inOut' }, 0)
        .to('[data-pl-word], [data-pl-meta]', { yPercent: -115, opacity: 0, duration: 0.4, ease: 'expo.in', stagger: 0.03 })
        .add(finish, '-=0.1')
        .to(root.current, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.8, ease: 'expo.inOut' }, '<');
    },
    { scope: root }
  );

  if (gone) return null;

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="band-dark fixed inset-0 z-[200] flex flex-col justify-between bg-paper p-6 text-ink sm:p-10"
      style={{ clipPath: 'inset(0% 0% 0% 0%)' }}
    >
      <div className="flex justify-between overflow-hidden">
        <span data-pl-meta className="label">Portfolio — {new Date().getFullYear()}</span>
        <span data-pl-meta className="label">Lahore, Pakistan</span>
      </div>

      <div>
        <p className="display flex overflow-hidden whitespace-nowrap text-[clamp(1.75rem,8vw,7.5rem)] leading-[0.95]">
          <span data-pl-word className="inline-block">Usman</span>
          <span data-pl-word className="text-gradient inline-block pb-[0.08em]">Amjad</span>
          <span data-pl-word className="inline-block text-ink-3">.dev</span>
        </p>
        <div className="mt-8 flex items-end justify-between gap-6 overflow-hidden">
          <span data-pl-meta className="label">Senior Software Engineer</span>
          <span ref={count} data-pl-meta className="display text-5xl tabular-nums sm:text-7xl">
            000
          </span>
        </div>
        <div className="mt-6 h-px w-full bg-ink/10">
          <div data-pl-bar className="h-px origin-left scale-x-0 bg-gradient-to-r from-brand to-brand-2" />
        </div>
      </div>
    </div>
  );
};

export default Preloader;
