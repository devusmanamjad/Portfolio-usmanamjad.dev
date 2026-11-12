import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap, motionAllowed } from '../lib/motion';

/*
 * Hero illustration: a tiny event-driven system. Producers publish to a
 * message bus, consumers pick the messages up, telemetry flows to monitoring,
 * and a log underneath shows messages being processed (and one retry).
 * It is decorative: no real numbers are shown.
 */

const nodes = [
  { id: 'tax', label: 'Tax API', x: 14, y: 40 },
  { id: 'docs', label: 'Documents', x: 14, y: 226 },
  { id: 'calc', label: 'Calculations', x: 294, y: 40 },
  { id: 'notify', label: 'Notifications', x: 294, y: 226 },
];

const paths = {
  taxIn: 'M126 57 C 150 57 128 150 150 150',
  docsIn: 'M126 243 C 150 243 128 150 150 150',
  calcOut: 'M270 150 C 292 150 270 57 294 57',
  notifyOut: 'M270 150 C 292 150 270 243 294 243',
  telemetry: 'M210 125 L 210 54',
};

const flows = [
  { path: paths.taxIn, begin: 0 },
  { path: paths.calcOut, begin: 1.1 },
  { path: paths.docsIn, begin: 0.6 },
  { path: paths.notifyOut, begin: 1.7 },
  { path: paths.telemetry, begin: 0.3, dur: 1.6, small: true },
];

const events = [
  { name: 'tax.return.calculated', state: 'processed' },
  { name: 'document.uploaded', state: 'processed' },
  { name: 'notification.send', state: 'retry 1/3' },
  { name: 'notification.send', state: 'processed' },
  { name: 'tax.return.submitted', state: 'processed' },
  { name: 'document.classified', state: 'processed' },
];

const Node = ({ label, x, y }) => (
  <g>
    <rect x={x} y={y} width="112" height="34" rx="17" className="fill-surface stroke-line" strokeWidth="1" />
    <circle cx={x + 17} cy={y + 17} r="3.5" className="fill-brand" />
    <text x={x + 28} y={y + 21.5} className="fill-ink" fontSize="11.5" fontWeight="600">
      {label}
    </text>
  </g>
);

const SystemCard = () => {
  const card = useRef(null);
  const animate = motionAllowed();
  const [log, setLog] = useState(() => events.slice(0, 3).map((e, i) => ({ ...e, key: i })));

  // Rolling log of processed messages.
  useEffect(() => {
    if (!animate) return undefined;
    let n = 3;
    const id = setInterval(() => {
      const next = { ...events[n % events.length], key: n };
      n += 1;
      setLog((prev) => [next, ...prev].slice(0, 3));
    }, 1900);
    return () => clearInterval(id);
  }, [animate]);

  // Gentle 3D tilt towards the pointer.
  useEffect(() => {
    const el = card.current;
    if (!animate || !window.matchMedia('(pointer: fine)').matches) return undefined;
    gsap.set(el, { transformPerspective: 1200 });
    const rx = gsap.quickTo(el, 'rotationX', { duration: 0.8, ease: 'power3.out' });
    const ry = gsap.quickTo(el, 'rotationY', { duration: 0.8, ease: 'power3.out' });
    const onMove = (e) => {
      const px = e.clientX / window.innerWidth - 0.5;
      const py = e.clientY / window.innerHeight - 0.5;
      ry(px * 10);
      rx(-py * 8);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [animate]);

  return (
    <div ref={card} className="glass relative rounded-[2rem] p-5 shadow-[0_40px_80px_-40px_rgb(var(--brand)/0.45)] sm:p-6">
      {/* Window chrome */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
        </div>
        <span className="font-mono text-[11px] text-ink-3">event-flow · production</span>
        <span className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
          <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-current" />
          healthy
        </span>
      </div>

      {/* Diagram */}
      <svg viewBox="0 0 420 300" className="mt-4 w-full" role="img" aria-label="Diagram: services exchanging events through Azure Service Bus">
        <defs>
          <linearGradient id="bus-fill" x1="150" y1="125" x2="270" y2="175" gradientUnits="userSpaceOnUse">
            <stop stopColor="rgb(52,72,230)" />
            <stop offset="1" stopColor="rgb(132,84,240)" />
          </linearGradient>
        </defs>

        {Object.values(paths).map((d, i) => (
          <path key={d} d={d} fill="none" className="stroke-ink/20" strokeWidth="1.5" strokeDasharray={i === 4 ? '3 4' : undefined} />
        ))}

        {/* Monitoring */}
        <g>
          <rect x="155" y="20" width="110" height="34" rx="17" className="fill-surface stroke-line" strokeWidth="1" />
          <text x="210" y="41.5" textAnchor="middle" className="fill-ink-3" fontSize="11" fontWeight="600">
            App Insights
          </text>
        </g>

        {nodes.map((node) => (
          <Node key={node.id} {...node} />
        ))}

        {/* Message bus */}
        <g>
          {animate && (
            <rect x="150" y="125" width="120" height="50" rx="25" fill="url(#bus-fill)" className="bus-pulse" />
          )}
          <rect x="150" y="125" width="120" height="50" rx="25" fill="url(#bus-fill)" />
          <text x="210" y="148" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="700">
            Service Bus
          </text>
          <text x="210" y="163" textAnchor="middle" fill="#fff" fillOpacity="0.75" fontSize="9.5" fontWeight="500">
            topics · queues
          </text>
        </g>

        {/* Messages travelling along the wires */}
        {animate &&
          flows.map((flow) => (
            <circle key={flow.path} r={flow.small ? 2.5 : 4} className={flow.small ? 'fill-ink-3' : 'fill-brand-2'}>
              <animateMotion
                dur={`${flow.dur || 2.2}s`}
                begin={`${flow.begin}s`}
                repeatCount="indefinite"
                path={flow.path}
                keyPoints="0;1"
                keyTimes="0;1"
                calcMode="spline"
                keySplines="0.45 0 0.2 1"
              />
            </circle>
          ))}
      </svg>

      {/* Live log */}
      <ul className="mt-3 space-y-1.5 rounded-2xl bg-paper/70 p-3 font-mono text-[11.5px] leading-5" aria-hidden="true">
        <AnimatePresence initial={false}>
          {log.map((entry, i) => (
            <motion.li
              key={entry.key}
              layout
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1 - i * 0.28, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-between gap-3"
            >
              <span className="truncate text-ink-2">{entry.name}</span>
              <span className={entry.state.startsWith('retry') ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'}>
                {entry.state.startsWith('retry') ? '↻' : '✓'} {entry.state}
              </span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
};

export default SystemCard;
