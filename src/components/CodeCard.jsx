import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { gsap, motionAllowed } from '../lib/motion';

/*
 * Hero illustration: pair-programming with an AI assistant. A C# handler types
 * itself out, the assistant suggests the next lines, the suggestion is
 * accepted, then the tests run and an AI review passes. It loops.
 * Decorative only: the screen reader gets a one-line description.
 */

const kw = 'text-brand-2';
const type = 'text-brand';
const fn = 'text-ink font-semibold';
const v = 'text-ink-2';
const p = 'text-ink-3';
const num = 'text-amber-600 dark:text-amber-400';

const HEAD = [
  [['public async ', kw], ['Task ', type], ['Handle', fn], ['(', p], ['TaxReturnSubmitted ', type], ['msg', v], [')', p]],
  [['{', p]],
  [['    if ', kw], ['(', p], ['await ', kw], ['_store', v], ['.', p], ['SeenAsync', fn], ['(msg.Id)) ', p], ['return', kw], [';', p]],
  [['    var ', kw], ['tax ', v], ['= ', p], ['await ', kw], ['_engine', v], ['.', p], ['CalculateAsync', fn], ['(msg);', p]],
];
const GHOST = [
  [['    await ', kw], ['_bus', v], ['.', p], ['PublishAsync', fn], ['(', p], ['new ', kw], ['TaxCalculated', type], ['(tax))', p]],
  [['        .', p], ['WithRetry', fn], ['(', p], ['3', num], [', ', p], ['Backoff', type], ['.Exponential);', p]],
];
const TAIL = [[['}', p]]];

const lineLength = (tokens) => tokens.reduce((n, [text]) => n + text.length, 0);
const HEAD_LENGTH = HEAD.reduce((n, line) => n + lineLength(line), 0);

const FINAL = { typed: HEAD_LENGTH, ghost: 'accepted', tail: true, term: 3 };
const START = { typed: 0, ghost: 'hidden', tail: false, term: 0 };

const Caret = () => (
  <span aria-hidden="true" className="ml-px inline-block h-[1.1em] w-[2px] translate-y-[0.2em] animate-pulse bg-brand" />
);

/** Render a line's tokens, cut off after `chars` characters. */
const Tokens = ({ tokens, chars = Infinity }) => {
  let left = chars;
  return tokens.map(([text, cls], i) => {
    const part = text.slice(0, Math.max(0, left));
    left -= text.length;
    return part ? (
      <span key={i} className={cls}>
        {part}
      </span>
    ) : null;
  });
};

