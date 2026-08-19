import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Command, Volume2, VolumeX, Menu, X, Code2, Briefcase, GraduationCap, Mail, Sparkles, Layers, User, Award } from 'lucide-react';
import { soundFx } from '../../utils/soundEffects';

export const Navbar = ({ onOpenCommand, soundEnabled, setSoundEnabled }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = ['hero', 'about', 'skills', 'project', 'experience', 'education', 'certifications', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', label: 'Home', icon: Sparkles },
    { id: 'about', label: 'About', icon: User },
    { id: 'skills', label: 'Skills', icon: Code2 },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'project', label: 'Projects', icon: Layers },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'certifications', label: 'Certificates', icon: Award },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const handleNavClick = (id) => {
    soundFx.playClick();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-3 bg-obsidian-950/80 backdrop-blur-xl border-b border-white/10 shadow-2xl' : 'py-4 sm:py-5 bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('hero')}
          className="flex items-center gap-3 group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyanGlow/20 to-blueGlow/20 border border-cyanGlow/40 flex items-center justify-center font-heading font-bold text-cyanGlow group-hover:scale-105 group-hover:border-cyanGlow transition-all shadow-[0_0_15px_rgba(0,240,255,0.2)]">
            N
          </div>
          <div className="text-left hidden sm:block">
            <span className="block font-heading font-bold text-sm tracking-wide text-white group-hover:text-cyanGlow transition-colors">
              NIKHIL KUMAR PANDEY
            </span>
            <span className="block text-[10px] text-gray-400 font-mono tracking-wider uppercase">
              Full Stack Developer
            </span>
          </div>
        </button>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-1 glass-panel px-3 py-1.5 rounded-full border-white/10 shadow-inner">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                onMouseEnter={() => soundFx.playHover()}
                className={`relative px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${isActive ? 'text-white font-semibold' : 'text-gray-400 hover:text-gray-200'
                  }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-cyanGlow/20 to-blueGlow/20 border border-cyanGlow/50 rounded-full shadow-[0_0_12px_rgba(0,240,255,0.3)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Controls (Command Palette + Sound Toggle) */}
        <div className="flex items-center gap-2">
          {/* Audio Sound Toggle */}
          <button
            onClick={() => {
              const state = soundFx.toggleSound();
              setSoundEnabled(state);
            }}
            onMouseEnter={() => soundFx.playHover()}
            title={soundEnabled ? 'Mute Sound Effects' : 'Enable Sound Effects'}
            className="p-2.5 rounded-xl glass-panel hover:border-cyanGlow/40 text-gray-300 hover:text-cyanGlow transition-all"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-cyanGlow" /> : <VolumeX className="w-4 h-4 text-gray-500" />}
          </button>

          {/* Command Palette Button */}
          <button
            onClick={() => {
              soundFx.playClick();
              onOpenCommand(true);
            }}
            onMouseEnter={() => soundFx.playHover()}
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl glass-panel hover:border-cyanGlow/40 text-xs text-gray-300 hover:text-white transition-all group"
          >
            <Command className="w-3.5 h-3.5 text-cyanGlow group-hover:rotate-12 transition-transform" />
            <span className="font-mono text-[11px]">Ctrl + K</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => {
              soundFx.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="md:hidden p-2.5 rounded-xl glass-panel text-gray-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-panel border-t border-white/10 mt-2 px-4 py-4 space-y-2"
          >
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-left text-sm text-gray-300 hover:text-white hover:bg-cyanGlow/10 hover:border hover:border-cyanGlow/30 transition-all"
                >
                  <Icon className="w-4 h-4 text-cyanGlow" />
                  <span>{link.label}</span>
                </button>
              );
            })}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCommand(true);
              }}
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-cyanGlow/10 border border-cyanGlow/30 text-cyanGlow text-sm font-medium"
            >
              <div className="flex items-center gap-2">
                <Command className="w-4 h-4" />
                <span>Command Menu</span>
              </div>
              <span className="font-mono text-xs">Ctrl+K</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
