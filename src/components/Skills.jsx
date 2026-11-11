import React from 'react';
import { motion } from 'framer-motion';
import { skills } from '../data/mock';
import Section, { useReveal } from './Section';

const groups = [
  { title: 'Languages', items: skills.languages },
  { title: 'Frameworks', items: skills.frameworks },
  { title: 'Cloud & DevOps', items: skills.cloud },
  { title: 'Data', items: skills.databases },
  { title: 'Testing', items: skills.testing },
  { title: 'Tooling & delivery', items: skills.tools },
];

const Skills = () => {
  const reveal = useReveal();

  return (
    <Section
      id="skills"
      index="05"
      label="Skills"
      title="The stack I build and operate with."
      lead="C# and .NET at the core, Azure underneath, React on top — with testing and delivery pipelines holding it together."
    >
      <dl className="border-t border-line">
        {groups.map((group, i) => (
          <motion.div
            key={group.title}
            {...reveal(i * 0.04)}
            className="grid gap-x-10 gap-y-2 border-b border-line py-6 md:grid-cols-[13rem_1fr] md:items-baseline"
          >
            <dt className="display text-2xl leading-tight">{group.title}</dt>
            <dd>
              <ul className="flex flex-wrap gap-x-2 gap-y-1 text-[15px] leading-7">
                {group.items.map((item, j) => {
                  const name = item.name || item;
                  return (
                    <li key={name} className="flex gap-2">
                      <span className="text-ink">{name}</span>
                      {j < group.items.length - 1 && <span aria-hidden="true" className="text-ink-3">·</span>}
                    </li>
                  );
                })}
              </ul>
            </dd>
          </motion.div>
        ))}
      </dl>
    </Section>
  );
};

export default Skills;
