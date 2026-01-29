import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { professionalTestimonials, clientTestimonials } from '../data/mock';
import { Quote, Star, ChevronLeft, ChevronRight, Briefcase, Users, MapPin } from 'lucide-react';

const StarRating = ({ rating }) => (
  <div className="flex gap-1">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}
      />
    ))}
  </div>
);

const TestimonialCard = ({ testimonial, type, reducedMotion }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: reducedMotion ? 0 : 0.4 }}
    className="bg-white dark:bg-slate-800 rounded-2xl p-6 lg:p-8 shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50 border border-slate-100 dark:border-slate-700"
  >
    {/* Quote Icon */}
    <div className="mb-4">
      <Quote className="text-cyan-500/30" size={40} />
    </div>

    {/* Testimonial Text */}
    <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-6">
      "{testimonial.text}"
    </p>

    {/* Rating */}
    <div className="mb-6">
      <StarRating rating={testimonial.rating} />
    </div>

    {/* Author Info */}
    <div className="flex items-center gap-4">
      <img
        src={testimonial.image}
        alt={testimonial.name}
        className="w-14 h-14 rounded-full object-cover border-2 border-cyan-500/20"
      />
      <div className="flex-1">
        <h4 className="font-semibold text-slate-900 dark:text-white">
          {testimonial.name}
        </h4>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {testimonial.role} at {testimonial.company}
        </p>
        {type === 'client' && testimonial.location && (
          <div className="flex items-center gap-1 text-xs text-slate-400 mt-1">
            <MapPin size={12} />
            <span>{testimonial.location}</span>
            {testimonial.platform && (
              <span className="ml-2 px-2 py-0.5 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 rounded-full text-xs">
                {testimonial.platform}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  </motion.div>
);

const TestimonialSlider = ({ testimonials, type, reducedMotion }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="relative">
      {/* Navigation Buttons */}
      <div className="absolute -left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-10">
        <motion.button
          onClick={prev}
          whileHover={{ scale: reducedMotion ? 1 : 1.1 }}
          whileTap={{ scale: reducedMotion ? 1 : 0.9 }}
          className="p-2 lg:p-3 bg-white dark:bg-slate-800 rounded-full shadow-lg text-slate-600 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors border border-slate-200 dark:border-slate-700"
        >
          <ChevronLeft size={20} />
        </motion.button>
      </div>
      <div className="absolute -right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-10">
        <motion.button
          onClick={next}
          whileHover={{ scale: reducedMotion ? 1 : 1.1 }}
          whileTap={{ scale: reducedMotion ? 1 : 0.9 }}
          className="p-2 lg:p-3 bg-white dark:bg-slate-800 rounded-full shadow-lg text-slate-600 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors border border-slate-200 dark:border-slate-700"
        >
          <ChevronRight size={20} />
        </motion.button>
      </div>

      {/* Testimonial Card */}
      <div className="overflow-hidden px-2">
        <AnimatePresence mode="wait">
          <TestimonialCard
            key={testimonials[currentIndex].id}
            testimonial={testimonials[currentIndex]}
            type={type}
            reducedMotion={reducedMotion}
          />
        </AnimatePresence>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-cyan-500 w-8'
                : 'bg-slate-300 dark:bg-slate-600 hover:bg-slate-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const Testimonials = () => {
  const { reducedMotion } = useTheme();
  const [activeTab, setActiveTab] = useState('clients');

  return (
    <section id="testimonials" className="py-20 lg:py-32 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reducedMotion ? 0 : 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-cyan-500 font-medium mb-4 block">Testimonials</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            What People Say
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Feedback from colleagues and clients I've had the pleasure to work with
          </p>
        </motion.div>

        {/* Tab Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reducedMotion ? 0 : 0.5 }}
          className="flex justify-center gap-4 mb-10"
        >
          <motion.button
            onClick={() => setActiveTab('clients')}
            whileHover={{ scale: reducedMotion ? 1 : 1.02 }}
            whileTap={{ scale: reducedMotion ? 1 : 0.98 }}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'clients'
                ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 border border-slate-200 dark:border-slate-700'
            }`}
          >
            <Users size={18} />
            <span>Client Reviews</span>
          </motion.button>
          <motion.button
            onClick={() => setActiveTab('professional')}
            whileHover={{ scale: reducedMotion ? 1 : 1.02 }}
            whileTap={{ scale: reducedMotion ? 1 : 0.98 }}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'professional'
                ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 border border-slate-200 dark:border-slate-700'
            }`}
          >
            <Briefcase size={18} />
            <span>Professional</span>
          </motion.button>
        </motion.div>

        {/* Testimonials Slider */}
        <AnimatePresence mode="wait">
          {activeTab === 'clients' ? (
            <motion.div
              key="clients"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: reducedMotion ? 0 : 0.3 }}
            >
              <TestimonialSlider
                testimonials={clientTestimonials}
                type="client"
                reducedMotion={reducedMotion}
              />
            </motion.div>
          ) : (
            <motion.div
              key="professional"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: reducedMotion ? 0 : 0.3 }}
            >
              <TestimonialSlider
                testimonials={professionalTestimonials}
                type="professional"
                reducedMotion={reducedMotion}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Testimonials;
