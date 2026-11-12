import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { Check, TrendingUp } from 'lucide-react';
import Modal from './Modal';

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'responsibilities', label: 'My role' },
  { id: 'results', label: 'Results' },
];

const Ticks = ({ items }) => (
  <ul className="space-y-3 text-[15px] leading-relaxed">
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

const ProjectDetailModal = ({ project, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (isOpen) setActiveTab('overview');
  }, [isOpen, project]);

  if (!project) return null;

  const facts = [
    { label: 'Role', value: project.role },
    { label: 'Industry', value: project.industry },
    project.duration && { label: 'Duration', value: project.duration },
    project.teamSize && { label: 'Team', value: project.teamSize },
  ].filter(Boolean);

  return (
    <Modal open={isOpen} onClose={onClose} labelledBy="project-modal-title" closeLabel="Close project details">
      <div className="relative overflow-hidden px-6 pb-0 pt-8 sm:px-10 sm:pt-10">
        <div aria-hidden="true" className="absolute -right-20 -top-28 h-64 w-64 rounded-full bg-brand/15 blur-3xl" />
        <p className="label relative">
          {project.category} · {project.industry}
        </p>
        <h2 id="project-modal-title" className="display relative mt-3 pr-12 text-3xl leading-tight sm:text-[2.6rem]">
          {project.name}
        </h2>
        {project.metrics && (
          <p className="relative mt-4 inline-flex items-center gap-2 rounded-full bg-brand/[0.08] px-3.5 py-1.5 text-sm font-semibold text-brand">
            <TrendingUp size={15} />
            {project.metrics}
          </p>
        )}

        <div role="tablist" aria-label="Project details" className="relative mt-8 flex gap-1 border-b border-line">
          <LayoutGroup id="project-tabs">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-4 pb-3.5 pt-1 text-sm font-semibold transition-colors ${
                    isActive ? 'text-ink' : 'text-ink-3 hover:text-ink'
                  }`}
                >
                  {tab.label}
                  {isActive && (
                    <motion.span layoutId="project-tab-line" className="absolute inset-x-2 -bottom-px h-[2px] rounded-full bg-brand" />
                  )}
                </button>
              );
            })}
          </LayoutGroup>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-8 sm:px-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <p className="text-[17px] leading-8 text-ink">{project.fullDescription || project.description}</p>

                <dl className="grid grid-cols-2 gap-3">
                  {facts.map((fact) => (
                    <div key={fact.label} className="rounded-2xl bg-paper-2 p-4">
                      <dt className="label">{fact.label}</dt>
                      <dd className="mt-1.5 text-sm font-medium text-ink">{fact.value}</dd>
                    </div>
                  ))}
                </dl>

                <div>
                  <h3 className="label">Tech stack</h3>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <li key={tech} className="chip">
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="label">Key features</h3>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {project.features.map((feature) => (
                      <li key={feature} className="chip !border-brand/25 !bg-brand/[0.06] !text-ink">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'responsibilities' && (
              <div className="space-y-9">
                {project.responsibilities ? (
                  <div>
                    <h3 className="label mb-4">What I did</h3>
                    <Ticks items={project.responsibilities} />
                  </div>
                ) : (
                  <p>No detailed responsibilities available.</p>
                )}
                {project.challenges && (
                  <div>
                    <h3 className="label mb-4">Challenges</h3>
                    <Ticks items={project.challenges} />
                  </div>
                )}
              </div>
            )}

            {activeTab === 'results' &&
              (project.outcomes ? (
                <ol className="space-y-3">
                  {project.outcomes.map((outcome, i) => (
                    <li key={outcome} className="flex items-start gap-5 rounded-2xl border border-line p-5">
                      <span className="display text-gradient text-2xl leading-none">0{i + 1}</span>
                      <span className="text-[17px] font-semibold leading-snug text-ink">{outcome}</span>
                    </li>
                  ))}
                </ol>
              ) : (
                <p>No results data available.</p>
              ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </Modal>
  );
};

export default ProjectDetailModal;
