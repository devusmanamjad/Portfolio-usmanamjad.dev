import React from 'react';
import { motion } from 'framer-motion';
import { personalInfo, principles } from '../data/mock';
import Section, { useReveal } from './Section';

const About = () => {
  const reveal = useReveal();

  return (
    <Section
      id="about"
      index="01"
      label="About"
      title={
        <>
          A .NET engineer who cares most about what happens <em>in production</em>.
        </>
      }
    >
      <div className="grid gap-x-12 gap-y-10 md:grid-cols-[minmax(0,15rem)_1fr]">
        {/* Portrait */}
        <motion.figure {...reveal()} className="max-w-[15rem] md:sticky md:top-28 md:self-start">
          <img
            src={personalInfo.photo}
            alt={`Portrait of ${personalInfo.name}`}
            className="aspect-[4/5] w-full rounded-sm object-cover"
            loading="lazy"
          />
          <figcaption className="mt-4 space-y-1.5">
            <p className="text-sm font-medium text-ink">{personalInfo.name}</p>
            <p className="text-sm">{personalInfo.location}</p>
            <p className="flex items-center gap-2 text-sm text-brand">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              Open to opportunities
            </p>
          </figcaption>
        </motion.figure>

        {/* Story */}
        <motion.div {...reveal(0.08)} className="max-w-2xl space-y-5 text-[17px] leading-8">
          {personalInfo.about.split('\n\n').map((paragraph, i) => (
            <p key={i} className={i === 0 ? 'text-ink' : undefined}>
              {paragraph}
            </p>
          ))}
        </motion.div>
      </div>

      {/* Principles */}
      <div className="mt-16 grid gap-x-10 gap-y-10 sm:grid-cols-3">
        {principles.map((principle, i) => (
          <motion.div key={principle.title} {...reveal(i * 0.06)} className="border-t border-ink pt-5">
            <p className="label">0{i + 1}</p>
            <h3 className="display mt-4 text-2xl leading-tight">{principle.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed">{principle.text}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default About;
