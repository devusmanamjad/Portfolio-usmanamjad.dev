import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

export const EASE = 'expo.out';

/** True when the page opted into animation (see the script in public/index.html). */
export const motionAllowed = () =>
  typeof document !== 'undefined' && document.documentElement.classList.contains('motion');

/** The single Lenis instance, so modals can pause smooth scrolling. */
let lenisInstance = null;
export const setLenis = (lenis) => {
  lenisInstance = lenis;
};
export const getLenis = () => lenisInstance;

/** Scroll to an element or y position, smoothly when Lenis is running. */
export const scrollToTarget = (target) => {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, { offset: typeof target === 'number' ? 0 : -88, duration: 1.4 });
    return;
  }
  if (typeof target === 'number') window.scrollTo({ top: target, behavior: 'smooth' });
  else document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
};

export { gsap, ScrollTrigger, SplitText, useGSAP };
