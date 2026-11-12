import React, { useCallback, useRef, useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { caseStudies } from '../data/mock';
import { gsap, useGSAP, motionAllowed } from '../lib/motion';
import SectionHeading from './SectionHeading';
import Modal from './Modal';

const Ticks = ({ items }) => (
  <ul className="space-y-2.5 text-[15px] leading-relaxed">
    {items.map((item) => (
      <li key={item} className="flex gap-3">
        <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
          <Check size={12} strokeWidth={3} />
        </span>
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const Block = ({ label, children }) => (
  <div>
    <h4 className="label mb-3">{label}</h4>
    {children}
  </div>
);

const cardTop = (i) => 120 + i * 28;

const CaseStudyModal = ({ study, open, onClose }) => {
  if (!study) return null;
  return (
    <Modal
      open={open}
      onClose={onClose}
      labelledBy="case-modal-title"
      closeLabel="Close case study"
      maxWidth="max-w-4xl"
    >
      <div className="overflow-y-auto px-6 py-9 sm:px-12 sm:py-12">
        <p className="label">Case study · {study.project}</p>
        <h2 id="case-modal-title" className="display mt-3 pr-12 text-3xl leading-tight sm:text-[2.6rem]">
          {study.title}
        </h2>

        <div className="mt-10 space-y-10">
          <div className="grid gap-8 md:grid-cols-2">
            <Block label="Context">
              <p className="text-[15px] leading-relaxed">{study.context}</p>
            </Block>
            <Block label="The challenge">
              <p className="text-[15px] leading-relaxed">{study.problem}</p>
            </Block>
          </div>

          <div className="rounded-3xl bg-paper-2 p-6 sm:p-8">
            <h4 className="label mb-3">Approach</h4>
            <p className="display text-xl leading-snug sm:text-2xl">{study.approach}</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <Block label="Constraints">
              <Ticks items={study.constraints} />
            </Block>
            <Block label="Architecture decisions">
              <Ticks items={study.architecture} />
            </Block>
            <Block label="Implementation">
              <Ticks items={study.implementation} />
            </Block>
            <div className="rounded-3xl border border-brand/25 bg-brand/[0.05] p-6">
              <h4 className="label mb-3 !text-brand">Results &amp; impact</h4>
              <ul className="space-y-2.5 text-[15px] font-medium leading-relaxed text-ink">
                {study.results.map((result) => (
                  <li key={result}>{result}</li>
                ))}
              </ul>
            </div>
          </div>

          <Block label="What I'd improve next">
            <p className="max-w-2xl text-[15px] leading-relaxed">{study.improvements}</p>
          </Block>

          <ul className="flex flex-wrap gap-2 border-t border-line pt-6">
            {study.tech.map((tech) => (
              <li key={tech} className="chip">
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Modal>
  );
};

const CaseStudies = () => {
  const root = useRef(null);
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  // On large screens the cards stack: each one pins under the header, and the
  // card beneath shrinks and dims as the next slides over it.
  useGSAP(
    () => {
      if (!motionAllowed()) return;
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1024px)', () => {
        // Sticky elements make poor triggers (their position moves), so each
        // card has a zero-height marker at its natural place in the flow.
        const cards = gsap.utils.toArray('[data-case-card]');
        const markers = gsap.utils.toArray('[data-case-marker]');
        cards.forEach((card, i) => {
          const next = markers[i + 1];
          if (!next) return;
          const range = { trigger: next, start: 'top bottom', end: `top ${cardTop(i + 1)}px`, scrub: true };
          // Cards stay opaque; a shade fades over the one underneath so the top card stays crisp.
          gsap.to(card.firstElementChild, { scale: 0.92, ease: 'none', scrollTrigger: { ...range } });
          gsap.to(card.querySelector('[data-case-shade]'), { opacity: 0.7, ease: 'none', scrollTrigger: { ...range } });
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="case-studies" ref={root} className="relative bg-paper-2/60 py-28 lg:py-40">
      <div className="container-page">
        <SectionHeading
          index="04"
          eyebrow="Case studies"
          title="How the hard problems were actually solved."
          lead="Three deep dives: the context, the constraints, the architecture decisions, and what I'd do differently."
        />

        <div className="mt-16 lg:mt-20">
          {caseStudies.map((study, i) => (
            <React.Fragment key={study.id}>
              <div data-case-marker aria-hidden="true" className={i > 0 ? 'mt-6 lg:mt-[18vh]' : undefined} />
              <div data-case-card className="lg:sticky" style={{ top: `${cardTop(i)}px` }}>
                <article className="card relative origin-top overflow-hidden p-7 sm:p-10 lg:p-12">
                  <div
                    aria-hidden="true"
                    className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand/10 blur-3xl"
                  />
                  <div
                    aria-hidden="true"
                    data-case-shade
                    className="pointer-events-none absolute inset-0 z-10 bg-paper-2 opacity-0"
                  />
                  <div className="relative grid gap-10 lg:grid-cols-12 lg:gap-14">
                    <div className="lg:col-span-5">
                      <div className="flex items-center gap-3">
                        <span className="display text-gradient text-5xl leading-none">0{i + 1}</span>
                        <span className="chip">{study.project}</span>
                      </div>
                      <h3 className="display mt-8 text-[1.9rem] leading-[1.1] sm:text-[2.4rem]">{study.title}</h3>
                      <p className="mt-5 text-[15.5px] leading-relaxed">{study.problem}</p>
                      <button
                        type="button"
                        onClick={() => {
                          setSelected(study);
                          setOpen(true);
                        }}
                        className="btn mt-8"
                      >
                        Read the full breakdown
                        <ArrowRight size={16} strokeWidth={2} />
                      </button>
                    </div>

                    <div className="space-y-6 lg:col-span-7">
                      <div className="rounded-3xl bg-paper-2 p-6 sm:p-7">
                        <h4 className="label mb-3">Approach</h4>
                        <p className="text-[16.5px] font-medium leading-relaxed text-ink">{study.approach}</p>
                      </div>
                      <div className="rounded-3xl border border-brand/20 bg-brand/[0.05] p-6 sm:p-7">
                        <h4 className="label mb-4 !text-brand">Results</h4>
                        <Ticks items={study.results.slice(0, 3)} />
                      </div>
                      <ul className="flex flex-wrap gap-2">
                        {study.tech.slice(0, 6).map((tech) => (
                          <li key={tech} className="chip">
                            {tech}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      <CaseStudyModal study={selected} open={open} onClose={close} />
    </section>
  );
};

export default CaseStudies;
