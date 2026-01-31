import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { 
  X, 
  Briefcase, 
  Users, 
  Clock, 
  CheckCircle, 
  TrendingUp,
  Building,
  ChevronRight,
  Sparkles
} from 'lucide-react';

// Animated 3D Floating Cube
const FloatingCube = ({ size = 40, color = '#06b6d4', delay = 0, position }) => {
  const { reducedMotion } = useTheme();
  
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ ...position }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: delay, duration: 0.5 }}
    >
      <motion.div
        animate={reducedMotion ? {} : {
          rotateX: [0, 360],
          rotateY: [0, 360],
          y: [0, -10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
          y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }}
        style={{
          width: size,
          height: size,
          transformStyle: 'preserve-3d',
          perspective: '500px',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            background: `linear-gradient(135deg, ${color}40, ${color}20)`,
            border: `2px solid ${color}50`,
            borderRadius: '8px',
            backdropFilter: 'blur(4px)',
          }}
        />
      </motion.div>
    </motion.div>
  );
};

// Animated 3D Floating Sphere
const FloatingSphere = ({ size = 30, color = '#06b6d4', delay = 0, position }) => {
  const { reducedMotion } = useTheme();
  
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ ...position }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: delay, duration: 0.5 }}
    >
      <motion.div
        animate={reducedMotion ? {} : {
          y: [0, -15, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay
        }}
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          background: `radial-gradient(circle at 30% 30%, ${color}60, ${color}20)`,
          boxShadow: `0 0 20px ${color}40, inset 0 0 20px ${color}20`,
        }}
      />
    </motion.div>
  );
};

// Animated Ring
const FloatingRing = ({ size = 50, color = '#06b6d4', delay = 0, position }) => {
  const { reducedMotion } = useTheme();
  
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ ...position }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: delay, duration: 0.5 }}
    >
      <motion.div
        animate={reducedMotion ? {} : {
          rotate: [0, 360],
          rotateX: [0, 45, 0, -45, 0],
        }}
        transition={{
          rotate: { duration: 10, repeat: Infinity, ease: "linear" },
          rotateX: { duration: 6, repeat: Infinity, ease: "easeInOut" }
        }}
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          border: `3px solid ${color}40`,
          transformStyle: 'preserve-3d',
        }}
      />
    </motion.div>
  );
};

// Particle effect
const Particles = ({ count = 12 }) => {
  const { reducedMotion } = useTheme();
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 2,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-cyan-400/30"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={reducedMotion ? {} : {
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
};

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

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'responsibilities', label: 'My Role' },
    { id: 'results', label: 'Results' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-x-4 top-[10%] bottom-[10%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[700px] md:max-h-[80vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl z-50 overflow-hidden flex flex-col"
          >
            {/* 3D Floating Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <FloatingCube size={35} position={{ top: '8%', right: '8%' }} delay={0.2} />
              <FloatingSphere size={25} position={{ top: '20%', left: '5%' }} delay={0.4} color="#8b5cf6" />
              <FloatingRing size={40} position={{ bottom: '15%', right: '10%' }} delay={0.6} />
              <FloatingSphere size={20} position={{ bottom: '25%', left: '8%' }} delay={0.3} color="#10b981" />
              <FloatingCube size={25} position={{ top: '50%', right: '5%' }} delay={0.5} color="#f59e0b" />
              <Particles count={15} />
            </div>

            {/* Header */}
            <div className="relative px-6 pt-6 pb-4 border-b border-slate-100 dark:border-slate-800">
              {/* Close Button */}
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 transition-colors z-10"
              >
                <X size={18} />
              </motion.button>

              {/* Category & Title */}
              <div className="flex items-center gap-2 mb-3">
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  project.category === 'Enterprise' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400' :
                  project.category === 'SaaS' ? 'bg-cyan-100 text-cyan-600 dark:bg-cyan-900/40 dark:text-cyan-400' :
                  'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400'
                }`}>
                  {project.category}
                </span>
                {project.metrics && (
                  <span className="flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400">
                    <TrendingUp size={12} />
                    {project.metrics}
                  </span>
                )}
              </div>

              <h2 className="text-2xl font-bold text-slate-900 dark:text-white pr-10">
                {project.name}
              </h2>

              {/* Quick Info */}
              <div className="flex flex-wrap gap-3 mt-3 text-sm text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <Briefcase size={14} className="text-cyan-500" />
                  {project.role}
                </span>
                <span className="flex items-center gap-1">
                  <Building size={14} className="text-cyan-500" />
                  {project.industry}
                </span>
                {project.duration && (
                  <span className="flex items-center gap-1">
                    <Clock size={14} className="text-cyan-500" />
                    {project.duration}
                  </span>
                )}
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 px-6 py-3 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {tab.label}
                </motion.button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-5 relative">
              <AnimatePresence mode="wait">
                {activeTab === 'overview' && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-5"
                  >
                    {/* Description */}
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {project.fullDescription || project.description}
                    </p>

                    {/* Tech Stack */}
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                        <Sparkles size={16} className="text-cyan-500" />
                        Tech Stack
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Key Features */}
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
                        Key Features
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.features.map((feature) => (
                          <span
                            key={feature}
                            className="px-3 py-1.5 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300 rounded-lg text-sm border border-cyan-100 dark:border-cyan-800/30"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Team Info */}
                    {project.teamSize && (
                      <div className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                        <Users size={18} className="text-cyan-500" />
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          Team: <span className="font-medium text-slate-900 dark:text-white">{project.teamSize}</span>
                        </span>
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === 'responsibilities' && (
                  <motion.div
                    key="responsibilities"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-3"
                  >
                    {project.responsibilities ? (
                      project.responsibilities.map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl"
                        >
                          <CheckCircle className="text-cyan-500 mt-0.5 flex-shrink-0" size={18} />
                          <span className="text-sm text-slate-600 dark:text-slate-400">{item}</span>
                        </motion.div>
                      ))
                    ) : (
                      <p className="text-slate-500">No detailed responsibilities available.</p>
                    )}

                    {/* Challenges */}
                    {project.challenges && (
                      <div className="mt-6">
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
                          Challenges Overcome
                        </h4>
                        <div className="grid gap-2">
                          {project.challenges.slice(0, 3).map((challenge, i) => (
                            <div
                              key={i}
                              className="flex items-start gap-2 text-sm text-slate-500 dark:text-slate-400"
                            >
                              <ChevronRight size={16} className="text-amber-500 mt-0.5 flex-shrink-0" />
                              <span>{challenge}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === 'results' && (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-3"
                  >
                    {project.outcomes ? (
                      project.outcomes.map((outcome, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                          className="p-4 bg-gradient-to-r from-emerald-50 to-cyan-50 dark:from-emerald-900/20 dark:to-cyan-900/20 rounded-xl border border-emerald-100 dark:border-emerald-800/30"
                        >
                          <div className="flex items-start gap-3">
                            <div className="p-1 bg-emerald-100 dark:bg-emerald-900/50 rounded-full">
                              <TrendingUp size={14} className="text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{outcome}</span>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <p className="text-slate-500">No results data available.</p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-2.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-xl font-medium transition-colors"
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetailModal;
