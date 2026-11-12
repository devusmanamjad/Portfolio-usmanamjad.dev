import React, { useEffect, useRef, useState } from 'react';
import { gsap, motionAllowed } from '../../lib/motion';

/**
 * A soft ring that trails the pointer (mouse only). It grows over links and
 * buttons, and shows a label over anything with data-cursor="…".
 * The native cursor stays visible.
 */
const Cursor = () => {
  const [enabled] = useState(
    () => motionAllowed() && window.matchMedia('(hover: hover) and (pointer: fine)').matches
  );
  const ring = useRef(null);
  const label = useRef(null);

  useEffect(() => {
    if (!enabled) return undefined;
    const el = ring.current;
    gsap.set(el, { xPercent: -50, yPercent: -50 });
    const xTo = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3.out' });
    let state = '';

    const setState = (next, text = '') => {
      if (next === state) return;
      state = next;
      label.current.textContent = text;
      gsap.to(el, {
        width: next === 'label' ? 84 : next === 'link' ? 52 : 28,
        height: next === 'label' ? 84 : next === 'link' ? 52 : 28,
        duration: 0.4,
        ease: 'expo.out',
      });
      el.dataset.state = next;
    };

    const onMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
      gsap.to(el, { opacity: 1, duration: 0.3, overwrite: 'auto' });
    };
    const onOver = (e) => {
      const target = e.target.closest('[data-cursor], a, button, [role="tab"]');
      if (!target) return setState('');
      if (target.dataset.cursor) return setState('label', target.dataset.cursor);
      return setState('link');
    };
    const onLeave = () => gsap.to(el, { opacity: 0, duration: 0.3 });

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={ring}
      aria-hidden="true"
      className="cursor-ring pointer-events-none fixed left-0 top-0 z-[150] flex h-7 w-7 items-center justify-center rounded-full border border-ink/30 opacity-0 transition-[background-color,border-color] duration-300 data-[state=label]:border-transparent data-[state=label]:bg-ink data-[state=link]:border-brand/50 data-[state=link]:bg-brand/10"
    >
      <span ref={label} className="text-[11px] font-semibold uppercase tracking-[0.12em] text-paper" />
    </div>
  );
};

export default Cursor;
