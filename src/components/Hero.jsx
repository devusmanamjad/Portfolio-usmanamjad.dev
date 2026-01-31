import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { personalInfo } from '../data/mock';
import { ArrowDown, Github, Linkedin, Mail, Code2, Database, Cloud, Terminal, Twitter } from 'lucide-react';

// Upwork icon component
const UpworkIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.546-1.405 0-2.543-1.14-2.545-2.546V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z"/>
  </svg>
);

// Animated 3D floating icon component
const FloatingIcon = ({ Icon, delay, x, y, size = 40 }) => {
  const { reducedMotion } = useTheme();
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: reducedMotion ? 0 : delay, duration: reducedMotion ? 0 : 0.5 }}
      className="absolute text-cyan-500/30 dark:text-cyan-400/20"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <motion.div
        animate={reducedMotion ? {} : {
          y: [0, -15, 0],
          rotateY: [0, 180, 360],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          delay: delay,
          ease: "easeInOut"
        }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <Icon size={size} strokeWidth={1.5} />
      </motion.div>
    </motion.div>
  );
};

// Animated code block
const CodeBlock = ({ reducedMotion }) => {
  const [currentLine, setCurrentLine] = useState(0);
  const codeLines = [
    { text: 'const developer = {', indent: 0, color: 'text-cyan-400' },
    { text: 'name: "Usman Amjad",', indent: 2, color: 'text-emerald-400' },
    { text: 'role: "Senior Engineer",', indent: 2, color: 'text-emerald-400' },
    { text: 'skills: ["C#", ".NET", "React"],', indent: 2, color: 'text-amber-400' },
    { text: 'passion: "Building Solutions"', indent: 2, color: 'text-purple-400' },
    { text: '};', indent: 0, color: 'text-cyan-400' },
  ];

  useEffect(() => {
    if (reducedMotion) {
      setCurrentLine(codeLines.length);
      return;
    }
    
    const timer = setInterval(() => {
      setCurrentLine(prev => (prev < codeLines.length ? prev + 1 : prev));
    }, 500);
    
    return () => clearInterval(timer);
  }, [reducedMotion, codeLines.length]);

  return (
    <motion.div
      initial={{ opacity: 0, rotateY: -30, rotateX: 10 }}
      animate={{ opacity: 1, rotateY: 0, rotateX: 0 }}
      transition={{ duration: reducedMotion ? 0 : 0.8, delay: reducedMotion ? 0 : 0.3 }}
      className="relative bg-slate-900/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-slate-700/50"
      style={{ 
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      {/* Window controls */}
      <div className="flex gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-red-500/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <div className="w-3 h-3 rounded-full bg-green-500/80" />
        <span className="ml-4 text-xs text-slate-500 font-mono">developer.cs</span>
      </div>
      
      {/* Code content */}
      <div className="font-mono text-sm space-y-1">
        {codeLines.slice(0, currentLine).map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.3 }}
            className="flex"
          >
            <span className="text-slate-600 w-6 text-right mr-4">{i + 1}</span>
            <span className={line.color} style={{ paddingLeft: `${line.indent * 12}px` }}>
              {line.text}
            </span>
          </motion.div>
        ))}
        {currentLine < codeLines.length && (
          <div className="flex items-center">
            <span className="text-slate-600 w-6 text-right mr-4">{currentLine + 1}</span>
            <span className="w-2 h-5 bg-cyan-400 animate-pulse" />
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Geometric shapes with CSS 3D
const GeometricShapes = ({ reducedMotion }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Cube 1 */}
      <motion.div
        className="absolute w-16 h-16"
        style={{ left: '75%', top: '20%', transformStyle: 'preserve-3d' }}
        animate={reducedMotion ? {} : { rotateX: [0, 360], rotateY: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        <div className="w-full h-full border-2 border-cyan-500/30 rounded-lg bg-cyan-500/5" 
             style={{ transform: 'translateZ(8px)' }} />
      </motion.div>
      
      {/* Cube 2 */}
      <motion.div
        className="absolute w-12 h-12"
        style={{ left: '80%', top: '60%', transformStyle: 'preserve-3d' }}
        animate={reducedMotion ? {} : { rotateX: [360, 0], rotateY: [360, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      >
        <div className="w-full h-full border-2 border-cyan-400/20 rounded-md bg-cyan-400/5" />
      </motion.div>

      {/* Circle */}
      <motion.div
        className="absolute w-20 h-20 rounded-full border-2 border-cyan-500/20"
        style={{ left: '70%', top: '75%' }}
        animate={reducedMotion ? {} : { scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Triangle */}
      <motion.div
        className="absolute"
        style={{ left: '85%', top: '35%' }}
        animate={reducedMotion ? {} : { rotate: [0, 360] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      >
        <div className="w-0 h-0 border-l-[20px] border-r-[20px] border-b-[35px] border-l-transparent border-r-transparent border-b-cyan-500/20" />
      </motion.div>
    </div>
  );
};

// Particles/dots background
const ParticleBackground = ({ reducedMotion }) => {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 5,
    duration: Math.random() * 3 + 4
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-cyan-500/30 dark:bg-cyan-400/20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={reducedMotion ? {} : {
            y: [0, -20, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

const Hero = () => {
  const { reducedMotion } = useTheme();

  const scrollToAbout = () => {
    const element = document.querySelector('#about');
    if (element) {
      element.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Background Elements */}
      <ParticleBackground reducedMotion={reducedMotion} />
      <GeometricShapes reducedMotion={reducedMotion} />
      
      {/* Floating tech icons */}
      <FloatingIcon Icon={Code2} delay={0.2} x={65} y={15} size={35} />
      <FloatingIcon Icon={Database} delay={0.4} x={78} y={45} size={30} />
      <FloatingIcon Icon={Cloud} delay={0.6} x={72} y={70} size={32} />
      <FloatingIcon Icon={Terminal} delay={0.8} x={85} y={25} size={28} />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-50/80 via-transparent to-transparent dark:from-slate-950/80 dark:via-transparent dark:to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left - Text content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.6 }}
              >
                <span className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-sm font-medium mb-6 border border-cyan-500/20">
                  ✨ Available for opportunities
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-4"
              >
                Hi, I'm{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-cyan-600">
                  Usman
                </span>
              </motion.h1>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : 0.2 }}
                className="text-xl sm:text-2xl lg:text-3xl font-medium text-slate-600 dark:text-slate-300 mb-6"
              >
                {personalInfo.title}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : 0.3 }}
                className="text-lg text-slate-500 dark:text-slate-400 mb-8 leading-relaxed max-w-lg"
              >
                {personalInfo.tagline}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : 0.4 }}
                className="flex flex-wrap gap-4 mb-8"
              >
                <motion.button
                  onClick={scrollToAbout}
                  className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-xl shadow-lg shadow-cyan-500/25 transition-all hover:shadow-xl hover:shadow-cyan-500/30"
                  whileHover={{ scale: reducedMotion ? 1 : 1.05 }}
                  whileTap={{ scale: reducedMotion ? 1 : 0.95 }}
                >
                  View My Work
                </motion.button>
                <motion.a
                  href="#contact"
                  className="px-8 py-3 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:border-cyan-500 hover:text-cyan-500 font-medium rounded-xl transition-all"
                  whileHover={{ scale: reducedMotion ? 1 : 1.05 }}
                  whileTap={{ scale: reducedMotion ? 1 : 0.95 }}
                >
                  Get In Touch
                </motion.a>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : 0.5 }}
                className="flex items-center gap-3"
              >
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all hover:scale-110"
                  title="GitHub"
                >
                  <Github size={20} />
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all hover:scale-110"
                  title="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href={personalInfo.upwork}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-green-500 dark:hover:text-green-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all hover:scale-110"
                  title="Upwork"
                >
                  <UpworkIcon size={20} />
                </a>
                <a
                  href={personalInfo.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all hover:scale-110"
                  title="Twitter"
                >
                  <Twitter size={20} />
                </a>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all hover:scale-110"
                  title="Email"
                >
                  <Mail size={20} />
                </a>
              </motion.div>
            </div>

            {/* Right - Code Block / 3D Effect */}
            <div className="hidden lg:block">
              <CodeBlock reducedMotion={reducedMotion} />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reducedMotion ? 0 : 1, duration: reducedMotion ? 0 : 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.button
          onClick={scrollToAbout}
          className="flex flex-col items-center gap-2 text-slate-400 hover:text-cyan-500 transition-colors"
          animate={reducedMotion ? {} : { y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <span className="text-sm font-medium">Scroll Down</span>
          <ArrowDown size={20} />
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero;
