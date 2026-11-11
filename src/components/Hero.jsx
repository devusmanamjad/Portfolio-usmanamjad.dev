import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { personalInfo, stats } from '../data/mock';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

const Hero = () => {
  const { reducedMotion } = useTheme();

  const fadeUp = (delay) => ({
    initial: { opacity: 0, y: reducedMotion ? 0 : 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reducedMotion ? 0 : 0.7, delay: reducedMotion ? 0 : delay, ease: [0.22, 0.61, 0.36, 1] },
  });

  const links = [
    { label: 'LinkedIn', href: personalInfo.linkedin },
    { label: 'GitHub', href: personalInfo.github },
    { label: 'WhatsApp', href: personalInfo.whatsapp },
    { label: 'Email', href: `mailto:${personalInfo.email}` },
  ];

  return (
    <section id="top" className="container-page pb-20 pt-36 sm:pt-44 lg:pb-24 lg:pt-52">
      <motion.p {...fadeUp(0)} className="label flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="h-1.5 w-1.5 rounded-full bg-brand" />
        <span className="text-ink">{personalInfo.title}</span>
        <span>·</span>
        <span>{personalInfo.currentCompany}</span>
        <span>·</span>
        <span>{personalInfo.location}</span>
      </motion.p>

      <motion.h1
        {...fadeUp(0.08)}
        className="display mt-8 max-w-5xl text-[clamp(2.7rem,7.4vw,6.25rem)] leading-[1.02]"
      >
        I build <em className="text-brand">reliable</em>, event-driven systems for enterprise fintech.
      </motion.h1>

      <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12">
        <motion.p {...fadeUp(0.16)} className="max-w-xl text-lg leading-relaxed lg:col-span-6">
          {personalInfo.tagline}
        </motion.p>

        <motion.div {...fadeUp(0.24)} className="lg:col-span-5 lg:col-start-8">
          <div className="flex flex-wrap gap-3">
            <a href="#projects" className="btn">
              View selected work
              <ArrowDown size={16} strokeWidth={1.75} />
            </a>
            <a href={personalInfo.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn-outline">
              Download CV
              <ArrowUpRight size={16} strokeWidth={1.75} />
            </a>
          </div>
          <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="link"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Key facts */}
      <motion.dl {...fadeUp(0.32)} className="mt-20 grid grid-cols-2 gap-x-8 lg:mt-28 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="border-t border-line py-6">
            <dt className="sr-only">{stat.label}</dt>
            <dd>
              <span className="display block text-5xl leading-none sm:text-6xl">{stat.value}</span>
              <span className="mt-3 block max-w-[14rem] text-sm leading-snug">{stat.label}</span>
            </dd>
          </div>
        ))}
      </motion.dl>
    </section>
  );
};

export default Hero;
