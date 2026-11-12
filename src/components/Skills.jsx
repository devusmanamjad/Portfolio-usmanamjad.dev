import React from 'react';
import { Code2, Layers, Cloud, Database, FlaskConical, Wrench } from 'lucide-react';
import { skills } from '../data/mock';
import SectionHeading from './SectionHeading';

const groups = [
  { title: 'Languages', icon: Code2, items: skills.languages },
  { title: 'Frameworks', icon: Layers, items: skills.frameworks },
  { title: 'Cloud & DevOps', icon: Cloud, items: skills.cloud },
  { title: 'Data', icon: Database, items: skills.databases },
  { title: 'Testing', icon: FlaskConical, items: skills.testing },
  { title: 'Tooling & delivery', icon: Wrench, items: skills.tools },
];

const Skills = () => (
  <section id="skills" className="relative py-28 lg:py-40">
    <div className="container-page">
      <SectionHeading
        index="05"
        eyebrow="Skills"
        title="The stack I build and operate with."
        lead="C# and .NET at the core, Azure underneath, React on top, with testing and delivery pipelines holding it together."
      />

      <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-5">
        {groups.map(({ title, icon: Icon, items }) => (
          <article
            key={title}
            data-reveal
            className="card group relative overflow-hidden p-7 transition-[transform,border-color] duration-500 hover:-translate-y-1 hover:border-brand/30"
          >
            <div
              aria-hidden="true"
              className="absolute -bottom-20 -right-20 h-48 w-48 rounded-full bg-brand-2/10 blur-2xl transition-transform duration-700 group-hover:scale-150"
            />
            <div className="relative flex items-center justify-between">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-line bg-paper-2 text-brand transition-all duration-500 group-hover:-rotate-6 group-hover:border-transparent group-hover:bg-gradient-to-br group-hover:from-brand group-hover:to-brand-2 group-hover:text-white">
                <Icon size={22} strokeWidth={1.75} />
              </span>
              <span className="label">{String(items.length).padStart(2, '0')} tools</span>
            </div>
            <h3 className="display relative mt-7 text-2xl">{title}</h3>
            <ul className="relative mt-5 flex flex-wrap gap-2">
              {items.map((item) => {
                const name = item.name || item;
                return (
                  <li key={name} className="chip transition-colors duration-300 hover:border-brand/40 hover:text-ink">
                    {name}
                  </li>
                );
              })}
            </ul>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Skills;
