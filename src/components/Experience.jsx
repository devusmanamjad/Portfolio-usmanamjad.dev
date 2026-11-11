import React from 'react';
import { motion } from 'framer-motion';
import { experiences } from '../data/mock';
import Section, { useReveal } from './Section';

const ExperienceItem = ({ experience, index }) => {
  const reveal = useReveal();
  const isCurrent = experience.type === 'current';

  return (
    <motion.article
      {...reveal(index * 0.05)}
      className="grid gap-x-10 gap-y-4 border-t border-line py-10 first:border-t-0 first:pt-0 md:grid-cols-[11rem_1fr]"
    >
      {/* Dates */}
      <div>
        <p className="label !text-ink">{experience.period}</p>
        <p className="mt-2 text-sm text-ink-3">{experience.location}</p>
        {isCurrent && (
          <p className="mt-3 flex items-center gap-2 text-sm text-brand">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            Current role
          </p>
        )}
      </div>

      {/* Role */}
      <div className="min-w-0">
        <h3 className="display text-3xl leading-tight sm:text-[2.15rem]">{experience.role}</h3>
        <p className="mt-2 font-medium text-ink">
          {experience.company}
          {experience.project && <span className="font-normal text-ink-3"> — {experience.project}</span>}
        </p>
        {experience.roles && (
          <ol aria-label={`Roles at ${experience.company}`} className="mt-5 max-w-md border-l border-line">
            {experience.roles.map((role, i) => (
              <li key={role.title} className="relative flex flex-wrap items-baseline justify-between gap-x-6 py-1.5 pl-5">
                <span
                  aria-hidden="true"
                  className={`absolute -left-[4px] top-[0.85rem] h-[7px] w-[7px] rounded-full ${
                    i === 0 ? 'bg-brand' : 'border border-ink-3 bg-paper'
                  }`}
                />
                <span className={i === 0 ? 'text-ink' : 'text-ink-3'}>{role.title}</span>
                <span className="label">{role.period}</span>
              </li>
            ))}
          </ol>
        )}

        <p className="mt-5 max-w-2xl leading-relaxed">{experience.description}</p>

        <ul className="mt-6 grid gap-x-10 gap-y-3 text-[15px] leading-relaxed md:grid-cols-2">
          {experience.highlights.map((highlight) => (
            <li key={highlight} className="flex gap-3">
              <span aria-hidden="true" className="select-none text-ink-3">—</span>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>

        <p className="mt-7 font-mono text-xs leading-6 text-ink-3">{experience.tech.join('  ·  ')}</p>
      </div>
    </motion.article>
  );
};

const Experience = () => (
  <Section
    id="experience"
    index="02"
    label="Experience"
    title="From core banking to distributed systems at enterprise scale."
    lead="Around five years across banking, fintech, SaaS and enterprise — each role a step deeper into how financial software really runs."
  >
    {experiences.map((experience, index) => (
      <ExperienceItem key={experience.id} experience={experience} index={index} />
    ))}
  </Section>
);

export default Experience;
