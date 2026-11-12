import React from 'react';

/**
 * Eyebrow (number + label), a heading that rises line by line on scroll,
 * and an optional lead paragraph.
 */
const SectionHeading = ({ index, eyebrow, title, lead, size = 'lg', className = '', children }) => (
  <div className={className}>
    <p data-reveal className="label flex items-center gap-3">
      <span className="text-brand">{index}</span>
      <span aria-hidden="true" className="h-px w-10 bg-ink/20" />
      <span>{eyebrow}</span>
    </p>
    {title && (
      <h2
        data-split
        className={`display mt-6 max-w-4xl ${
          size === 'lg'
            ? 'text-[clamp(2.3rem,5.2vw,4.4rem)] leading-[1.03]'
            : 'text-[clamp(2.1rem,3.6vw,3.2rem)] leading-[1.06]'
        }`}
      >
        {title}
      </h2>
    )}
    {lead && (
      <p data-reveal className="mt-6 max-w-2xl text-lg leading-relaxed">
        {lead}
      </p>
    )}
    {children}
  </div>
);

export default SectionHeading;
