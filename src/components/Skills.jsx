import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { skills } from '../data/mock';
import { Code, Cloud, Database, Wrench, Sparkles } from 'lucide-react';

const SkillBadge = ({ name, delay, reducedMotion }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: reducedMotion ? 0 : 0.3, delay: reducedMotion ? 0 : delay }}
    whileHover={{ scale: reducedMotion ? 1 : 1.05, y: reducedMotion ? 0 : -2 }}
    className="px-4 py-2.5 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md border border-slate-100 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium text-sm transition-all cursor-default"
  >
    {name}
  </motion.div>
);

const SkillCategory = ({ title, icon: Icon, skillList, color, delay, reducedMotion }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: reducedMotion ? 0 : 0.5, delay: reducedMotion ? 0 : delay }}
    className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800"
  >
    <div className="flex items-center gap-3 mb-5">
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon className="text-white" size={22} />
      </div>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
    </div>
    <div className="flex flex-wrap gap-2">
      {skillList.map((skill, i) => (
        <SkillBadge
          key={skill.name || skill}
          name={skill.name || skill}
          delay={delay + i * 0.03}
          reducedMotion={reducedMotion}
        />
      ))}
    </div>
  </motion.div>
);

const Skills = () => {
  const { reducedMotion } = useTheme();

  const categories = [
    {
      title: 'Languages',
      icon: Code,
      skills: skills.languages,
      color: 'bg-gradient-to-br from-cyan-500 to-cyan-600',
    },
    {
      title: 'Frameworks & Libraries',
      icon: Sparkles,
      skills: skills.frameworks,
      color: 'bg-gradient-to-br from-violet-500 to-violet-600',
    },
    {
      title: 'Cloud & DevOps',
      icon: Cloud,
      skills: skills.cloud,
      color: 'bg-gradient-to-br from-sky-500 to-sky-600',
    },
    {
      title: 'Databases',
      icon: Database,
      skills: skills.databases,
      color: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
    },
  ];

  return (
    <section id="skills" className="py-20 lg:py-32 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reducedMotion ? 0 : 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-cyan-500 font-medium mb-4 block">What I Work With</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Skills & Technologies
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Technologies I've mastered through years of building enterprise solutions
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {categories.map((category, index) => (
            <SkillCategory
              key={category.title}
              title={category.title}
              icon={category.icon}
              skillList={category.skills}
              color={category.color}
              delay={index * 0.1}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>

        {/* Tools Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reducedMotion ? 0 : 0.6 }}
          className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500">
              <Wrench className="text-white" size={22} />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Tools & Platforms</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.tools.map((tool, i) => (
              <SkillBadge
                key={tool}
                name={tool}
                delay={i * 0.03}
                reducedMotion={reducedMotion}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
