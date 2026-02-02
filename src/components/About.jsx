import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { personalInfo } from '../data/mock';
import { MapPin } from 'lucide-react';

const About = () => {
  const { reducedMotion } = useTheme();

  const stats = [
    { value: '5+', label: 'Years Experience' },
    { value: '10+', label: 'Projects Delivered' },
    // { value: '3', label: 'Countries Worked' },
    { value: '99%', label: 'Client Satisfaction' },
  ];

  return (
    <section id="about" className="py-20 lg:py-32 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reducedMotion ? 0 : 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-cyan-500 font-medium mb-4 block">About Me</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Building Digital Excellence
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Passionate about crafting scalable solutions that make a real impact
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Photo Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: reducedMotion ? 0 : 0.6 }}
            className="relative"
          >
            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-cyan-500/10 rounded-2xl -z-10" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-cyan-500/5 rounded-2xl -z-10" />
            
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50">
              {/* Photo */}
              <div className="relative mb-6">
                <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-cyan-400 to-cyan-600">
                  <img
                    src={personalInfo.photo}
                    alt={personalInfo.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Status badge */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-full shadow-lg">
                  Open to Work
                </div>
              </div>

              {/* Location Only */}
              <div className="flex items-center justify-center gap-2 text-slate-600 dark:text-slate-400">
                <MapPin size={18} className="text-cyan-500" />
                <span>{personalInfo.location}</span>
              </div>
            </div>
          </motion.div>

          {/* About Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: reducedMotion ? 0 : 0.6 }}
          >
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Hi, I'm {personalInfo.name}
            </h3>
            
            <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              {personalInfo.about.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: reducedMotion ? 0 : index * 0.1 }}
                  className="text-center p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm"
                >
                  <div className="text-2xl sm:text-3xl font-bold text-cyan-500 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-4">
              <motion.a
                href="#contact"
                className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-xl shadow-lg shadow-cyan-500/25 transition-colors"
                whileHover={{ scale: reducedMotion ? 1 : 1.05 }}
                whileTap={{ scale: reducedMotion ? 1 : 0.95 }}
              >
                Let's Connect
              </motion.a>
              <motion.a
                href={personalInfo.resumeUrl}
                target='_blank'
                rel="noopener noreferrer"
                className="px-6 py-3 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:border-cyan-500 hover:text-cyan-500 font-medium rounded-xl transition-colors"
                whileHover={{ scale: reducedMotion ? 1 : 1.05 }}
                whileTap={{ scale: reducedMotion ? 1 : 0.95 }}
              >
                Download CV
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
