import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../data/mock';
import Section, { useReveal } from './Section';
import { ArrowUpRight } from 'lucide-react';

const emptyForm = { name: '', email: '', subject: '', message: '' };

// "https://github.com/devusmanamjad" -> "devusmanamjad"; "https://linkedin.com/in/x" -> "in/x"
const handle = (url) => url.replace(/^https?:\/\/(www\.)?[^/]+\//, '').replace(/\/$/, '');

const Contact = () => {
  const reveal = useReveal();
  const [formData, setFormData] = useState(emptyForm);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // There is no backend for this form, so it hands the message to the visitor's
  // own email app (pre-filled) instead of pretending to send it.
  const handleSubmit = (e) => {
    e.preventDefault();
    const body = `${formData.message}\n\n— ${formData.name}\n${formData.email}`;
    const mailto = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
      formData.subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setIsSubmitted(true);
  };

  const channels = [
    { label: 'WhatsApp', value: personalInfo.phone, href: personalInfo.whatsapp },
    { label: 'LinkedIn', value: handle(personalInfo.linkedin), href: personalInfo.linkedin },
    { label: 'GitHub', value: handle(personalInfo.github), href: personalInfo.github },
  ];

  return (
    <Section
      id="contact"
      index="08"
      label="Contact"
      title={
        <>
          Let's build something <em>reliable</em> together.
        </>
      }
      lead="Open to conversations about distributed systems, cloud architecture and challenging .NET engineering problems."
    >
      {/* Email */}
      <motion.div {...reveal()}>
        <p className="label">Email</p>
        <a
          href={`mailto:${personalInfo.email}`}
          className="display mt-3 inline-block break-all text-[clamp(1.6rem,4.6vw,3.25rem)] leading-tight underline decoration-ink/25 decoration-1 underline-offset-[10px] transition-colors hover:text-brand hover:decoration-brand"
        >
          {personalInfo.email}
        </a>
      </motion.div>

      {/* Other channels */}
      <motion.ul {...reveal(0.05)} className="mt-12 grid border-t border-line sm:grid-cols-3">
        {channels.map((channel) => (
          <li key={channel.label} className="border-b border-line sm:border-b-0">
            <a
              href={channel.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start justify-between gap-4 py-5 sm:pr-8"
            >
              <span>
                <span className="label block">{channel.label}</span>
                <span className="mt-1.5 block text-ink transition-colors group-hover:text-brand">{channel.value}</span>
              </span>
              <ArrowUpRight size={18} strokeWidth={1.5} className="mt-1 shrink-0 text-ink-3 transition-colors group-hover:text-brand" />
            </a>
          </li>
        ))}
      </motion.ul>

      {/* Form */}
      <motion.div {...reveal(0.1)} className="mt-16 max-w-2xl">
        <p className="label">Or write a message</p>

        {isSubmitted ? (
          <div role="status" className="mt-6 border-l-2 border-brand pl-5">
            <p className="display text-2xl">Your email app should now be open.</p>
            <p className="mt-2 text-[15px] leading-relaxed">
              The message is pre-filled and ready to send. If nothing opened, email me directly at{' '}
              <a href={`mailto:${personalInfo.email}`} className="link">
                {personalInfo.email}
              </a>
              .
            </p>
            <button
              type="button"
              onClick={() => {
                setFormData(emptyForm);
                setIsSubmitted(false);
              }}
              className="btn-outline mt-6"
            >
              Write another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="sr-only">Your name</label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="field"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="sr-only">Your email</label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="field"
                  placeholder="Your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact-subject" className="sr-only">Subject</label>
              <input
                id="contact-subject"
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="field"
                placeholder="Subject"
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="sr-only">Message</label>
              <textarea
                id="contact-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="field resize-none"
                placeholder="Tell me about the role, the system, or the problem you're solving"
              />
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
              <button type="submit" className="btn">
                Send message
                <ArrowUpRight size={16} strokeWidth={1.75} />
              </button>
              <p className="text-sm text-ink-3">Opens your email app with the message ready to send.</p>
            </div>
          </form>
        )}
      </motion.div>
    </Section>
  );
};

export default Contact;
