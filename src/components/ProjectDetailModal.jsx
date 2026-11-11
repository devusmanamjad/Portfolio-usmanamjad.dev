import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { X } from 'lucide-react';

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'responsibilities', label: 'My role' },
  { id: 'results', label: 'Results' },
];

const Dashed = ({ items }) => (
  <ul className="space-y-3 text-[15px] leading-relaxed">
    {items.map((item) => (
      <li key={item} className="flex gap-3">
        <span aria-hidden="true" className="select-none text-ink-3">—</span>
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const ProjectDetailModal = ({ project, isOpen, onClose }) => {
  const { reducedMotion } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      setActiveTab('overview');
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  const facts = [
    { label: 'Role', value: project.role },
    { label: 'Industry', value: project.industry },
    project.duration && { label: 'Duration', value: project.duration },
    project.teamSize && { label: 'Team', value: project.teamSize },
  ].filter(Boolean);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.2 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/45 p-4"
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ opacity: 0, y: reducedMotion ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reducedMotion ? 0 : 16 }}
            transition={{ duration: reducedMotion ? 0 : 0.25, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-lg border border-line bg-paper shadow-2xl"
          >
            {/* Header */}
            <div className="px-6 pt-7 sm:px-10 sm:pt-9">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close project details"
                className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full text-ink-2 transition-colors hover:bg-ink/[0.06] hover:text-ink"
              >
                <X size={20} strokeWidth={1.5} />
              </button>

              <p className="label">{project.category}</p>
              <h2 id="project-modal-title" className="display mt-3 pr-10 text-3xl leading-tight sm:text-4xl">
                {project.name}
              </h2>
              {project.metrics && <p className="mt-3 font-serif text-xl italic text-brand">{project.metrics}</p>}

              {/* Tabs */}
              <div role="tablist" aria-label="Project details" className="mt-7 flex gap-7 border-b border-line">
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveTab(tab.id)}
                      className={`-mb-px border-b pb-3 text-sm transition-colors ${
                        isActive ? 'border-ink text-ink' : 'border-transparent text-ink-3 hover:text-ink'
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-7 sm:px-10 sm:py-8">
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  <p className="text-[17px] leading-8 text-ink">{project.fullDescription || project.description}</p>

                  <dl className="grid grid-cols-2 gap-x-8 gap-y-5 border-y border-line py-6">
                    {facts.map((fact) => (
                      <div key={fact.label}>
                        <dt className="label">{fact.label}</dt>
                        <dd className="mt-1.5 text-sm text-ink">{fact.value}</dd>
                      </div>
                    ))}
                  </dl>

                  <div>
                    <h3 className="label">Tech stack</h3>
                    <p className="mt-3 font-mono text-[13px] leading-7 text-ink-2">{project.tech.join('  ·  ')}</p>
                  </div>

                  <div>
                    <h3 className="label">Key features</h3>
                    <p className="mt-3 text-[15px] leading-7">{project.features.join('  ·  ')}</p>
                  </div>
                </div>
              )}

              {activeTab === 'responsibilities' && (
                <div className="space-y-8">
                  {project.responsibilities ? (
                    <div>
                      <h3 className="label mb-4">What I did</h3>
                      <Dashed items={project.responsibilities} />
                    </div>
                  ) : (
                    <p>No detailed responsibilities available.</p>
                  )}

                  {project.challenges && (
                    <div>
                      <h3 className="label mb-4">Challenges</h3>
                      <Dashed items={project.challenges} />
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'results' && (
                <div>
                  {project.outcomes ? (
                    <ol>
                      {project.outcomes.map((outcome, i) => (
                        <li key={outcome} className="flex items-baseline gap-5 border-b border-line py-5 first:pt-0 last:border-b-0">
                          <span className="label">0{i + 1}</span>
                          <span className="display text-xl leading-snug sm:text-2xl">{outcome}</span>
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <p>No results data available.</p>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetailModal;
