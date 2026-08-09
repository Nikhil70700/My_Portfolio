import React from 'react';
import { ArrowUp, Mail, Phone, MapPin, Code2 } from 'lucide-react';
import { personalInfo } from '../../data/portfolioData';
import { soundFx } from '../../utils/soundEffects';

export const Footer = () => {
  const scrollToTop = () => {
    soundFx.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 bg-obsidian-950/90 border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top Row: Brand & Scroll to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-10 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyanGlow/20 to-blueGlow/20 border border-cyanGlow/40 flex items-center justify-center font-heading font-bold text-cyanGlow">
              NKP
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-white text-lg tracking-wide">
                {personalInfo.name}
              </h3>
              <p className="text-xs font-mono text-gray-400">
                {personalInfo.title}
              </p>
            </div>
          </div>

          <button
            onClick={scrollToTop}
            onMouseEnter={() => soundFx.playHover()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl glass-panel hover:border-cyanGlow/40 text-xs font-mono text-cyanGlow transition-all"
          >
            <span>Back to top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* Middle Row: Contact Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-cyanGlow" />
            <a href={`mailto:${personalInfo.email}`} className="hover:text-white transition-colors">
              {personalInfo.email}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-cyanGlow" />
            <a href={`tel:${personalInfo.phone}`} className="hover:text-white transition-colors">
              {personalInfo.formattedPhone}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-cyanGlow" />
            <span>{personalInfo.location}</span>
          </div>
        </div>

        {/* Bottom Copyright & Tech Stack */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-gray-500">
          <div>
            © {new Date().getFullYear()} Nikhil Kumar Pandey. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <Code2 className="w-3.5 h-3.5 text-cyanGlow" />
            <span>Built with React 18, Vite, Three.js & Tailwind CSS</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
