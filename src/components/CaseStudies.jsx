import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { caseStudies } from '../data/mock';
import Section, { useReveal } from './Section';
import { Plus } from 'lucide-react';

const Block = ({ label, children }) => (
  <div>
    <h4 className="label mb-3">{label}</h4>
    {children}
  </div>
);

const Dashed = ({ items }) => (
  <ul className="space-y-2.5 text-[15px] leading-relaxed">
    {items.map((item) => (
      <li key={item} className="flex gap-3">
        <span aria-hidden="true" className="select-none text-ink-3">—</span>
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const CaseStudyItem = ({ study, index, isExpanded, onToggle, reducedMotion }) => {
  const reveal = useReveal();
  const panelId = `case-study-panel-${study.id}`;

  return (
    <motion.div {...reveal(index * 0.05)} className="border-b border-line">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isExpanded}
        aria-controls={panelId}
        className="group grid w-full grid-cols-[2.25rem_1fr_2rem] items-baseline gap-x-4 py-7 text-left md:grid-cols-[3rem_1fr_2rem] md:gap-x-6"
      >
        <span className="label">0{index + 1}</span>
        <span className="min-w-0">
          <span className="display block text-2xl leading-tight transition-colors group-hover:text-brand sm:text-[1.75rem]">
            {study.title}
          </span>
          <span className="mt-2 block text-sm text-ink-3">{study.project}</span>
        </span>
        <motion.span
          animate={{ rotate: isExpanded ? 45 : 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.25 }}
          className="inline-flex self-start text-ink-3 transition-colors group-hover:text-brand"
        >
          <Plus size={22} strokeWidth={1.5} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.35, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="space-y-9 pb-10 pt-2 md:pl-[4.5rem]">
              <div className="grid gap-9 md:grid-cols-2">
                <Block label="Context">
                  <p className="text-[15px] leading-relaxed">{study.context}</p>
                </Block>
                <Block label="The challenge">
                  <p className="text-[15px] leading-relaxed">{study.problem}</p>
                </Block>
              </div>

              <Block label="Approach">
                <p className="display max-w-2xl text-xl leading-snug sm:text-2xl">{study.approach}</p>
              </Block>

              <div className="grid gap-9 md:grid-cols-2">
                <Block label="Constraints">
                  <Dashed items={study.constraints} />
                </Block>
                <Block label="Architecture decisions">
                  <Dashed items={study.architecture} />
                </Block>
                <Block label="Implementation">
                  <Dashed items={study.implementation} />
                </Block>
                <div className="border-l-2 border-brand pl-5">
                  <h4 className="label mb-3 !text-brand">Results &amp; impact</h4>
                  <ul className="space-y-2.5 text-[15px] leading-relaxed text-ink">
                    {study.results.map((result) => (
                      <li key={result}>{result}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <Block label="What I'd improve next">
                <p className="max-w-2xl text-[15px] leading-relaxed">{study.improvements}</p>
              </Block>

              <p className="font-mono text-xs leading-6 text-ink-3">{study.tech.join('  ·  ')}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const CaseStudies = () => {
  const { reducedMotion } = useTheme();
  const [expandedId, setExpandedId] = useState(null);

  return (
    <Section
      id="case-studies"
      index="04"
      label="Case studies"
      title="How the hard problems were actually solved."
      lead="Three deep dives: the context, the constraints, the architecture decisions — and what I'd do differently."
    >
      <div className="border-t border-line">
        {caseStudies.map((study, index) => (
          <CaseStudyItem
            key={study.id}
            study={study}
            index={index}
            isExpanded={expandedId === study.id}
            onToggle={() => setExpandedId(expandedId === study.id ? null : study.id)}
            reducedMotion={reducedMotion}
          />
        ))}
      </div>
    </Section>
  );
};

export default CaseStudies;
