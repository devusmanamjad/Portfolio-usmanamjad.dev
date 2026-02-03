import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import WhiteLogo from '../imgs/others/White.png';
import BlackLogo from '../imgs/others/Black.png';
import MenuToggle3D from './MenuToggle3D';



const Header = () => {
  const { theme, toggleTheme, reducedMotion, toggleReducedMotion, isMobileMenuOpen, setIsMobileMenuOpen } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href) => {
    setIsMobileMenuOpen(false);
    // Delay scroll to let the layout settle after menu closes
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
      }
    }, 350);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: reducedMotion ? 0 : 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
<motion.a
  href="#"
  className="flex items-center gap-2"
  whileHover={{ scale: reducedMotion ? 1 : 1.05 }}
>
  {/* Light theme */}
  <img
    src={BlackLogo}
    alt="Usman Amjad Logo"
    className="block h-8 dark:hidden"
  />

  {/* Dark theme */}
  <img
    src={WhiteLogo}
    alt="Usman Amjad Logo"
    className="hidden h-8 dark:block"
  />
</motion.a>
          {/* <motion.a
            href="#"
            className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white"
            whileHover={{ scale: reducedMotion ? 1 : 1.05 }}
          >
            <span className="text-cyan-500">&lt;</span>
            <span>usmanamjad.dev</span>
            <span className="text-cyan-500">/&gt;</span>
          </motion.a> */}

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                whileHover={{ scale: reducedMotion ? 1 : 1.05 }}
                whileTap={{ scale: reducedMotion ? 1 : 0.95 }}
              >
                {item.name}
              </motion.button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            {/* Reduced Motion Toggle */}
            {/* <motion.button
              onClick={toggleReducedMotion}
              className={`p-2 rounded-lg transition-colors ${
                reducedMotion
                  ? 'bg-cyan-100 dark:bg-cyan-900 text-cyan-600 dark:text-cyan-400'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              whileHover={{ scale: reducedMotion ? 1 : 1.1 }}
              whileTap={{ scale: reducedMotion ? 1 : 0.9 }}
              title={reducedMotion ? 'Enable Motion' : 'Reduce Motion'}
            >
              <Zap size={20} className={reducedMotion ? 'opacity-50' : ''} />
            </motion.button> */}

            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              whileHover={{ scale: reducedMotion ? 1 : 1.1 }}
              whileTap={{ scale: reducedMotion ? 1 : 0.9 }}
            >
              <AnimatePresence mode="wait">
                {theme === 'dark' ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: reducedMotion ? 0 : 0.2 }}
                  >
                    <Sun size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: reducedMotion ? 0 : 0.2 }}
                  >
                    <Moon size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Mobile Menu Toggle - 3D Brackets */}
            <MenuToggle3D onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.3 }}
              className="md:hidden overflow-hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg rounded-lg mt-2 shadow-lg border border-slate-200 dark:border-slate-700"
            >
              <div className="py-2 space-y-1 px-2">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="block w-full text-left px-4 py-3 text-base font-medium text-slate-600 dark:text-slate-300 hover:text-cyan-500 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: reducedMotion ? 0 : index * 0.05 }}
                  >
                    {item.name}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Header;