import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { caseStudies } from '../data/mock';
import { ChevronDown, Target, Lightbulb, Layers, CheckCircle, ArrowRight } from 'lucide-react';

const CaseStudyCard = ({ study, isExpanded, onToggle, reducedMotion }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: reducedMotion ? 0 : 0.5 }}
    className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50 overflow-hidden"
  >
    {/* Header - Always Visible */}
    <button
      onClick={onToggle}
      className="w-full p-6 lg:p-8 text-left flex items-start justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
    >
      <div className="flex-1">
        <div className="flex flex-wrap gap-2 mb-3">
          {study.tech.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs font-medium bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
        <h3 className="text-xl lg:text-2xl font-bold text-slate-900 dark:text-white mb-2">
          {study.title}
        </h3>
        <p className="text-slate-600 dark:text-slate-400">
          {study.project}
        </p>
      </div>
      <motion.div
        animate={{ rotate: isExpanded ? 180 : 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.3 }}
        className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 flex-shrink-0"
      >
        <ChevronDown size={20} />
      </motion.div>
    </button>

    {/* Expandable Content */}
    <AnimatePresence>
      {isExpanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.4 }}
          className="overflow-hidden"
        >
          <div className="px-6 lg:px-8 pb-8 space-y-6 border-t border-slate-100 dark:border-slate-700 pt-6">
            {/* Context */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Target className="text-cyan-500" size={20} />
                <h4 className="font-semibold text-slate-900 dark:text-white">Context</h4>
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {study.context}
              </p>
            </div>

            {/* Problem */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="text-amber-500" size={20} />
                <h4 className="font-semibold text-slate-900 dark:text-white">The Challenge</h4>
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                {study.problem}
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {study.constraints.map((constraint, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 text-sm text-slate-500 dark:text-slate-400"
                  >
                    <ArrowRight size={14} className="text-cyan-500 mt-1 flex-shrink-0" />
                    <span>{constraint}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Approach */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Layers className="text-purple-500" size={20} />
                <h4 className="font-semibold text-slate-900 dark:text-white">My Approach</h4>
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                {study.approach}
              </p>
              <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4">
                <h5 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                  Architecture Decisions
                </h5>
                <ul className="space-y-2">
                  {study.architecture.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Implementation */}
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-3">
                Implementation Highlights
              </h4>
              <div className="grid sm:grid-cols-2 gap-3">
                {study.implementation.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400"
                  >
                    <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Results */}
            <div className="bg-gradient-to-br from-cyan-50 to-cyan-100/50 dark:from-cyan-900/20 dark:to-cyan-800/10 rounded-xl p-6">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Results & Impact</h4>
              <div className="grid sm:grid-cols-2 gap-4">
                {study.results.map((result, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 bg-white dark:bg-slate-800 rounded-lg p-3"
                  >
                    <div className="p-1.5 bg-green-100 dark:bg-green-900/30 rounded-full">
                      <CheckCircle size={14} className="text-green-500" />
                    </div>
                    <span className="text-sm text-slate-700 dark:text-slate-300">{result}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Future Improvements */}
            <div className="border-l-4 border-cyan-500 pl-4">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2">What I'd Improve</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {study.improvements}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

const CaseStudies = () => {
  const { reducedMotion } = useTheme();
  const [expandedId, setExpandedId] = useState(null);

  const handleToggle = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="case-studies" className="py-20 lg:py-32 bg-white dark:bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reducedMotion ? 0 : 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-cyan-500 font-medium mb-4 block">Deep Dives</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Case Studies
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Detailed breakdowns of complex problems I've solved and the impact delivered
          </p>
        </motion.div>

        {/* Case Studies List */}
        <div className="space-y-6">
          {caseStudies.map((study) => (
            <CaseStudyCard
              key={study.id}
              study={study}
              isExpanded={expandedId === study.id}
              onToggle={() => handleToggle(study.id)}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;