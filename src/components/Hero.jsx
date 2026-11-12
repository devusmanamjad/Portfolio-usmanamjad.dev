import React, { useEffect, useRef } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { personalInfo, stats } from '../data/mock';
import { gsap, SplitText, useGSAP, motionAllowed } from '../lib/motion';
import SystemCard from './SystemCard';
import Magnetic from './motion/Magnetic';

const socials = [
  { label: 'LinkedIn', href: personalInfo.linkedin },
  { label: 'GitHub', href: personalInfo.github },
  { label: 'WhatsApp', href: personalInfo.whatsapp },
  { label: 'Email', href: `mailto:${personalInfo.email}` },
];

const Hero = ({ ready }) => {
  const root = useRef(null);
  const title = useRef(null);
  const content = useRef(null);
  const glow = useRef(null);

  // Entrance, once the intro curtain lifts.
  useGSAP(
    () => {
      if (!ready || !motionAllowed()) return;
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      SplitText.create(title.current, {
        type: 'lines',
        mask: 'lines',
        autoSplit: true,
        onSplit(self) {
          gsap.set(title.current, { visibility: 'visible' });
          return gsap.from(self.lines, { yPercent: 115, duration: 1.4, stagger: 0.1, ease: 'expo.out', delay: 0.1 });
        },
      });

      gsap.set('[data-hero]', { visibility: 'visible' });
      tl.from('[data-hero="fade"]', { y: 40, opacity: 0, duration: 1.4, stagger: 0.1 }, 0.35)
        .from('[data-hero="card"]', { y: 80, opacity: 0, scale: 0.94, duration: 1.8 }, 0.4)
        .from('[data-hero="chip"]', { scale: 0, opacity: 0, duration: 1.2, stagger: 0.12, ease: 'back.out(2)' }, 1)
        .from('[data-hero="stat"]', { y: 40, opacity: 0, duration: 1.2, stagger: 0.08 }, 0.8);

      // Count the numeric stats up from zero.
      gsap.utils.toArray('[data-count]').forEach((el) => {
        const target = Number(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const counter = { v: 0 };
        tl.to(
          counter,
          {
            v: target,
            duration: 1.6,
            ease: 'power3.out',
            onUpdate: () => {
              el.textContent = `${Math.round(counter.v)}${suffix}`;
            },
          },
          0.9
        );
      });

      // Scrolling away: the content drifts and fades behind the next section.
      gsap.to(content.current, {
        y: 120,
        opacity: 0.25,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      });
    },
    { dependencies: [ready], scope: root }
  );

  // Colour fields follow the pointer a little.
  useEffect(() => {
    if (!motionAllowed() || !window.matchMedia('(pointer: fine)').matches) return undefined;
    const xTo = gsap.quickTo(glow.current, 'x', { duration: 2, ease: 'power3.out' });
    const yTo = gsap.quickTo(glow.current, 'y', { duration: 2, ease: 'power3.out' });
    const onMove = (e) => {
      xTo((e.clientX / window.innerWidth - 0.5) * 60);
      yTo((e.clientY / window.innerHeight - 0.5) * 40);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return (
    <section id="top" ref={root} className="relative overflow-hidden">
      {/* Background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="bg-grid absolute inset-0" />
        <div ref={glow} className="absolute inset-0">
          <div className="aurora animate-drift-a left-[-10%] top-[-15%] h-[38rem] w-[38rem] bg-[rgb(var(--glow-1)/0.55)]" />
          <div className="aurora animate-drift-b right-[-12%] top-[5%] h-[34rem] w-[34rem] bg-[rgb(var(--glow-2)/0.5)]" />
          <div className="aurora animate-drift-c bottom-[-20%] left-[30%] h-[30rem] w-[30rem] bg-[rgb(var(--glow-3)/0.4)]" />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-paper" />
      </div>

      <div ref={content} className="container-page relative pb-16 pt-32 sm:pt-36 lg:pb-20 lg:pt-40">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <p
              data-hero="fade"
              className="glass inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-sm font-medium text-ink"
            >
              <span className="pulse-dot h-2 w-2 rounded-full bg-emerald-500" />
              {personalInfo.title} at {personalInfo.currentCompany}
            </p>

            <h1
              ref={title}
              data-split-hero
              className="display mt-8 text-[clamp(2.6rem,5.3vw,4.7rem)] leading-[1.04] [html.motion_&]:invisible"
            >
              I build <span className="text-gradient">reliable,</span> event-driven systems for enterprise fintech.
            </h1>

            <p data-hero="fade" className="mt-8 max-w-xl text-lg leading-relaxed sm:text-xl sm:leading-relaxed">
              {personalInfo.tagline}
            </p>

            <div data-hero="fade" className="mt-10 flex flex-wrap items-center gap-3">
              <Magnetic>
                <a href="#projects" className="btn-brand">
                  View selected work
                  <ArrowDown size={16} strokeWidth={2} />
                </a>
              </Magnetic>
              <Magnetic>
                <a href={personalInfo.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn-outline">
                  Download CV
                  <ArrowUpRight size={16} strokeWidth={2} />
                </a>
              </Magnetic>
            </div>

            <ul data-hero="fade" className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
              {socials.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group inline-flex items-center gap-1 text-ink-2 transition-colors hover:text-ink"
                  >
                    {link.label}
                    <ArrowUpRight
                      size={14}
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Illustration */}
          <div className="relative lg:col-span-5">
            <div data-hero="card">
              <SystemCard />
            </div>
            <span
              data-hero="chip"
              className="glass animate-float absolute -left-4 -top-5 hidden rounded-full px-3.5 py-1.5 text-xs font-semibold text-ink shadow-lg sm:inline-flex"
            >
              .NET 8 / 10
            </span>
            <span
              data-hero="chip"
              className="glass animate-float-slow absolute -bottom-5 -right-3 hidden rounded-full px-3.5 py-1.5 text-xs font-semibold text-ink shadow-lg sm:inline-flex"
            >
              Kubernetes · AKS
            </span>
            <span
              data-hero="chip"
              className="glass animate-float-slow absolute -right-6 top-1/3 hidden rounded-full px-3.5 py-1.5 text-xs font-semibold text-ink shadow-lg xl:inline-flex"
            >
              Azure
            </span>
          </div>
        </div>

        {/* Key facts */}
        <dl className="mt-20 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-24 lg:grid-cols-4">
          {stats.map((stat) => {
            const match = /^(\d+)(\D*)$/.exec(stat.value);
            return (
              <div key={stat.label} data-hero="stat" className="glass rounded-3xl p-5 sm:p-6">
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span
                    className="display block text-4xl leading-none sm:text-5xl"
                    data-count={match ? match[1] : undefined}
                    data-suffix={match ? match[2] : undefined}
                  >
                    {stat.value}
                  </span>
                  <span className="mt-3 block text-sm leading-snug text-ink-2">{stat.label}</span>
                </dd>
              </div>
            );
          })}
        </dl>

        <a
          href="#about"
          data-hero="fade"
          className="mt-14 hidden items-center gap-3 text-sm font-medium text-ink-3 transition-colors hover:text-ink lg:inline-flex"
        >
          <span className="relative flex h-10 w-6 justify-center rounded-full border border-ink/25">
            <span className="mt-2 h-2 w-1 animate-bounce rounded-full bg-ink/50" />
          </span>
          Scroll to explore
        </a>
      </div>
    </section>
  );
};

export default Hero;
