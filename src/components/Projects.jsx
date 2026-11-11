import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { projects, categories } from '../data/mock';
import ProjectDetailModal from './ProjectDetailModal';
import Section, { useReveal } from './Section';
import { ArrowUpRight } from 'lucide-react';

const Projects = () => {
  const reveal = useReveal();
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <Section
      id="projects"
      index="03"
      label="Selected work"
      title="Platforms I've helped build and run."
      lead="Enterprise, SaaS and fintech systems across tax, payments, banking and analytics. Select a project for the product, my role and the results."
    >
      {/* Filters */}
      <motion.div
        {...reveal()}
        role="group"
        aria-label="Filter projects by category"
        className="mb-2 flex flex-wrap items-center gap-x-7 gap-y-2"
      >
        {categories.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              aria-pressed={isActive}
              className={`border-b pb-1.5 text-sm transition-colors ${
                isActive ? 'border-ink text-ink' : 'border-transparent text-ink-3 hover:text-ink'
              }`}
            >
              {category}
            </button>
          );
        })}
        <span className="label ml-auto">
          {String(filteredProjects.length).padStart(2, '0')} {filteredProjects.length === 1 ? 'project' : 'projects'}
        </span>
      </motion.div>

      {/* List */}
      <ol className="mt-5 border-t border-line">
        {filteredProjects.map((project, index) => (
          <motion.li key={project.id} {...reveal(index * 0.04)} className="border-b border-line">
            <button
              type="button"
              onClick={() => handleViewDetails(project)}
              aria-label={`View details for ${project.name}`}
              className="group grid w-full grid-cols-[2.25rem_1fr_1.5rem] items-baseline gap-x-4 py-7 text-left md:grid-cols-[3rem_1fr_13rem_1.5rem] md:gap-x-6"
            >
              <span className="label">{String(index + 1).padStart(2, '0')}</span>

              <span className="min-w-0">
                <span className="display block text-2xl leading-tight transition-colors group-hover:text-brand sm:text-[1.75rem]">
                  {project.name}
                </span>
                <span className="mt-2 block max-w-xl text-[15px] leading-relaxed">{project.description}</span>
                <span className="mt-3 block text-sm text-ink-3 md:hidden">
                  {project.category} · {project.industry}
                </span>
              </span>

              <span className="hidden text-sm leading-6 text-ink-3 md:block">
                <span className="block text-ink-2">{project.category}</span>
                {project.industry}
              </span>

              <ArrowUpRight
                size={20}
                strokeWidth={1.5}
                className="self-start text-ink-3 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
              />
            </button>
          </motion.li>
        ))}
      </ol>

      <ProjectDetailModal project={selectedProject} isOpen={isModalOpen} onClose={handleCloseModal} />
    </Section>
  );
};

export default Projects;
