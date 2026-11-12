import React, { useEffect, useRef, useState } from 'react';
import { gsap, useGSAP, motionAllowed, getLenis } from '../../lib/motion';

const SEEN_KEY = 'ua-intro-seen';

const shouldShow = () => {
  if (!motionAllowed()) return false;
  try {
    return !sessionStorage.getItem(SEEN_KEY);
  } catch (e) {
    return true;
  }
};

/**
 * A short intro (about 2s) shown once per browser session: a 0–100 counter
 * and the name rising into view, then the curtain lifts to reveal the hero.
 */
const Preloader = ({ onDone }) => {
  const [show] = useState(shouldShow);
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
      const counter = { v: 0 };

      const finish = () => {
        document.documentElement.style.overflow = '';
        getLenis()?.start();
        try {
          sessionStorage.setItem(SEEN_KEY, '1');
        } catch (e) {
          /* private mode: the intro simply plays again next time */
        }
      };

      gsap
        .timeline({ onComplete: () => setGone(true) })
        .from('[data-pl-word]', { yPercent: 115, duration: 1, ease: 'expo.out', stagger: 0.08 }, 0.1)
        .to(
          counter,
          {
            v: 100,
            duration: 1.4,
            ease: 'power2.inOut',
            onUpdate: () => {
              if (count.current) count.current.textContent = String(Math.round(counter.v)).padStart(3, '0');
            },
          },
          0
        )
        .to('[data-pl-bar]', { scaleX: 1, duration: 1.4, ease: 'power2.inOut' }, 0)
        .to('[data-pl-word], [data-pl-meta]', { yPercent: -115, opacity: 0, duration: 0.6, ease: 'expo.in', stagger: 0.04 }, '+=0.15')
        .add(() => {
          finish();
          doneRef.current();
        }, '-=0.15')
        .to(root.current, { clipPath: 'inset(0% 0% 100% 0%)', duration: 1.1, ease: 'expo.inOut' }, '<');
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
        <p className="display flex flex-wrap gap-x-[0.28em] overflow-hidden text-[clamp(3rem,11vw,9rem)] leading-[0.95]">
          <span data-pl-word className="inline-block">Usman</span>
          <span data-pl-word className="text-gradient inline-block pb-[0.08em]">Amjad</span>
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
