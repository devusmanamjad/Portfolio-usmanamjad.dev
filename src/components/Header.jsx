import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Sun, Moon, ArrowUpRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { personalInfo } from '../data/mock';
import { gsap, useGSAP, getLenis, scrollToTarget } from '../lib/motion';
import Logo from './Logo';
import Magnetic from './motion/Magnetic';

const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Work', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Testimonials', href: '#testimonials' },
];

const sectionIds = ['#top', '#about', '#experience', '#projects', '#case-studies', '#skills', '#credentials', '#testimonials', '#contact'];
// Sections without their own nav item light up the closest one.
const navFor = { '#case-studies': '#projects', '#credentials': '#skills' };

const Header = () => {
  const { theme, toggleTheme, isMobileMenuOpen, setIsMobileMenuOpen } = useTheme();
  const reduce = useReducedMotion();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const progress = useRef(null);

  // Hide on the way down, return on the way up.
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (Math.abs(y - lastY) > 6) {
        setHidden(y > lastY && y > 240);
        lastY = y;
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = sectionIds.map((id) => document.querySelector(id)).filter(Boolean);
    if (!sections.length) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = `#${entry.target.id}`;
          setActive(navFor[id] || id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Reading-progress hairline across the top of the page.
  useGSAP(() => {
    gsap.fromTo(
      progress.current,
      { scaleX: 0 },
      { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } }
    );
  });

  useEffect(() => {
    const lenis = getLenis();
    if (isMobileMenuOpen) {
      lenis?.stop();
      document.documentElement.style.overflow = 'hidden';
    } else {
      lenis?.start();
      document.documentElement.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  const goMobile = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    getLenis()?.start();
    document.documentElement.style.overflow = '';
    requestAnimationFrame(() => scrollToTarget(href));
  };

  const showBar = !hidden || isMobileMenuOpen;

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[2px]">
        <div ref={progress} className="h-full origin-left scale-x-0 bg-gradient-to-r from-brand to-brand-2" />
      </div>

      <header
        className={`fixed inset-x-0 top-0 z-[60] transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
          showBar ? 'translate-y-0' : '-translate-y-[120%]'
        }`}
      >
        <nav aria-label="Primary" className="container-page flex h-[84px] items-center justify-between gap-4">
          <a href="#top" aria-label="Usman Amjad — back to top" className="shrink-0">
            <Logo size={34} />
          </a>

          {/* Desktop navigation: a floating pill with a sliding highlight */}
          <ul
            className={`hidden items-center gap-1 rounded-full border p-1.5 transition-all duration-500 lg:flex ${
              scrolled ? 'glass shadow-[0_10px_40px_-20px_rgb(var(--ink)/0.35)]' : 'border-transparent'
            }`}
          >
            {navItems.map((item) => {
              const isActive = active === item.href;
              return (
                <li key={item.name} className="relative">
                  {isActive && (
                    <motion.span
                      layoutId="nav-highlight"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-ink"
                    />
                  )}
                  <a
                    href={item.href}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative block rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                      isActive ? 'text-paper' : 'text-ink-2 hover:text-ink'
                    }`}
                  >
                    {item.name}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              className="glass inline-flex h-11 w-11 items-center justify-center rounded-full text-ink transition-transform duration-500 hover:rotate-[20deg]"
            >
              {theme === 'dark' ? <Sun size={18} strokeWidth={1.75} /> : <Moon size={18} strokeWidth={1.75} />}
            </button>

            <Magnetic className="hidden sm:inline-block">
              <a href="#contact" className="btn !py-3">
                Let&apos;s talk
                <ArrowUpRight size={16} strokeWidth={2} />
              </a>
            </Magnetic>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              className="glass relative inline-flex h-11 w-11 items-center justify-center rounded-full text-ink lg:hidden"
            >
              <span
                className={`absolute h-[1.5px] w-[18px] bg-current transition-transform duration-300 ${
                  isMobileMenuOpen ? 'rotate-45' : '-translate-y-[4px]'
                }`}
              />
              <span
                className={`absolute h-[1.5px] w-[18px] bg-current transition-transform duration-300 ${
                  isMobileMenuOpen ? '-rotate-45' : 'translate-y-[4px]'
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu: full-screen sheet with large staggered links */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: reduce ? 0 : 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[55] flex flex-col bg-paper px-6 pb-10 pt-28 lg:hidden"
          >
            <ul className="flex-1 space-y-1">
              {[...navItems, { name: 'Contact', href: '#contact' }].map((item, i) => (
                <li key={item.name} className="overflow-hidden">
                  <motion.a
                    href={item.href}
                    onClick={(e) => goMobile(e, item.href)}
                    initial={{ y: reduce ? 0 : '110%' }}
                    animate={{ y: 0 }}
                    exit={{ y: reduce ? 0 : '110%' }}
                    transition={{ duration: reduce ? 0 : 0.7, delay: reduce ? 0 : 0.15 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    className="display flex items-baseline gap-4 py-2 text-[2.6rem] leading-tight"
                  >
                    <span className="label text-brand">0{i + 1}</span>
                    {item.name}
                  </motion.a>
                </li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: reduce ? 0 : 0.5 } }}
              exit={{ opacity: 0 }}
              className="border-t border-line pt-6"
            >
              <a href={`mailto:${personalInfo.email}`} className="text-lg font-semibold text-ink">
                {personalInfo.email}
              </a>
              <p className="mt-1 text-sm text-ink-3">{personalInfo.location}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
