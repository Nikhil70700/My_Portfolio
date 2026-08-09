import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Command, Code, Briefcase, GraduationCap, Mail, Phone, Sparkles, Volume2, VolumeX, Layers } from 'lucide-react';
import { personalInfo } from '../../data/portfolioData';
import { soundFx } from '../../utils/soundEffects';

export const CommandPalette = ({ isOpen, onClose, soundEnabled, setSoundEnabled }) => {
  const [query, setQuery] = useState('');
  const [copied, setCopied] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        soundFx.playClick();
        onClose(!isOpen);
      }
      if (e.key === 'Escape' && isOpen) {
        onClose(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    soundFx.playSuccess();
    setTimeout(() => setCopied(null), 2000);
  };

  const commands = [
    {
      category: 'Navigation',
      items: [
        { id: 'hero', title: 'Go to Hero & Overview', icon: Sparkles, action: () => scrollTo('#hero') },
        { id: 'skills', title: 'View Technical Skills', icon: Code, action: () => scrollTo('#skills') },
        { id: 'project', title: 'Explore GymSaathi SaaS Project', icon: Layers, action: () => scrollTo('#project') },
        { id: 'experience', title: 'Professional Experience', icon: Briefcase, action: () => scrollTo('#experience') },
        { id: 'education', title: 'Education & Certifications', icon: GraduationCap, action: () => scrollTo('#education') },
        { id: 'contact', title: 'Contact & Hire', icon: Mail, action: () => scrollTo('#contact') },
      ]
    },
    {
      category: 'Quick Actions',
      items: [
        {
          id: 'copy-email',
          title: copied === 'email' ? 'Email Copied!' : `Copy Email (${personalInfo.email})`,
          icon: Mail,
          action: () => handleCopy(personalInfo.email, 'email')
        },
        {
          id: 'copy-phone',
          title: copied === 'phone' ? 'Phone Copied!' : `Copy Phone (${personalInfo.phone})`,
          icon: Phone,
          action: () => handleCopy(personalInfo.phone, 'phone')
        },
        {
          id: 'toggle-audio',
          title: soundEnabled ? 'Mute Sound Effects' : 'Enable Sound Effects',
          icon: soundEnabled ? VolumeX : Volume2,
          action: () => {
            const nextState = soundFx.toggleSound();
            setSoundEnabled(nextState);
          }
        }
      ]
    }
  ];

  const scrollTo = (selector) => {
    onClose(false);
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredCommands = commands.map(cat => ({
    ...cat,
    items: cat.items.filter(item => item.title.toLowerCase().includes(query.toLowerCase()))
  })).filter(cat => cat.items.length > 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onClose(false)}
            className="fixed inset-0 bg-obsidian-950/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="glass-panel relative w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl border border-cyanGlow/30 z-10"
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10">
              <Search className="w-5 h-5 text-cyanGlow" />
              <input
                type="text"
                placeholder="Type a command or search section (e.g. skills, contact)..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent text-gray-100 placeholder-gray-500 focus:outline-none text-sm font-medium"
                autoFocus
              />
              <button
                onClick={() => onClose(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Command Results */}
            <div className="max-h-80 overflow-y-auto p-2 space-y-4">
              {filteredCommands.length > 0 ? (
                filteredCommands.map((cat, idx) => (
                  <div key={idx} className="space-y-1">
                    <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      {cat.category}
                    </p>
                    {cat.items.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          onClick={item.action}
                          onMouseEnter={() => soundFx.playHover()}
                          className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-cyanGlow/10 hover:border hover:border-cyanGlow/30 text-left text-sm text-gray-300 hover:text-white transition-all group"
                        >
                          <div className="flex items-center gap-3">
                            <Icon className="w-4 h-4 text-gray-400 group-hover:text-cyanGlow transition-colors" />
                            <span>{item.title}</span>
                          </div>
                          <span className="text-xs text-gray-500 group-hover:text-cyanGlow/80">Select</span>
                        </button>
                      );
                    })}
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-gray-500 text-sm">
                  No matching commands found.
                </div>
              )}
            </div>

            {/* Footer helper */}
            <div className="px-4 py-2.5 bg-obsidian-900/90 border-t border-white/5 flex justify-between items-center text-xs text-gray-500">
              <div className="flex items-center gap-1.5">
                <Command className="w-3.5 h-3.5 text-cyanGlow" />
                <span>Quick Palette</span>
              </div>
              <div className="flex items-center gap-2">
                <span>Press <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-[10px]">ESC</kbd> to exit</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
