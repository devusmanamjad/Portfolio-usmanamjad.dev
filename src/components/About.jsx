import React, { useRef } from 'react';
import { MapPin, ShieldCheck, GitMerge, Rocket } from 'lucide-react';
import { personalInfo, principles } from '../data/mock';
import { gsap, useGSAP, motionAllowed } from '../lib/motion';
import SectionHeading from './SectionHeading';

const statement =
  "I'm a .NET engineer who cares most about what happens in production: systems that stay reliable under real-world load, tests that gate every merge, and deployments boring enough to forget.";
const highlighted = new Set(['production:', 'reliable', 'boring']);

const principleIcons = [ShieldCheck, GitMerge, Rocket];

const About = () => {
  const root = useRef(null);
  const words = useRef(null);
  const photo = useRef(null);

  useGSAP(
    () => {
      if (!motionAllowed()) return;
      // The statement lights up word by word as it scrolls through the viewport.
      gsap.fromTo(
        words.current.querySelectorAll('[data-word]'),
        { opacity: 0.14 },
        {
          opacity: 1,
          stagger: 0.05,
          ease: 'none',
          scrollTrigger: { trigger: words.current, start: 'top 80%', end: 'bottom 45%', scrub: 0.6 },
        }
      );

      // Portrait: unmasked from the bottom, then a slow parallax inside its frame.
      gsap.fromTo(
        photo.current,
        { clipPath: 'inset(100% 0% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.6,
          ease: 'expo.inOut',
          scrollTrigger: { trigger: photo.current, start: 'top 85%', once: true },
        }
      );
      gsap.fromTo(
        photo.current.querySelector('img'),
        { yPercent: -8, scale: 1.18 },
        {
          yPercent: 8,
          scale: 1.18,
          ease: 'none',
          scrollTrigger: { trigger: photo.current, start: 'top bottom', end: 'bottom top', scrub: true },
        }
      );
    },
    { scope: root }
  );

  return (
    <section id="about" ref={root} className="relative py-28 lg:py-40">
      <div className="container-page">
        <SectionHeading index="01" eyebrow="About" />

        <h2 ref={words} className="display mt-8 max-w-5xl text-[clamp(1.75rem,3.6vw,3.2rem)] leading-[1.22] tracking-[-0.025em]">
          {statement.split(' ').map((word, i) => (
            <React.Fragment key={i}>
              <span data-word className={highlighted.has(word) ? 'text-gradient' : undefined}>
                {word}
              </span>{' '}
            </React.Fragment>
          ))}
        </h2>

        <div className="mt-20 grid gap-12 lg:mt-28 lg:grid-cols-12 lg:gap-16">
          {/* Portrait */}
          <figure className="lg:col-span-5">
            <div ref={photo} className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-paper-2">
              <img
                src={personalInfo.photo}
                alt={`Portrait of ${personalInfo.name}`}
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <figcaption className="glass absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 rounded-2xl px-4 py-3">
                <span>
                  <span className="block text-sm font-semibold text-ink">{personalInfo.name}</span>
                  <span className="flex items-center gap-1.5 text-xs text-ink-2">
                    <MapPin size={12} />
                    {personalInfo.location}
                  </span>
                </span>
                <span className="flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                  <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Open to work
                </span>
              </figcaption>
            </div>
          </figure>

          {/* Story */}
          <div className="lg:col-span-7 lg:pt-4">
            <div className="space-y-6 text-[17px] leading-8">
              {personalInfo.about.split('\n\n').map((paragraph, i) => (
                <p key={i} data-reveal className={i === 0 ? 'text-ink' : undefined}>
                  {paragraph}
                </p>
              ))}
            </div>

            <p data-reveal className="mt-10 flex flex-wrap gap-2">
              {personalInfo.credentials.split(' · ').map((item) => (
                <span key={item} className="chip">
                  {item}
                </span>
              ))}
            </p>
          </div>
        </div>

        {/* Principles */}
        <div className="mt-20 grid gap-4 md:grid-cols-3 lg:mt-28 lg:gap-5">
          {principles.map((principle, i) => {
            const Icon = principleIcons[i % principleIcons.length];
            return (
              <article
                key={principle.title}
                data-reveal
                className="card group relative overflow-hidden p-7 transition-transform duration-500 hover:-translate-y-1.5 sm:p-8"
              >
                <div
                  aria-hidden="true"
                  className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-brand/10 blur-2xl transition-transform duration-700 group-hover:scale-150"
                />
                <div className="relative flex items-center justify-between">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-brand-2 text-white shadow-lg shadow-brand/25">
                    <Icon size={22} strokeWidth={1.75} />
                  </span>
                  <span className="label">0{i + 1}</span>
                </div>
                <h3 className="display relative mt-8 text-2xl leading-tight">{principle.title}</h3>
                <p className="relative mt-3 text-[15px] leading-relaxed">{principle.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;
