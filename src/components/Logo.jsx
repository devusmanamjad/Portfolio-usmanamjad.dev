import React, { useId } from 'react';

// "UA" monogram: two single-stroke letters on an ultramarine → violet tile.
// The same artwork is saved as public/logo.svg for the favicon.
export const LogoMark = ({ size = 36, className = '' }) => {
  const id = useId().replace(/:/g, '');
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      role="img"
      aria-label="Usman Amjad monogram"
      className={className}
    >
      <defs>
        <linearGradient id={`ua-${id}`} x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3448E6" />
          <stop offset="1" stopColor="#8454F0" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="11" fill={`url(#ua-${id})`} />
      <path d="M23 22.9h7" stroke="#C9D0FF" strokeWidth="2.5" />
      <g stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8.5 12.5v9a5 5 0 0 0 10 0v-9" />
        <path d="M21.5 27.5l5-15 5 15" />
      </g>
    </svg>
  );
};

// Monogram + wordmark, used in the header and footer.
const Logo = ({ size = 36, showWordmark = true, className = '' }) => (
  <span className={`inline-flex items-center gap-3 ${className}`}>
    <LogoMark size={size} />
    {showWordmark && (
      <span className="text-[1.05rem] font-bold leading-none tracking-[-0.02em] text-ink">Usman Amjad</span>
    )}
  </span>
);

export default Logo;
