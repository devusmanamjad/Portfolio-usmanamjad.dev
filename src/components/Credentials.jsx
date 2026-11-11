import React from 'react';
import { motion } from 'framer-motion';
import { certifications, education } from '../data/mock';
import Section, { useReveal } from './Section';

const Credentials = () => {
  const reveal = useReveal();

  return (
    <Section
      id="credentials"
      index="06"
      label="Credentials"
      title="Certified, and still learning."
      lead="Formal certifications and training that back up the hands-on work."
    >
      {/* Certifications */}
      <h3 className="label">Certifications</h3>
      <ul className="mt-4 border-t border-line">
        {certifications.map((cert, i) => (
          <motion.li
            key={cert.id}
            {...reveal(i * 0.04)}
            className="grid gap-x-10 gap-y-1 border-b border-line py-6 md:grid-cols-[1fr_auto] md:items-baseline"
          >
            <div className="min-w-0">
              <p className="display text-2xl leading-tight">{cert.name}</p>
              <p className="mt-2 max-w-xl text-[15px] leading-relaxed">{cert.description}</p>
            </div>
            <p className="label md:text-right">
              <span className={cert.featured ? 'text-brand' : undefined}>{cert.issuer}</span>
              <span className="mx-2">·</span>
              {cert.code}
            </p>
          </motion.li>
        ))}
      </ul>

      {/* Education */}
      <h3 className="label mt-14">Education</h3>
      <motion.div
        {...reveal()}
        className="mt-4 grid gap-x-10 gap-y-1 border-y border-line py-6 md:grid-cols-[1fr_auto] md:items-baseline"
      >
        <div className="min-w-0">
          <p className="display text-2xl leading-tight">{education.degree}</p>
          <p className="mt-2 text-[15px] leading-relaxed">
            {education.institution} · {education.field}
          </p>
        </div>
        <p className="label md:text-right">
          {education.period}
          <span className="mx-2">·</span>
          CGPA {education.cgpa}
        </p>
      </motion.div>
    </Section>
  );
};

export default Credentials;
