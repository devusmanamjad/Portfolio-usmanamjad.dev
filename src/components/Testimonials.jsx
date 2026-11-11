import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { professionalTestimonials, clientTestimonials } from '../data/mock';
import Section from './Section';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const TestimonialSlider = ({ testimonials, type, reducedMotion }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonial = testimonials[currentIndex];
  const isLong = testimonial.text.length > 450;

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div>
      <AnimatePresence mode="wait">
        <motion.figure
          key={`${type}-${testimonial.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.25 }}
        >
          <blockquote
            className={`display max-w-3xl ${
              isLong ? 'text-xl leading-[1.45] sm:text-2xl sm:leading-[1.4]' : 'text-2xl leading-[1.35] sm:text-[2rem] sm:leading-[1.3]'
            }`}
          >
            <span aria-hidden="true" className="text-brand">“</span>
            {testimonial.text}
            <span aria-hidden="true" className="text-brand">”</span>
          </blockquote>

          <figcaption className="mt-9 flex items-center gap-4">
            <img
              src={testimonial.image}
              alt=""
              className="h-12 w-12 rounded-full object-cover"
              loading="lazy"
            />
            <div>
              <p className="font-medium text-ink">{testimonial.name}</p>
              <p className="text-sm">
                {testimonial.role}, {testimonial.company}
                {type === 'client' && testimonial.location && ` · ${testimonial.location}`}
              </p>
              {type === 'client' && testimonial.platform && (
                <p className="label mt-1.5">
                  {testimonial.rating}.0 rating · via {testimonial.platform}
                </p>
              )}
            </div>
          </figcaption>
        </motion.figure>
      </AnimatePresence>

      {/* Controls */}
      <div className="mt-10 flex items-center justify-between border-t border-line pt-6">
        <p className="label" aria-live="polite">
          {String(currentIndex + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous testimonial"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/25 text-ink transition-colors hover:border-ink"
          >
            <ArrowLeft size={18} strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next testimonial"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/25 text-ink transition-colors hover:border-ink"
          >
            <ArrowRight size={18} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
};

const tabs = [
  { id: 'clients', label: 'Clients' },
  { id: 'professional', label: 'Colleagues' },
];

const Testimonials = () => {
  const { reducedMotion } = useTheme();
  const [activeTab, setActiveTab] = useState('clients');

  return (
    <Section
      id="testimonials"
      index="07"
      label="Testimonials"
      title="What it's like to work with me."
      lead="In the words of clients and the engineers I've shipped alongside."
    >
      <div role="group" aria-label="Choose testimonial group" className="mb-10 flex gap-7 border-b border-line">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              aria-pressed={isActive}
              className={`-mb-px border-b pb-3 text-sm transition-colors ${
                isActive ? 'border-ink text-ink' : 'border-transparent text-ink-3 hover:text-ink'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <TestimonialSlider
        key={activeTab}
        testimonials={activeTab === 'clients' ? clientTestimonials : professionalTestimonials}
        type={activeTab === 'clients' ? 'client' : 'professional'}
        reducedMotion={reducedMotion}
      />
    </Section>
  );
};

export default Testimonials;
