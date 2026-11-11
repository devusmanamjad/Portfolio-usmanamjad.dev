import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Menu, X } from 'lucide-react';
import Logo from './Logo';

const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Work', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Credentials', href: '#credentials' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Contact', href: '#contact' },
];

const Header = () => {
  const { theme, toggleTheme, reducedMotion, isMobileMenuOpen, setIsMobileMenuOpen } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState('');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mark the nav item for the section currently in view ('#top' clears it).
  useEffect(() => {
    const sections = [...navItems.map((item) => item.href), '#top']
      .map((href) => document.querySelector(href))
      .filter(Boolean);
    if (!sections.length || !('IntersectionObserver' in window)) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveHref(`#${entry.target.id}`);
        });
      },
      { rootMargin: '-35% 0px -60% 0px' }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setIsMobileMenuOpen(false);
  const solid = isScrolled || isMobileMenuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        solid ? 'border-line bg-paper/95 backdrop-blur-sm' : 'border-transparent bg-transparent'
      }`}
    >
      <nav aria-label="Primary" className="container-page flex h-[72px] items-center justify-between gap-6">
        <a href="#top" aria-label="Usman Amjad — back to top" className="shrink-0">
          <Logo size={32} />
        </a>

        <div className="flex items-center gap-2 lg:gap-6">
          {/* Desktop navigation */}
          <ul className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => {
              const isActive = activeHref === item.href;
              return (
                <li key={item.name}>
                  <a
                    href={item.href}
                    aria-current={isActive ? 'true' : undefined}
                    className={`text-sm transition-colors hover:text-ink ${
                      isActive ? 'text-ink underline decoration-brand decoration-2 underline-offset-[10px]' : 'text-ink-3'
                    }`}
                  >
                    {item.name}
                  </a>
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink-2 transition-colors hover:bg-ink/[0.06] hover:text-ink"
          >
            {theme === 'dark' ? <Sun size={18} strokeWidth={1.75} /> : <Moon size={18} strokeWidth={1.75} />}
          </button>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/[0.06] lg:hidden"
          >
            {isMobileMenuOpen ? <X size={20} strokeWidth={1.75} /> : <Menu size={20} strokeWidth={1.75} />}
          </button>
        </div>
      </nav>

      {/* Mobile navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.25 }}
            className="overflow-hidden border-t border-line bg-paper lg:hidden"
          >
            <ul className="container-page py-4">
              {navItems.map((item, i) => (
                <li key={item.name} className="border-b border-line last:border-b-0">
                  <a href={item.href} onClick={closeMenu} className="flex items-baseline gap-4 py-4">
                    <span className="label">0{i + 1}</span>
                    <span className="display text-2xl">{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
