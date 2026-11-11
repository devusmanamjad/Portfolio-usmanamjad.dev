import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

// Gentle fade-up used across sections; disabled when reduced motion is on.
export const useReveal = () => {
  const { reducedMotion } = useTheme();
  return (delay = 0) => ({
    initial: { opacity: 0, y: reducedMotion ? 0 : 14 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-40px' },
    transition: {
      duration: reducedMotion ? 0 : 0.6,
      delay: reducedMotion ? 0 : delay,
      ease: [0.22, 0.61, 0.36, 1],
    },
  });
};

// Editorial section: a ruled line, a numbered label in the margin column,
// and a serif statement leading into the content.
const Section = ({ id, index, label, title, lead, children }) => {
  const reveal = useReveal();

  return (
    <section id={id} className="border-t border-line">
      <div className="container-page grid gap-x-12 gap-y-8 py-20 lg:grid-cols-12 lg:py-28">
        <div className="lg:col-span-3">
          <p className="label flex gap-4 lg:sticky lg:top-28">
            <span>{index}</span>
            <span className="text-ink">{label}</span>
          </p>
        </div>

        <div className="min-w-0 lg:col-span-9">
          <motion.h2 {...reveal()} className="display max-w-3xl text-4xl leading-[1.08] sm:text-5xl">
            {title}
          </motion.h2>
          {lead && (
            <motion.p {...reveal(0.05)} className="mt-5 max-w-2xl text-lg leading-relaxed">
              {lead}
            </motion.p>
          )}
          <div className="mt-12 lg:mt-14">{children}</div>
        </div>
      </div>
    </section>
  );
};

export default Section;
