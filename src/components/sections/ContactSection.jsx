import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Copy, Check, Send, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';
import { personalInfo } from '../../data/portfolioData';
import { GlassCard } from '../ui/GlassCard';
import { soundFx } from '../../utils/soundEffects';

export const ContactSection = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    soundFx.playSuccess();
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(personalInfo.phone);
    setCopiedPhone(true);
    soundFx.playSuccess();
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    soundFx.playSuccess();
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.7 } });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border-cyanGlow/30 text-xs font-mono text-cyanGlow uppercase tracking-wider">
            <Mail className="w-3.5 h-3.5" />
            <span>Connect & Recruit</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-gradient">
            Let's Build Something High Impact
          </h2>
          <p className="text-gray-300 text-sm sm:text-base">
            Open for software developer roles, full-stack web application engineering, and technical collaborations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Direct Contact Info & Quick Copy Buttons */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Email Card */}
            <GlassCard className="p-6 border-cyanGlow/30 space-y-4 hover:border-cyanGlow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyanGlow/10 border border-cyanGlow/30 flex items-center justify-center text-cyanGlow">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-gray-400">Direct Email</p>
                    <a 
                      href={`mailto:${personalInfo.email}`}
                      className="text-sm sm:text-base font-heading font-bold text-white hover:text-cyanGlow transition-colors"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  onMouseEnter={() => soundFx.playHover()}
                  title="Copy Email"
                  className="p-2.5 rounded-xl glass-panel hover:bg-cyanGlow/20 text-cyanGlow transition-all"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emeraldGlow" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <div className="text-[11px] font-mono text-gray-400">
                {copiedEmail ? 'Email address copied to clipboard!' : 'Click copy or tap to launch your default mail app.'}
              </div>
            </GlassCard>

            {/* Phone Card */}
            <GlassCard className="p-6 border-cyanGlow/30 space-y-4 hover:border-cyanGlow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blueGlow/10 border border-blueGlow/30 flex items-center justify-center text-blueGlow">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-gray-400">Direct Phone</p>
                    <a 
                      href={`tel:${personalInfo.phone}`}
                      className="text-sm sm:text-base font-heading font-bold text-white hover:text-blueGlow transition-colors"
                    >
                      {personalInfo.formattedPhone}
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleCopyPhone}
                  onMouseEnter={() => soundFx.playHover()}
                  title="Copy Phone"
                  className="p-2.5 rounded-xl glass-panel hover:bg-blueGlow/20 text-blueGlow transition-all"
                >
                  {copiedPhone ? <Check className="w-4 h-4 text-emeraldGlow" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <div className="text-[11px] font-mono text-gray-400">
                {copiedPhone ? 'Phone number copied to clipboard!' : 'Click copy or tap to call directly.'}
              </div>
            </GlassCard>

            {/* Location Card */}
            <GlassCard className="p-6 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emeraldGlow/10 border border-emeraldGlow/30 flex items-center justify-center text-emeraldGlow">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-mono text-gray-400">Current Location</p>
                  <p className="text-sm font-heading font-bold text-white">
                    {personalInfo.location}
                  </p>
                </div>
              </div>
              <p className="text-xs text-gray-400">
                Open for remote roles across global time zones and hybrid/onsite roles.
              </p>
            </GlassCard>

          </div>

          {/* Right Column: Direct Interactive Contact Form */}
          <div className="lg:col-span-7">
            <GlassCard className="p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-xl font-heading font-bold text-white">
                    Send Direct Message
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Fast response guaranteed. Reach out regarding full-time roles or project inquiries.
                  </p>
                </div>
                <MessageSquare className="w-5 h-5 text-cyanGlow" />
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 rounded-2xl bg-emeraldGlow/10 border border-emeraldGlow/40 text-center space-y-3"
                >
                  <div className="w-12 h-12 rounded-full bg-emeraldGlow/20 border border-emeraldGlow flex items-center justify-center mx-auto text-emeraldGlow">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-heading font-bold text-white">
                    Message Transmitted Successfully!
                  </h4>
                  <p className="text-xs text-gray-300 max-w-md mx-auto">
                    Thank you, {formState.name || 'there'}! Your message has been prepared for transmission to <strong>{personalInfo.email}</strong>.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-gray-400 mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-obsidian-900 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-cyanGlow text-sm transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-gray-400 mb-1">Your Email</label>
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-obsidian-900 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-cyanGlow text-sm transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-gray-400 mb-1">Subject</label>
                    <input
                      type="text"
                      required
                      placeholder="Software Developer Opportunity / Inquiry"
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-obsidian-900 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-cyanGlow text-sm transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-gray-400 mb-1">Message</label>
                    <textarea
                      rows="4"
                      required
                      placeholder="Hi Nikhil, we reviewed your GymSaathi full-stack experience and would like to discuss..."
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-obsidian-900 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-cyanGlow text-sm transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    onMouseEnter={() => soundFx.playHover()}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyanGlow to-blueGlow text-obsidian-950 font-heading font-bold text-sm hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] transition-all flex items-center justify-center gap-2 group"
                  >
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    <span>Send Message to Nikhil</span>
                  </button>
                </form>
              )}

            </GlassCard>
          </div>

        </div>

      </div>
    </section>
  );
};
