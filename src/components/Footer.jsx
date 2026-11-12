import React, { useEffect, useRef, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { personalInfo } from '../data/mock';
import { gsap, SplitText, useGSAP, motionAllowed, scrollToTarget } from '../lib/motion';
import Logo from './Logo';

const lahoreTime = () =>
  new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Karachi' }).format(new Date());

const Footer = () => {
  const root = useRef(null);
  const word = useRef(null);
  const [time, setTime] = useState(lahoreTime);

  useEffect(() => {
    const id = setInterval(() => setTime(lahoreTime()), 30000);
    return () => clearInterval(id);
  }, []);

  // The giant name rises letter by letter as the footer scrolls in.
  useGSAP(
    () => {
      if (!motionAllowed()) return;
      SplitText.create(word.current, {
        type: 'chars',
        mask: 'chars',
        onSplit(self) {
          return gsap.from(self.chars, {
            yPercent: 100,
            ease: 'expo.out',
            stagger: 0.04,
            duration: 1.4,
            scrollTrigger: { trigger: word.current, start: 'top 95%', once: true },
          });
        },
      });
    },
    { scope: root }
  );

  const links = [
    { label: 'LinkedIn', href: personalInfo.linkedin },
    { label: 'GitHub', href: personalInfo.github },
    { label: 'Upwork', href: personalInfo.upwork },
    { label: 'WhatsApp', href: personalInfo.whatsapp },
    { label: 'Email', href: `mailto:${personalInfo.email}` },
  ].filter((link) => link.href);

  return (
    <footer ref={root} className="relative overflow-hidden pt-20">
      <div className="container-page">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <a href="#top" aria-label="Usman Amjad — back to top">
              <Logo size={34} />
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              Senior Software Engineer building reliable .NET systems on Azure.
            </p>
          </div>

          <ul className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm font-medium sm:grid-cols-3">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="text-ink-2 transition-colors hover:text-brand"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => scrollToTarget(0)}
            className="group inline-flex items-center gap-3 self-start text-sm font-semibold text-ink"
          >
            Back to top
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line transition-all duration-500 group-hover:-translate-y-1 group-hover:bg-ink group-hover:text-paper">
              <ArrowUp size={16} strokeWidth={2} />
            </span>
          </button>
        </div>
      </div>

      <p
        ref={word}
        aria-hidden="true"
        className="display mt-16 select-none whitespace-nowrap text-center text-[15vw] leading-[0.85] tracking-[-0.06em] text-ink/[0.07]"
      >
        Usman Amjad
      </p>

      <div className="container-page flex flex-col gap-3 border-t border-line py-6 text-sm text-ink-3 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {personalInfo.name}. Only for portfolio showcase.
        </p>
        <p className="tabular-nums">Lahore · {time} local time</p>
      </div>
    </footer>
  );
};

export default Footer;
