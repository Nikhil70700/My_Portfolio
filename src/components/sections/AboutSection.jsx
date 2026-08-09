import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layers,
  Network,
  LayoutDashboard,
  Component,
  Server,
  Database,
  Zap,
  Globe,
  Sparkles,
  CheckCircle2,
  Info
} from 'lucide-react';
import { soundFx } from '../../utils/soundEffects';
import { About3DScene } from '../3d/About3DScene';

export const AboutSection = () => {
  const [activePillarIndex, setActivePillarIndex] = useState(0);

  // 9 Experience Pillars strictly grounded in CV data
  const experiencePillars = [
    {
      id: 'saas',
      title: 'SaaS Applications',
      icon: Layers,
      color: '#00F0FF',
      summary: 'Grounded in GymSaathi',
      explanation:
        'Developed GymSaathi, a full-stack gym management SaaS featuring member onboarding workflows, subscription automation, BCA charge verification, and role-based access.'
    },
    {
      id: 'apis',
      title: 'API Integration',
      icon: Network,
      color: '#38BDF8',
      summary: 'REST APIs & WhatsApp Integration',
      explanation:
        'Built and consumed REST APIs for full-stack client-server interaction and integrated WhatsApp automated API messaging for instant user credentials and billing alerts.'
    },
    {
      id: 'dashboards',
      title: 'Dashboards',
      icon: LayoutDashboard,
      color: '#8B5CF6',
      summary: 'Super Admin & Gym Admin',
      explanation:
        'Designed distinct, secure role-based administrative dashboards providing granular data controls, active member management, and operational reporting.'
    },
    {
      id: 'ui-components',
      title: 'Reusable UI Components',
      icon: Component,
      color: '#EC4899',
      summary: 'Modular React Components',
      explanation:
        'Engineered responsive, accessible React.js UI component libraries and workout planner interfaces for consistent user experience across SaaS modules.'
    },
    {
      id: 'backend',
      title: 'Backend Development',
      icon: Server,
      color: '#10B981',
      summary: 'Node.js & Express.js',
      explanation:
        'Developed structured backend services using Node.js and Express.js, implementing clean request routing, authentication checks, and business logic.'
    },
    {
      id: 'databases',
      title: 'Database Management',
      icon: Database,
      color: '#F59E0B',
      summary: 'MongoDB & MySQL',
      explanation:
        'Hands-on experience structuring MongoDB document collections for MERN applications and managing relational MySQL databases via phpMyAdmin.'
    },
    {
      id: 'performance',
      title: 'Performance Optimization',
      icon: Zap,
      color: '#EAB308',
      summary: 'Speed, Responsiveness & UX',
      explanation:
        'Identified and fixed UI responsiveness bugs, optimized application load times, and refined cross-device layout performance across all platform views.'
    },
    {
      id: 'wordpress',
      title: 'WordPress Development',
      icon: Globe,
      color: '#0284C7',
      summary: 'Custom Themes, PHP & Plugins',
      explanation:
        'Created custom WordPress themes with PHP, developed a custom AJAX form plugin with database storage, and customized Elementor sites following secure practices.'
    },
    {
      id: 'ai-dev',
      title: 'AI-Assisted Development',
      icon: Sparkles,
      color: '#A855F7',
      summary: 'Generative AI & Agentic AI Tools',
      explanation:
        'Leveraged AI-assisted development tools, Generative AI, Agentic AI, and prompt engineering to accelerate code delivery and streamline debugging workflows.'
    }
  ];

  const activePillar = experiencePillars[activePillarIndex];

  return (
    <section id="about" className="relative py-24 bg-obsidian-950/80 overflow-hidden">
      {/* Background Subtle Accent Gradients */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-cyanGlow/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blueGlow/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 mb-3"
        >
          <div className="px-3 py-1 rounded-full bg-cyanGlow/10 border border-cyanGlow/30 text-cyanGlow text-xs font-mono font-semibold uppercase tracking-wider">
            About Me
          </div>
        </motion.div>

        {/* Split Screen Grid Layout */}
        {/* FIX #3: added md:grid-cols-12 so tablets (768-1023px) don't stay single-column.
            FIX #2: swapped items-center -> items-start so columns don't visually jump
            relative to each other when the right column's height is fixed and the
            left column's content changes height (pillar card). */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 items-start">

          {/* Left Column: Text & Experience Badges */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="md:col-span-7 space-y-6"
          >

            {/* Exact Required Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-white tracking-tight leading-tight">
              "Turning Ideas Into <span className="text-gradient-cyan">Working Products.</span>"
            </h2>

            {/* Core Message & Concise Bio */}
            <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
              <p className="p-4 rounded-xl bg-cyanGlow/5 border border-cyanGlow/20 text-cyan-100 font-medium leading-relaxed">
                "I am a software developer who builds real-world web applications across frontend, backend and full-stack development, with professional experience in SaaS, APIs, dashboards, databases, WordPress and AI-assisted development."
              </p>

              <p className="text-gray-300">
                With practical experience across full-stack web applications, I specialize in building responsive user interfaces using <strong className="text-white">React.js</strong> and robust backend services with <strong className="text-white">Node.js</strong> and <strong className="text-white">Express.js</strong>, supported by <strong className="text-white">MongoDB</strong> and <strong className="text-white">MySQL</strong> databases.
              </p>
            </div>

            {/* Compact Interactive Experience Badges Section */}
            <div className="pt-2 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-widest text-gray-400 font-semibold flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-cyanGlow" />
                  Select an Experience Pillar to view details:
                </span>
              </div>

              {/* Compact Badges Grid */}
              <div className="flex flex-wrap gap-2">
                {experiencePillars.map((pillar, idx) => {
                  const Icon = pillar.icon;
                  const isActive = activePillarIndex === idx;
                  return (
                    <button
                      key={pillar.id}
                      onClick={() => {
                        soundFx.playClick();
                        setActivePillarIndex(idx);
                      }}
                      onMouseEnter={() => {
                        // FIX #6: only auto-switch on hover for devices with a real
                        // hover-capable pointer (mouse/trackpad). Prevents touch
                        // devices from flashing the wrong panel on tap before
                        // onClick registers.
                        if (window.matchMedia && window.matchMedia('(hover: hover)').matches) {
                          soundFx.playHover();
                          setActivePillarIndex(idx);
                        }
                      }}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-mono transition-all duration-200 cursor-pointer border ${isActive
                          ? 'bg-cyanGlow/15 border-cyanGlow text-white shadow-[0_0_15px_rgba(0,240,255,0.25)] scale-105'
                          : 'glass-panel border-white/10 text-gray-300 hover:border-gray-500 hover:text-white'
                        }`}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" style={{ color: pillar.color }} />
                      {/* FIX #5: whitespace-nowrap prevents multi-line label wrap
                          which was breaking the pill shape on narrow rows. */}
                      <span className="whitespace-nowrap">{pillar.title}</span>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Interactive Explanation Card */}
              {/* FIX #2: min-h added so the card (and everything below it, and the
                  aligned right column) doesn't jump every time a pillar with a
                  different explanation length is selected. */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePillar.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="p-4 rounded-xl glass-panel border border-cyanGlow/30 bg-obsidian-900/90 shadow-xl space-y-2 min-h-[112px] sm:min-h-[100px]"
                >
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2 min-w-0">
                      <activePillar.icon className="w-4 h-4 shrink-0" style={{ color: activePillar.color }} />
                      <h4 className="font-heading font-bold text-sm text-white truncate">
                        {activePillar.title}
                      </h4>
                    </div>
                    <span className="text-[11px] font-mono text-cyanGlow px-2.5 py-0.5 rounded-full bg-cyanGlow/10 border border-cyanGlow/20 whitespace-nowrap">
                      {activePillar.summary}
                    </span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed font-sans">
                    {activePillar.explanation}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Quick Recruiter Summary Highlights */}
            <div className="pt-2 grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl glass-panel border-white/5 flex items-center gap-2 text-xs text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-cyanGlow shrink-0" />
                <span>Full-Stack MERN</span>
              </div>
              <div className="p-3 rounded-xl glass-panel border-white/5 flex items-center gap-2 text-xs text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-cyanGlow shrink-0" />
                <span>SaaS & Dashboards</span>
              </div>
              <div className="p-3 rounded-xl glass-panel border-white/5 flex items-center gap-2 text-xs text-gray-300 col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-cyanGlow shrink-0" />
                <span>WordPress & AI Tools</span>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Interactive 3D Developer Ecosystem */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
            className="md:col-span-5 relative"
          >
            <div className="glass-panel p-2 rounded-2xl border border-white/10 shadow-2xl relative group">
              {/* Outer Subtle Ambient Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyanGlow/10 to-blueGlow/10 rounded-2xl blur-xl opacity-50 group-hover:opacity-80 transition-opacity pointer-events-none" />

              {/* Top Card Header Bar */}
              {/* FIX #4: min-w-0 + truncate on filename, and "Interactive" label
                  hidden below sm, so this bar can't overflow on narrow phones. */}
              <div className="flex items-center justify-between gap-2 px-4 py-2 border-b border-white/10 text-xs font-mono text-gray-400">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block shrink-0" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block shrink-0" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block shrink-0" />
                  <span className="ml-2 text-gray-300 font-semibold text-[11px] truncate">
                    developer-ecosystem.3d
                  </span>
                </div>
                <span className="hidden sm:inline text-[10px] text-cyanGlow font-mono uppercase shrink-0">
                  Interactive
                </span>
              </div>

              {/* 3D Canvas Container */}
              {/* FIX #1: explicit height added. Canvas libraries (react-three-fiber /
                  Canvas) render at height:100% of their parent - with no height set
                  here the parent had 0px height and the scene was invisible. */}
              <div className="relative overflow-hidden rounded-xl bg-obsidian-950/60 h-[320px] sm:h-[400px] lg:h-[480px]">
                <About3DScene />
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default AboutSection;