import React, { useRef } from 'react';
import { coreStack } from '../data/mock';
import { gsap, ScrollTrigger, useGSAP, motionAllowed } from '../lib/motion';

const Row = ({ items, outline, trackRef }) => (
  <div className="flex overflow-hidden">
    <div ref={trackRef} className="flex shrink-0 will-change-transform">
      {[0, 1].map((copy) => (
        <ul key={copy} aria-hidden={copy === 1 ? 'true' : undefined} className="flex shrink-0 items-center">
          {items.map((item) => (
            <li key={item} className="flex items-center">
              <span
                className={`display whitespace-nowrap px-6 text-[clamp(2rem,5vw,4.25rem)] leading-[1.15] sm:px-9 ${
                  outline ? 'text-transparent [-webkit-text-stroke:1.2px_rgb(var(--ink)/0.35)]' : 'text-ink'
                }`}
              >
                {item}
              </span>
              <span aria-hidden="true" className="text-gradient text-2xl sm:text-3xl">
                ✦
              </span>
            </li>
          ))}
        </ul>
      ))}
    </div>
  </div>
);

/**
 * Two endless rows of the core stack moving in opposite directions.
 * Scrolling speeds them up, and the direction follows the scroll.
 */
const Marquee = () => {
  const root = useRef(null);
  const top = useRef(null);
  const bottom = useRef(null);
  const half = Math.ceil(coreStack.length / 2);

  useGSAP(
    () => {
      if (!motionAllowed()) return;
      const a = gsap.fromTo(top.current, { xPercent: 0 }, { xPercent: -50, duration: 45, ease: 'none', repeat: -1 });
      const b = gsap.fromTo(bottom.current, { xPercent: -50 }, { xPercent: 0, duration: 45, ease: 'none', repeat: -1 });

      // Start deep into the loop so playing it backwards never hits the start.
      a.totalTime(45 * 1000);
      b.totalTime(45 * 1000);

      let direction = 1;
      ScrollTrigger.create({
        trigger: root.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate(self) {
          direction = self.direction;
          const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 300, 6);
          gsap.to([a, b], { timeScale: boost * direction, duration: 0.2, overwrite: true });
          gsap.to([a, b], { timeScale: direction, duration: 1.4, delay: 0.2, ease: 'power2.out' });
        },
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} aria-label="Core technologies" className="relative overflow-hidden border-y border-line py-10 sm:py-14">
      <ul className="sr-only">
        {coreStack.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div aria-hidden="true" className="space-y-2 sm:space-y-4">
        <Row items={coreStack.slice(0, half)} trackRef={top} />
        <Row items={coreStack.slice(half)} trackRef={bottom} outline />
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-paper to-transparent sm:w-48" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-paper to-transparent sm:w-48" />
    </section>
  );
};

export default Marquee;
