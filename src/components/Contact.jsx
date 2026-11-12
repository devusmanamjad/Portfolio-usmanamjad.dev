import React, { useState } from 'react';
import { ArrowUpRight, Send } from 'lucide-react';
import { personalInfo } from '../data/mock';
import Magnetic from './motion/Magnetic';

const emptyForm = { name: '', email: '', subject: '', message: '' };

// "https://github.com/devusmanamjad" -> "devusmanamjad"; "https://linkedin.com/in/x" -> "in/x"
const handle = (url) => url.replace(/^https?:\/\/(www\.)?[^/]+\//, '').replace(/\/$/, '');

const Contact = () => {
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
    window.location.href = `mailto:${personalInfo.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(body)}`;
    setIsSubmitted(true);
  };

  const channels = [
    { label: 'WhatsApp', value: personalInfo.phone, href: personalInfo.whatsapp },
    { label: 'LinkedIn', value: handle(personalInfo.linkedin), href: personalInfo.linkedin },
    { label: 'GitHub', value: handle(personalInfo.github), href: personalInfo.github },
  ];

  return (
    <section id="contact" className="px-3 py-3 sm:px-5 sm:py-5">
      <div className="band-dark relative overflow-hidden rounded-[2rem] bg-paper text-ink-2 sm:rounded-[2.75rem]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="aurora animate-drift-a -left-32 -top-40 h-[34rem] w-[34rem] bg-[rgb(var(--glow-1)/0.7)]" />
          <div className="aurora animate-drift-b -right-24 top-1/4 h-[30rem] w-[30rem] bg-[rgb(var(--glow-2)/0.6)]" />
          <div className="aurora animate-drift-c -bottom-48 left-1/3 h-[26rem] w-[26rem] bg-[rgb(var(--glow-3)/0.35)]" />
          <div className="bg-grid absolute inset-0 opacity-60" />
        </div>

        <div className="container-page relative grid gap-14 py-20 sm:py-28 lg:grid-cols-12 lg:gap-12 lg:py-32">
          <div className="lg:col-span-6">
            <p data-reveal className="label flex items-center gap-3">
              <span className="text-brand">08</span>
              <span aria-hidden="true" className="h-px w-10 bg-ink/20" />
              Contact
            </p>
            <h2 data-split className="display mt-6 text-[clamp(2.6rem,6vw,5rem)] leading-[1.02]">
              Let&apos;s build something <span className="text-gradient">reliable</span> together.
            </h2>
            <p data-reveal className="mt-6 max-w-lg text-lg leading-relaxed">
              Open to conversations about distributed systems, cloud architecture and challenging .NET engineering problems.
            </p>

            <div data-reveal className="mt-10">
              <Magnetic strength={0.2}>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="group inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 py-2 pl-6 pr-2 text-base font-semibold text-ink backdrop-blur transition-colors hover:bg-white/10 sm:text-lg"
                >
                  <span className="break-all">{personalInfo.email}</span>
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-2 text-white transition-transform duration-500 group-hover:rotate-45">
                    <ArrowUpRight size={18} strokeWidth={2} />
                  </span>
                </a>
              </Magnetic>
            </div>

            <ul data-reveal className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-3 lg:grid-cols-1 2xl:grid-cols-3">
              {channels.map((channel) => (
                <li key={channel.label} className="bg-paper/80">
                  <a
                    href={channel.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full items-center justify-between gap-3 px-5 py-4 transition-colors hover:bg-surface"
                  >
                    <span className="min-w-0">
                      <span className="label block">{channel.label}</span>
                      <span className="mt-1.5 block truncate text-sm font-medium text-ink">{channel.value}</span>
                    </span>
                    <ArrowUpRight size={16} className="mt-0.5 shrink-0 text-ink-3 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Form */}
          <div data-reveal className="lg:col-span-6 lg:pl-6">
            <div className="glass rounded-[2rem] p-6 sm:p-9">
              {isSubmitted ? (
                <div role="status" className="py-6">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-brand-2 text-white">
                    <Send size={22} />
                  </span>
                  <p className="display mt-6 text-2xl">Your email app should now be open.</p>
                  <p className="mt-3 text-[15px] leading-relaxed">
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
                    className="btn-outline mt-8"
                  >
                    Write another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <p className="display text-2xl">Write me a message</p>
                  <p className="!mb-6 text-sm text-ink-3">It opens your email app with everything filled in.</p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-name" className="label mb-2 block">Name</label>
                      <input id="contact-name" type="text" name="name" autoComplete="name" value={formData.name} onChange={handleChange} required className="field" placeholder="Your name" />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="label mb-2 block">Email</label>
                      <input id="contact-email" type="email" name="email" autoComplete="email" value={formData.email} onChange={handleChange} required className="field" placeholder="you@company.com" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="contact-subject" className="label mb-2 block">Subject</label>
                    <input id="contact-subject" type="text" name="subject" value={formData.subject} onChange={handleChange} required className="field" placeholder="What's it about?" />
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="label mb-2 block">Message</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="field resize-none"
                      placeholder="Tell me about the role, the system, or the problem you're solving"
                    />
                  </div>
                  <button type="submit" className="btn-brand w-full !py-4">
                    Send message
                    <Send size={16} strokeWidth={2} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