const CodeCard = () => {
  const card = useRef(null);
  const animate = motionAllowed();
  const [s, setS] = useState(animate ? START : FINAL);

  // The script: type, suggest, accept, test, review, pause, repeat.
  useEffect(() => {
    if (!animate) return undefined;
    let cancelled = false;
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const set = (patch) => !cancelled && setS((prev) => ({ ...prev, ...patch }));

    (async () => {
      while (!cancelled) {
        set(START);
        await sleep(700);
        for (let n = 0; n <= HEAD_LENGTH && !cancelled; n += 2) {
          set({ typed: n });
          await sleep(28);
        }
        set({ typed: HEAD_LENGTH });
        await sleep(450);
        set({ ghost: 'shown' });
        await sleep(1900);
        set({ ghost: 'accepted' });
        await sleep(350);
        set({ tail: true });
        await sleep(600);
        set({ term: 1 });
        await sleep(1100);
        set({ term: 2 });
        await sleep(700);
        set({ term: 3 });
        await sleep(3400);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [animate]);

  // Gentle 3D tilt towards the pointer.
  useEffect(() => {
    const el = card.current;
    if (!animate || !window.matchMedia('(pointer: fine)').matches) return undefined;
    gsap.set(el, { transformPerspective: 1200 });
    const rx = gsap.quickTo(el, 'rotationX', { duration: 0.8, ease: 'power3.out' });
    const ry = gsap.quickTo(el, 'rotationY', { duration: 0.8, ease: 'power3.out' });
    const onMove = (e) => {
      ry((e.clientX / window.innerWidth - 0.5) * 10);
      rx(-(e.clientY / window.innerHeight - 0.5) * 8);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [animate]);

  // Split the typed character count across the head lines.
  let budget = s.typed;
  const headChars = HEAD.map((line) => {
    const n = Math.min(budget, lineLength(line));
    budget -= n;
    return n;
  });
  const typingLine = s.typed < HEAD_LENGTH ? headChars.findIndex((n, i) => n < lineLength(HEAD[i])) : -1;
  const caretAt =
    typingLine >= 0 ? typingLine : s.ghost === 'accepted' ? (s.tail ? 6 : 5) : 3; // line index for the caret

  const rows = [
    ...HEAD.map((tokens, i) => ({ tokens, chars: headChars[i], kind: 'head' })),
    ...GHOST.map((tokens) => ({ tokens, kind: 'ghost' })),
    ...TAIL.map((tokens) => ({ tokens, kind: 'tail' })),
  ];

  return (
    <div
      ref={card}
      className="glass relative rounded-[2rem] p-4 shadow-[0_40px_80px_-40px_rgb(var(--brand)/0.45)] sm:p-5"
    >
      <p className="sr-only">
        Illustration: writing a C# message handler with an AI assistant, which suggests a retry policy before the tests and
        an AI review pass.
      </p>

      <div aria-hidden="true">
        {/* Window chrome and tabs */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
          </div>
          <div className="flex min-w-0 gap-1 font-mono text-[10.5px] sm:text-[11px]">
            <span className="truncate rounded-lg bg-surface px-2.5 py-1 text-ink shadow-sm">TaxReturnHandler.cs</span>
            <span className="hidden truncate px-2.5 py-1 text-ink-3 sm:inline">HandlerTests.cs</span>
          </div>
          <span className="ml-auto flex shrink-0 items-center gap-1.5 rounded-full bg-gradient-to-r from-brand to-brand-2 px-2.5 py-1 text-[10.5px] font-semibold text-white">
            <Sparkles size={11} />
            AI pair
          </span>
        </div>

        {/* Editor */}
        <div className="relative mt-4 overflow-hidden rounded-2xl bg-paper/70 pb-14 pt-3 font-mono text-[9px] leading-[1.9] sm:text-[11.5px]">
          {rows.map((row, i) => {
            const ghost = row.kind === 'ghost';
            const visible =
              row.kind === 'head' || (ghost && s.ghost !== 'hidden') || (row.kind === 'tail' && s.tail);
            return (
              <div key={i} className="relative flex whitespace-pre pr-3">
                {animate && ghost && s.ghost === 'accepted' && (
                  <motion.span
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 1.2 }}
                    className="absolute inset-0 bg-brand/15"
                  />
                )}
                <span className="relative w-8 shrink-0 select-none pr-3 text-right text-ink-3/60 sm:w-10">{i + 1}</span>
                <span
                  className={`relative transition-opacity duration-300 ${
                    ghost && s.ghost === 'shown' ? 'italic opacity-40' : ''
                  } ${visible ? '' : 'opacity-0'}`}
                >
                  <Tokens tokens={row.tokens} chars={row.chars} />
                  {i === caretAt && <Caret />}
                </span>
              </div>
            );
          })}

          {/* Assistant suggestion */}
          <AnimatePresence>
            {s.ghost === 'shown' && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.98 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="glass absolute bottom-2 right-2 flex items-center gap-2 rounded-xl px-3 py-2 font-sans text-[11px] text-ink shadow-lg sm:bottom-3 sm:right-3 sm:text-xs"
              >
                <Sparkles size={13} className="shrink-0 text-brand-2" />
                <span className="font-medium">Publish with a retry policy?</span>
                <kbd className="rounded-md border border-line bg-surface px-1.5 py-0.5 font-mono text-[10px] text-ink-2">
                  Tab
                </kbd>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Terminal */}
        <div className="mt-3 space-y-1 rounded-2xl bg-ink/[0.04] px-4 py-3 font-mono text-[10.5px] leading-5 sm:text-[11.5px]">
          <p>
            <span className="text-brand">$</span>{' '}
            {s.term >= 1 ? <span className="text-ink">dotnet test</span> : <Caret />}
            {s.term === 1 && <span className="ml-2 animate-pulse text-ink-3">running…</span>}
          </p>
          <p
            className={`text-emerald-600 transition-all duration-500 dark:text-emerald-400 ${
              s.term >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'
            }`}
          >
            ✓ Build succeeded · all tests passed
          </p>
          <p
            className={`text-brand-2 transition-all duration-500 ${
              s.term >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'
            }`}
          >
            ✦ AI review: no issues found
          </p>
        </div>
      </div>
    </div>
  );
};

export default CodeCard;
