import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap, ScrollTrigger, motionAllowed, setLenis } from '../../lib/motion';

/**
 * Inertia scrolling with Lenis, driven by GSAP's ticker so ScrollTrigger
 * animations stay in sync with the scroll position. Anchor links (#about …)
 * glide to their section with an offset for the floating header.
 */
const SmoothScroll = () => {
  useEffect(() => {
    if (!motionAllowed()) return undefined;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      anchors: { offset: -88, duration: 1.4 },
    });
    setLenis(lenis);

    lenis.on('scroll', ScrollTrigger.update);
    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return null;
};

export default SmoothScroll;
