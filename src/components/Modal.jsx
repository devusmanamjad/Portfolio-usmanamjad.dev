import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';
import { getLenis } from '../lib/motion';

/**
 * Bottom sheet on phones, centred dialog on larger screens. Pauses smooth
 * scrolling while open and closes on Escape or a click outside.
 */
const Modal = ({ open, onClose, labelledBy, closeLabel = 'Close', maxWidth = 'max-w-3xl', children }) => {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return undefined;
    const lenis = getLenis();
    lenis?.stop();
    document.documentElement.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = '';
      lenis?.start();
    };
  }, [open, onClose]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.3 }}
          className="fixed inset-0 z-[120] flex items-end justify-center bg-black/50 backdrop-blur-sm sm:items-center sm:p-6"
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            data-lenis-prevent
            initial={{ opacity: 0, y: reduce ? 0 : 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : 40 }}
            transition={{ duration: reduce ? 0 : 0.55, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className={`relative flex max-h-[92svh] w-full ${maxWidth} flex-col overflow-hidden rounded-t-[2rem] border border-line bg-surface shadow-2xl sm:rounded-[2rem]`}
          >
            <button
              type="button"
              onClick={onClose}
              autoFocus
              aria-label={closeLabel}
              className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-ink transition-transform duration-300 hover:rotate-90"
            >
              <X size={18} strokeWidth={1.75} />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default Modal;
