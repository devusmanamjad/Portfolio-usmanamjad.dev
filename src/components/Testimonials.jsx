import React, { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Quote, Star } from 'lucide-react';
import { professionalTestimonials, clientTestimonials } from '../data/mock';
import SectionHeading from './SectionHeading';

const groups = {
  clients: { label: 'Clients', items: clientTestimonials, type: 'client' },
  professional: { label: 'Colleagues', items: professionalTestimonials, type: 'professional' },
};

const Testimonials = () => {
  const reduce = useReducedMotion();
  const [tab, setTab] = useState('clients');
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const { items, type } = groups[tab];
  const t = items[index];
  const isLong = t.text.length > 420;

  const go = (next) => {
    setDirection(next > index || (index === items.length - 1 && next === 0) ? 1 : -1);
    setIndex((next + items.length) % items.length);
  };
  const switchTab = (id) => {
    setTab(id);
    setIndex(0);
    setDirection(1);
  };

  return (
    <section id="testimonials" className="relative py-28 lg:py-40">
      <div className="container-page">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            index="07"
            eyebrow="Testimonials"
            title="What it's like to work with me."
            lead="In the words of clients and the engineers I've shipped alongside."
          />
          <div data-reveal role="group" aria-label="Choose testimonial group" className="glass flex shrink-0 gap-1 self-start rounded-full p-1.5 lg:self-auto">
            <LayoutGroup id="testimonial-tabs">
              {Object.entries(groups).map(([id, group]) => {
                const isActive = tab === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => switchTab(id)}
                    aria-pressed={isActive}
                    className={`relative rounded-full px-5 py-2 text-sm font-semibold transition-colors duration-300 ${
                      isActive ? 'text-paper' : 'text-ink-2 hover:text-ink'
                    }`}
                  >
                    {isActive && (
                      <motion.span layoutId="testimonial-pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} className="absolute inset-0 rounded-full bg-ink" />
                    )}
                    <span className="relative">{group.label}</span>
                  </button>
                );
              })}
            </LayoutGroup>
          </div>
        </div>

        <div data-reveal className="mt-16 grid gap-5 lg:mt-20 lg:grid-cols-12">
          {/* Quote */}
          <div className="card relative overflow-hidden p-7 sm:p-10 lg:col-span-8 lg:p-14">
            <Quote aria-hidden="true" size={120} strokeWidth={1} className="absolute -right-4 -top-4 text-brand/10" />
            <div className="relative min-h-[22rem] sm:min-h-[20rem]">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.figure
                  key={`${tab}-${t.id}`}
                  custom={direction}
                  initial={{ opacity: 0, x: reduce ? 0 : direction * 40, filter: reduce ? 'none' : 'blur(8px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: reduce ? 0 : direction * -40, filter: reduce ? 'none' : 'blur(8px)' }}
                  transition={{ duration: reduce ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex gap-1 text-amber-500" aria-label={`${t.rating} out of 5 stars`}>
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
                    ))}
                  </div>
                  <blockquote
                    className={`mt-6 font-medium text-ink ${
                      isLong ? 'text-lg leading-[1.7] sm:text-[1.2rem]' : 'text-xl leading-[1.55] sm:text-[1.6rem] sm:leading-[1.5]'
                    }`}
                  >
                    “{t.text}”
                  </blockquote>
                  <figcaption className="mt-9 flex items-center gap-4">
                    <img src={t.image} alt="" className="h-14 w-14 rounded-full object-cover ring-4 ring-brand/10" loading="lazy" />
                    <div>
                      <p className="font-semibold text-ink">{t.name}</p>
                      <p className="text-sm">
                        {t.role}, {t.company}
                        {type === 'client' && t.location && ` · ${t.location}`}
                      </p>
                      {type === 'client' && t.platform && <p className="label mt-1">via {t.platform}</p>}
                    </div>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>

            <div className="relative mt-10 flex items-center justify-between border-t border-line pt-6">
              <p className="label tabular-nums" aria-live="polite">
                {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => go(index - 1)}
                  aria-label="Previous testimonial"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-line text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-paper"
                >
                  <ArrowLeft size={18} strokeWidth={1.75} />
                </button>
                <button
                  type="button"
                  onClick={() => go(index + 1)}
                  aria-label="Next testimonial"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-line text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-paper"
                >
                  <ArrowRight size={18} strokeWidth={1.75} />
                </button>
              </div>
            </div>
          </div>

          {/* People */}
          <ul className="grid gap-3 lg:col-span-4" aria-label="Choose a testimonial">
            {items.map((person, i) => {
              const isActive = i === index;
              return (
                <li key={person.id}>
                  <button
                    type="button"
                    onClick={() => go(i)}
                    aria-pressed={isActive}
                    className={`flex w-full items-center gap-4 rounded-3xl border p-4 text-left transition-all duration-500 ${
                      isActive ? 'border-brand/30 bg-surface shadow-[0_20px_40px_-25px_rgb(var(--brand)/0.5)]' : 'border-line hover:bg-surface/70'
                    }`}
                  >
                    <img
                      src={person.image}
                      alt=""
                      className={`h-12 w-12 rounded-full object-cover transition-all duration-500 ${isActive ? '' : 'grayscale'}`}
                      loading="lazy"
                    />
                    <span className="min-w-0">
                      <span className="block truncate font-semibold text-ink">{person.name}</span>
                      <span className="block truncate text-sm">
                        {person.role}, {person.company}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className={`ml-auto h-2 w-2 shrink-0 rounded-full transition-colors ${isActive ? 'bg-brand' : 'bg-transparent'}`}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
