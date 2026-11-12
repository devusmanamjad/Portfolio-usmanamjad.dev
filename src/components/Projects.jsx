import React, { useCallback, useState } from 'react';
import { motion, AnimatePresence, LayoutGroup, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, TrendingUp } from 'lucide-react';
import { projects, categories } from '../data/mock';
import ProjectDetailModal from './ProjectDetailModal';
import SectionHeading from './SectionHeading';

// A soft spotlight that follows the pointer across a card.
const trackPointer = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
};

const ProjectCard = ({ project, index, wide, onOpen }) => {
  const reduce = useReducedMotion();
  return (
    <motion.li
      layout={!reduce}
      initial={{ opacity: 0, y: reduce ? 0 : 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.25 } }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: reduce ? 0 : 0.9, delay: reduce ? 0 : (index % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={wide ? 'md:col-span-2' : undefined}
    >
      <button
        type="button"
        onClick={() => onOpen(project)}
        onPointerMove={trackPointer}
        data-cursor="View"
        aria-label={`View details for ${project.name}`}
        className="card group relative flex h-full w-full flex-col overflow-hidden p-7 text-left transition-[transform,border-color] duration-500 hover:-translate-y-1 hover:border-brand/30 sm:p-9"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: 'radial-gradient(520px circle at var(--mx, 50%) var(--my, 50%), rgb(var(--brand) / 0.1), transparent 45%)',
          }}
        />

        <span className="relative flex items-center gap-3">
          <span className="label text-brand">{String(index + 1).padStart(2, '0')}</span>
          <span className="chip">{project.category}</span>
          <span className="hidden truncate text-sm text-ink-3 sm:inline">{project.industry}</span>
          <span className="ml-auto inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-all duration-500 group-hover:rotate-45 group-hover:border-transparent group-hover:bg-ink group-hover:text-paper">
            <ArrowUpRight size={18} strokeWidth={1.75} />
          </span>
        </span>

        <span className={`relative mt-10 grid gap-8 ${wide ? 'lg:grid-cols-[1.2fr_1fr] lg:items-end' : ''}`}>
          <span className="block">
            <span className={`display block leading-[1.08] ${wide ? 'text-[clamp(1.9rem,3.4vw,2.9rem)]' : 'text-[1.7rem] sm:text-[2rem]'}`}>
              {project.name}
            </span>
            <span className="mt-4 block max-w-xl text-[15.5px] leading-relaxed">{project.description}</span>
            {project.metrics && (
              <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand/[0.08] px-3.5 py-1.5 text-sm font-semibold text-brand">
                <TrendingUp size={15} />
                {project.metrics}
              </span>
            )}
          </span>

          <span className="flex flex-wrap content-end gap-2">
            {project.tech.slice(0, wide ? 8 : 4).map((tech) => (
              <span key={tech} className="chip">
                {tech}
              </span>
            ))}
            {!wide && project.tech.length > 4 && <span className="chip">+{project.tech.length - 4}</span>}
          </span>
        </span>
      </button>
    </motion.li>
  );
};

const Projects = () => {
  const reduce = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState('All');
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  const filtered = activeCategory === 'All' ? projects : projects.filter((p) => p.category === activeCategory);
  // With an odd number of cards, the first one spans both columns so the grid stays even.
  const firstIsWide = filtered.length % 2 === 1;

  const openProject = (project) => {
    setSelected(project);
    setOpen(true);
  };
  const close = useCallback(() => setOpen(false), []);

  return (
    <section id="projects" className="relative py-28 lg:py-40">
      <div className="container-page">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            index="03"
            eyebrow="Selected work"
            title="Platforms I've helped build and run."
            lead="Enterprise, SaaS and fintech systems across tax, payments, banking and analytics. Open a project for the product, my role and the results."
          />

          <div data-reveal role="group" aria-label="Filter projects by category" className="glass flex shrink-0 gap-1 self-start rounded-full p-1.5 lg:self-auto">
            <LayoutGroup id="project-filter">
              {categories.map((category) => {
                const isActive = activeCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    aria-pressed={isActive}
                    className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300 ${
                      isActive ? 'text-paper' : 'text-ink-2 hover:text-ink'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="filter-pill"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        className="absolute inset-0 rounded-full bg-ink"
                      />
                    )}
                    <span className="relative">{category}</span>
                  </button>
                );
              })}
            </LayoutGroup>
          </div>
        </div>

        <motion.ul layout={!reduce} className="mt-16 grid gap-5 md:grid-cols-2 lg:mt-20 lg:gap-6">
          <AnimatePresence mode="popLayout" initial={false}>
            {filtered.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                wide={firstIsWide && index === 0}
                onOpen={openProject}
              />
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>

      <ProjectDetailModal project={selected} isOpen={open} onClose={close} />
    </section>
  );
};

export default Projects;
