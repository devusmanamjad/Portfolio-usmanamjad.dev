import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { experiences } from '../data/mock';
import { Briefcase, MapPin, Calendar, ChevronRight } from 'lucide-react';

const ExperienceCard = ({ experience, index, reducedMotion }) => {
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: reducedMotion ? 0 : 0.5, delay: reducedMotion ? 0 : index * 0.1 }}
      className={`relative flex items-center gap-8 ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
    >
      {/* Timeline Line & Dot - Desktop */}
      <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 flex-col items-center">
        <div className={`w-4 h-4 rounded-full border-4 ${
          experience.type === 'current'
            ? 'bg-cyan-500 border-cyan-200 dark:border-cyan-900'
            : 'bg-slate-400 border-slate-200 dark:border-slate-700'
        }`} />
        {index < experiences.length - 1 && (
          <div className="w-0.5 h-32 bg-slate-200 dark:bg-slate-700" />
        )}
      </div>

      {/* Content */}
      <div className={`flex-1 ${isLeft ? 'lg:text-right lg:pr-16' : 'lg:text-left lg:pl-16'}`}>
        <motion.div
          whileHover={{ y: reducedMotion ? 0 : -5 }}
          className={`bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50 hover:shadow-xl transition-shadow ${
            experience.type === 'current' ? 'ring-2 ring-cyan-500/20' : ''
          }`}
        >
          {/* Status Badge */}
          {experience.type === 'current' && (
            <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-medium mb-4 ${
              isLeft ? 'lg:float-right lg:ml-4' : ''
            }`}>
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
              Current
            </div>
          )}

          {/* Role & Company */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
            {experience.role}
          </h3>
          <div className="flex items-center gap-2 text-cyan-500 font-medium mb-3 flex-wrap">
            <Briefcase size={16} />
            <span>{experience.company}</span>
            {experience.project && (
              <>
                <span className="text-slate-400">•</span>
                <span className="text-slate-600 dark:text-slate-400">{experience.project}</span>
              </>
            )}
          </div>

          {/* Meta */}
          <div className={`flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400 mb-4 ${
            isLeft ? 'lg:justify-end' : ''
          }`}>
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span>{experience.period}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin size={14} />
              <span>{experience.location}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
            {experience.description}
          </p>

          {/* Highlights */}
          <ul className={`space-y-2 mb-4 ${
            isLeft ? 'lg:text-left' : ''
          }`}>
            {experience.highlights.slice(0, 4).map((highlight, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400"
              >
                <ChevronRight size={14} className="text-cyan-500 mt-1 flex-shrink-0" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>

          {/* Tech Stack */}
          <div className={`flex flex-wrap gap-2 ${
            isLeft ? 'lg:justify-end' : ''
          }`}>
            {experience.tech.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Spacer for alternating layout */}
      <div className="hidden lg:block flex-1" />
    </motion.div>
  );
};

const Experience = () => {
  const { reducedMotion } = useTheme();

  return (
    <section id="experience" className="py-20 lg:py-32 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reducedMotion ? 0 : 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-cyan-500 font-medium mb-4 block">Career Journey</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Work Experience
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            My professional journey through fintech, enterprise, and SaaS development
          </p>
        </motion.div>

        {/* Mobile Timeline Indicator */}
        <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
          <div className="w-2 h-2 rounded-full bg-cyan-500" />
          <div className="w-16 h-0.5 bg-slate-300 dark:bg-slate-600" />
          <div className="w-2 h-2 rounded-full bg-slate-400" />
          <div className="w-16 h-0.5 bg-slate-300 dark:bg-slate-600" />
          <div className="w-2 h-2 rounded-full bg-slate-400" />
        </div>

        {/* Experience Timeline */}
        <div className="space-y-8 lg:space-y-0">
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              index={index}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;