import React from 'react';
import { personalInfo } from '../data/mock';
import Logo from './Logo';
import { ArrowUp } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = [
    { label: 'LinkedIn', href: personalInfo.linkedin },
    { label: 'GitHub', href: personalInfo.github },
    { label: 'Upwork', href: personalInfo.upwork },
    { label: 'WhatsApp', href: personalInfo.whatsapp },
    { label: 'Email', href: `mailto:${personalInfo.email}` },
  ].filter((link) => link.href);

  return (
    <footer className="border-t border-line">
      <div className="container-page py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <a href="#top" aria-label="Usman Amjad — back to top">
            <Logo size={32} />
          </a>

          <ul className="flex flex-wrap gap-x-7 gap-y-2 text-sm">
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
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-ink-3">
            © {currentYear} {personalInfo.name}. Only for portfolio showcase.
          </p>
          <a href="#top" className="inline-flex items-center gap-2 text-sm text-ink-2 transition-colors hover:text-brand">
            Back to top
            <ArrowUp size={15} strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
