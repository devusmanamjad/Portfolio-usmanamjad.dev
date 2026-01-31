import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { projects, categories } from '../data/mock';
import ProjectDetailModal from './ProjectDetailModal';
import { ExternalLink, Layers, Users, TrendingUp, Eye } from 'lucide-react';

const ProjectCard = ({ project, index, reducedMotion, onViewDetails }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : index * 0.05 }}
    whileHover={{ y: reducedMotion ? 0 : -5 }}
    className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50 hover:shadow-xl transition-shadow"
  >
    {/* Header */}
    <div className="p-6 pb-4">
      <div className="flex items-start justify-between mb-4">
        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
          project.category === 'Enterprise' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' :
          project.category === 'SaaS' ? 'bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400' :
          'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
        }`}>
          {project.category}
        </span>
        <motion.button
          onClick={() => onViewDetails(project)}
          whileHover={{ scale: reducedMotion ? 1 : 1.1 }}
          whileTap={{ scale: reducedMotion ? 1 : 0.9 }}
          className="p-2 rounded-lg text-slate-400 hover:text-cyan-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          title="View Details"
        >
          <Eye size={18} />
        </motion.button>
      </div>

      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-cyan-500 transition-colors">
        {project.name}
      </h3>
      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
        {project.description}
      </p>

      {/* Meta Info */}
      <div className="flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400 mb-4">
        <div className="flex items-center gap-1">
          <Layers size={14} />
          <span>{project.role}</span>
        </div>
        <div className="flex items-center gap-1">
          <Users size={14} />
          <span>{project.industry}</span>
        </div>
      </div>

      {/* Metrics if available */}
      {project.metrics && (
        <div className="flex items-center gap-2 px-3 py-2 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg text-sm text-cyan-600 dark:text-cyan-400 mb-4">
          <TrendingUp size={16} />
          <span className="font-medium">{project.metrics}</span>
        </div>
      )}
    </div>

    {/* Features */}
    <div className="px-6 pb-4">
      <div className="flex flex-wrap gap-2 mb-4">
        {project.features.slice(0, 3).map((feature) => (
          <span
            key={feature}
            className="px-2 py-1 text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-md"
          >
            {feature}
          </span>
        ))}
      </div>
    </div>

    {/* Tech Stack & View Details Button */}
    <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-700">
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tech.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 text-xs font-medium bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full border border-slate-200 dark:border-slate-700"
          >
            {tech}
          </span>
        ))}
        {project.tech.length > 4 && (
          <span className="px-3 py-1 text-xs font-medium bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-full border border-slate-200 dark:border-slate-700">
            +{project.tech.length - 4} more
          </span>
        )}
      </div>
      
      {/* View Details Button */}
      <motion.button
        onClick={() => onViewDetails(project)}
        whileHover={{ scale: reducedMotion ? 1 : 1.02 }}
        whileTap={{ scale: reducedMotion ? 1 : 0.98 }}
        className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        <Eye size={16} />
        <span>View Project Details</span>
      </motion.button>
    </div>
  </motion.div>
);

const Projects = () => {
  const { reducedMotion } = useTheme();
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <section id="projects" className="py-20 lg:py-32 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reducedMotion ? 0 : 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-cyan-500 font-medium mb-4 block">Project Experience</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Projects I've Worked On
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            A collection of impactful projects across fintech, SaaS, and enterprise domains. Click on any project to see detailed information.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reducedMotion ? 0 : 0.5 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              whileHover={{ scale: reducedMotion ? 1 : 1.05 }}
              whileTap={{ scale: reducedMotion ? 1 : 0.95 }}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                activeCategory === category
                  ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                reducedMotion={reducedMotion}
                onViewDetails={handleViewDetails}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default Projects;
