import { useEffect } from 'react';
import { gsap, ScrollTrigger, SplitText, useGSAP, motionAllowed } from '../../lib/motion';

/**
 * Page-wide scroll reveals, wired up once the intro has finished:
 *  - [data-reveal]  fades and rises into place, staggered in batches
 *  - [data-split]   headings rise line by line from behind a mask
 */
const ScrollAnimations = ({ ready }) => {
  useGSAP(
    () => {
      if (!ready || !motionAllowed()) return;

      ScrollTrigger.batch('[data-reveal]', {
        start: 'top 90%',
        once: true,
        onEnter: (els) =>
          gsap.to(els, { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out', stagger: 0.09, overwrite: true }),
      });

      gsap.utils.toArray('[data-split]').forEach((el) => {
        SplitText.create(el, {
          type: 'lines',
          mask: 'lines',
          autoSplit: true,
          onSplit(self) {
            gsap.set(el, { visibility: 'visible' });
            return gsap.from(self.lines, {
              yPercent: 110,
              duration: 1.3,
              ease: 'expo.out',
              stagger: 0.09,
              scrollTrigger: { trigger: el, start: 'top 90%', once: true },
            });
          },
        });
      });
    },
    { dependencies: [ready] }
  );

  // Late-loading images and fonts change section heights.
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    document.fonts?.ready.then(refresh);
    return () => window.removeEventListener('load', refresh);
  }, []);

  return null;
};

export default ScrollAnimations;
