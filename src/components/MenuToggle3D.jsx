import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const MenuToggle3D = ({ onClick }) => {
  const { isMobileMenuOpen } = useTheme();

  return (
    <motion.button
      onClick={onClick}
      className="w-10 h-10 cursor-pointer md:hidden flex flex-col items-center justify-center gap-1.5 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      whileTap={{ scale: 0.95 }}
      aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
    >
      {/* Top line */}
      <motion.span
        className="block w-5 h-0.5 bg-slate-600 dark:bg-slate-300 rounded-full"
        animate={{
          rotate: isMobileMenuOpen ? 45 : 0,
          y: isMobileMenuOpen ? 8 : 0
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Middle line */}
      <motion.span
        className="block w-5 h-0.5 bg-slate-600 dark:bg-slate-300 rounded-full"
        animate={{
          opacity: isMobileMenuOpen ? 0 : 1,
          scaleX: isMobileMenuOpen ? 0 : 1
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Bottom line */}
      <motion.span
        className="block w-5 h-0.5 bg-slate-600 dark:bg-slate-300 rounded-full"
        animate={{
          rotate: isMobileMenuOpen ? -45 : 0,
          y: isMobileMenuOpen ? -8 : 0
        }}
        transition={{ duration: 0.2 }}
      />
    </motion.button>
  );
};

export default MenuToggle3D;
