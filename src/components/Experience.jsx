import React, { useRef } from 'react';
import { Check, MapPin } from 'lucide-react';
import { experiences } from '../data/mock';
import { gsap, ScrollTrigger, useGSAP, motionAllowed } from '../lib/motion';
import SectionHeading from './SectionHeading';

const ExperienceItem = ({ experience }) => {
  const isCurrent = experience.type === 'current';

  return (
    <li data-exp-item className="relative pb-10 pl-12 last:pb-0 sm:pl-16">
      {/* Timeline node */}
      <span
        aria-hidden="true"
        data-exp-dot
        className="absolute left-0 top-9 flex h-[23px] w-[23px] items-center justify-center rounded-full border border-line bg-paper transition-all duration-500 [&.is-active]:scale-110 [&.is-active]:border-brand [&.is-active]:shadow-[0_0_0_6px_rgb(var(--brand)/0.12)] [&.is-active>span]:bg-brand [html:not(.motion)_&]:border-brand [html:not(.motion)_&>span]:bg-brand"
      >
        <span className="h-[9px] w-[9px] rounded-full bg-ink/20 transition-colors duration-500" />
      </span>

      <article data-reveal className="card p-7 sm:p-9">
        <div className="flex flex-wrap items-center gap-2">
          <span className="chip !bg-paper-2 !text-ink">{experience.period}</span>
          {isCurrent && (
            <span className="chip !border-emerald-500/30 !bg-emerald-500/10 !text-emerald-700 dark:!text-emerald-300">
              <span className="pulse-dot mr-2 h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Current role
            </span>
          )}
          <span className="ml-auto flex items-center gap-1.5 text-sm text-ink-3">
            <MapPin size={14} />
            {experience.location}
          </span>
        </div>

        <h3 className="display mt-6 text-[1.75rem] leading-tight sm:text-[2.1rem]">{experience.role}</h3>
        <p className="mt-2 text-[17px] font-semibold text-ink">
          {experience.company}
          {experience.project && <span className="font-medium text-ink-3"> · {experience.project}</span>}
        </p>

        {experience.roles && (
          <ol aria-label={`Roles at ${experience.company}`} className="mt-6 flex flex-wrap gap-2">
            {experience.roles.map((role, i) => (
              <li
                key={role.title}
                className={`flex items-center gap-3 rounded-2xl border px-4 py-2.5 text-sm ${
                  i === 0 ? 'border-brand/30 bg-brand/[0.07] text-ink' : 'border-line text-ink-3'
                }`}
              >
                <span className="font-semibold">{role.title}</span>
                <span className="text-xs">{role.period}</span>
              </li>
            ))}
          </ol>
        )}

        <p className="mt-6 max-w-2xl leading-relaxed">{experience.description}</p>

        <ul className="mt-6 grid gap-x-8 gap-y-3 text-[15px] leading-relaxed md:grid-cols-2">
          {experience.highlights.map((highlight) => (
            <li key={highlight} className="flex gap-3">
              <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                <Check size={12} strokeWidth={3} />
              </span>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>

        <ul aria-label="Technologies" className="mt-8 flex flex-wrap gap-2 border-t border-line pt-6">
          {experience.tech.map((tech) => (
            <li key={tech} className="chip">
              {tech}
            </li>
          ))}
        </ul>
      </article>
    </li>
  );
};

const Experience = () => {
  const root = useRef(null);
  const line = useRef(null);

  useGSAP(
    () => {
      if (!motionAllowed()) return;
      // The timeline fills as you scroll, and each node lights up as it is reached.
      gsap.fromTo(
        line.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: { trigger: '[data-exp-list]', start: 'top 60%', end: 'bottom 60%', scrub: 0.5 },
        }
      );
      gsap.utils.toArray('[data-exp-item]').forEach((item) => {
        ScrollTrigger.create({
          trigger: item,
          start: 'top 60%',
          toggleClass: { targets: item.querySelector('[data-exp-dot]'), className: 'is-active' },
        });
      });
    },
    { scope: root }
  );

  return (
    <section id="experience" ref={root} className="relative bg-paper-2/60 py-28 lg:py-40">
      <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              index="02"
              eyebrow="Experience"
              size="md"
              title="From core banking to distributed systems at enterprise scale."
              lead="Around five years across banking, fintech, SaaS and enterprise, each role a step deeper into how financial software really runs."
            />
          </div>
        </div>

        <div className="relative lg:col-span-8">
          <div aria-hidden="true" className="absolute bottom-0 left-[11px] top-9 w-px bg-line">
            <div ref={line} className="h-full w-full origin-top bg-gradient-to-b from-brand to-brand-2" />
          </div>
          <ol data-exp-list className="relative">
            {experiences.map((experience) => (
              <ExperienceItem key={experience.id} experience={experience} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Experience;
