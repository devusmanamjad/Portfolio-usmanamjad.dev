import React from 'react';

// "UA" monogram: two letters drawn as single strokes inside a deep-green tile.
// The same artwork is saved as public/logo.svg for the favicon.
export const LogoMark = ({ size = 36, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    role="img"
    aria-label="Usman Amjad monogram"
    className={className}
  >
    <rect width="40" height="40" rx="9" fill="#0F5C47" />
    {/* A crossbar in the lighter accent, drawn first so the legs sit on top */}
    <path d="M23 22.9h7" stroke="#8FDCC0" strokeWidth="2.5" />
    <g stroke="#FAF8F4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      {/* U */}
      <path d="M8.5 12.5v9a5 5 0 0 0 10 0v-9" />
      {/* A */}
      <path d="M21.5 27.5l5-15 5 15" />
    </g>
  </svg>
);

// Monogram + serif wordmark, used in the header and footer.
const Logo = ({ size = 36, showWordmark = true, className = '' }) => (
  <span className={`inline-flex items-center gap-3 ${className}`}>
    <LogoMark size={size} />
    {showWordmark && (
      <span className="font-serif text-[1.45rem] leading-none tracking-[-0.01em] text-ink">Usman Amjad</span>
    )}
  </span>
);

export default Logo;
