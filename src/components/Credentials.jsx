import React from 'react';
import { Award, GraduationCap } from 'lucide-react';
import { certifications, education } from '../data/mock';
import SectionHeading from './SectionHeading';

const Credentials = () => (
  <section id="credentials" className="relative bg-paper-2/60 py-28 lg:py-40">
    <div className="container-page">
      <SectionHeading
        index="06"
        eyebrow="Credentials"
        title="Certified, and still learning."
        lead="Formal certifications and training that back up the hands-on work."
      />

      <div className="mt-16 grid gap-4 lg:mt-20 lg:grid-cols-12 lg:gap-5">
        <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-8 lg:gap-5">
          {certifications.map((cert) => (
            <li
              key={cert.id}
              data-reveal
              className={`card relative overflow-hidden p-7 ${cert.featured ? 'ring-1 ring-brand/25' : ''}`}
            >
              {cert.featured && (
                <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand to-brand-2" />
              )}
              <div className="flex items-center justify-between gap-3">
                <span
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl ${
                    cert.featured ? 'bg-gradient-to-br from-brand to-brand-2 text-white' : 'border border-line bg-paper-2 text-ink-2'
                  }`}
                >
                  <Award size={20} strokeWidth={1.75} />
                </span>
                <span className="chip">{cert.code}</span>
              </div>
              <p className="label mt-7">{cert.issuer}</p>
              <h3 className="display mt-2 text-xl leading-snug sm:text-[1.4rem]">{cert.name}</h3>
              <p className="mt-3 text-[15px] leading-relaxed">{cert.description}</p>
            </li>
          ))}
        </ul>

        <article data-reveal className="band-dark relative overflow-hidden rounded-[1.75rem] bg-paper p-8 text-ink-2 lg:col-span-4">
          <div aria-hidden="true" className="aurora animate-drift-a -right-20 -top-20 h-64 w-64 bg-[rgb(var(--glow-1)/0.6)]" />
          <div aria-hidden="true" className="aurora animate-drift-b -bottom-24 -left-16 h-56 w-56 bg-[rgb(var(--glow-2)/0.5)]" />
          <div className="relative flex h-full flex-col">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white">
              <GraduationCap size={22} strokeWidth={1.75} />
            </span>
            <p className="label mt-8">Education · {education.period}</p>
            <h3 className="display mt-3 text-[1.75rem] leading-tight">{education.degree}</h3>
            <p className="mt-3 text-[15px] leading-relaxed">
              {education.field}
              <br />
              {education.institution}
            </p>
            <div className="mt-auto pt-10">
              <p className="label">CGPA</p>
              <p className="display mt-1 text-5xl">{education.cgpa}</p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
);

export default Credentials;
