import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Layers, CheckCircle2, Shield, Zap, ExternalLink, BookOpen,
  X, ChevronRight, Users, CreditCard, MessageSquare, Activity,
  GitBranch, BarChart3, Lock, Smartphone
} from 'lucide-react';
import { mainProject } from '../../data/portfolioData';
import { soundFx } from '../../utils/soundEffects';
import { GymSaathi3DShowcase } from '../3d/GymSaathi3DShowcase';
const LINKS = {
  live: '#live-project-url',       // ← Replace with real live URL
  caseStudy: null,
  github: 'https://github.com/Nikhil70700',
};

// ─── Feature data ─────────────────────────────────────────────────────────────

const FEATURES = [
  {
    icon: Users,
    color: '#00F0FF',
    title: 'Member Onboarding',
    desc: 'Controlled credential delivery based on payment verification and BCA charges logic.',
  },
  {
    icon: Lock,
    color: '#38BDF8',
    title: 'Role-Based Dashboards',
    desc: 'Distinct, secure Super Admin and Gym Admin dashboards with separate permissions.',
  },
  {
    icon: BarChart3,
    color: '#8B5CF6',
    title: 'Gym Management',
    desc: 'Gym creation workflow, active member management, and operational controls.',
  },
  {
    icon: CreditCard,
    color: '#10B981',
    title: 'Subscription Management',
    desc: 'Automated subscription handling, plan tracking, and billing lifecycle.',
  },
  {
    icon: Smartphone,
    color: '#F59E0B',
    title: 'QR Payment Tracking',
    desc: 'QR-based payment tracking with manual verification workflow for non-gateway transactions.',
  },
  {
    icon: Activity,
    color: '#EC4899',
    title: 'Billing & Invoices',
    desc: 'Automatic monthly invoice generation for annual plans.',
  },
  {
    icon: MessageSquare,
    color: '#22C55E',
    title: 'WhatsApp Integration',
    desc: 'Automated WhatsApp notifications for instant credential delivery and billing alerts.',
  },
  {
    icon: Zap,
    color: '#F97316',
    title: 'Performance Optimization',
    desc: 'Responsive UI and performance optimized across all platform modules.',
  },
];

// ─── Case Study data ───────────────────────────────────────────────────────────

const CASE_STUDY = {
  problem:
    'Gym owners faced manual, error-prone member registration, credential sharing, and billing processes. There was no centralized platform managing onboarding, subscription cycles, payment verification, and automated member communication.',

  solution:
    'Built GymSaathi — a full-stack gym management SaaS that centralized onboarding, role-based dashboards, subscription automation, QR payment verification, and WhatsApp-based communication into a single platform.',

  keyFeatures: [
    'Member onboarding with payment verification and BCA charges logic',
    'Role-based access for Super Admin and Gym Admin',
    'Gym creation, active member management, and subscription tracking',
    'QR-based payment tracking with manual approval workflow',
    'Monthly invoice generation for annual plan subscribers',
    'WhatsApp API integration for automated credential and billing alerts',
    'Responsive UI with performance and UX optimization across modules',
  ],

  technicalImplementation: [
    {
      area: 'Frontend',
      detail: 'React.js with JavaScript. Reusable UI components, responsive layouts, and interactive dashboards.',
    },
    {
      area: 'Backend',
      detail: 'Node.js and Express.js for REST API development, routing, and business logic.',
    },
    {
      area: 'Database',
      detail: 'MongoDB for flexible document-based data storage supporting members, gyms, and subscriptions.',
    },
    {
      area: 'APIs & Integrations',
      detail: 'REST API architecture. WhatsApp API integrated for automated notification and credential delivery.',
    },
    {
      area: 'AI-Assisted Development',
      detail: 'AI-assisted development tools used throughout the project to accelerate build and deployment cycles.',
    },
  ],

  whatIBuilt: [
    'Workout planner modules and member management dashboard views',
    'Onboarding workflow with payment verification and controlled credential delivery',
    'Super Admin and Gym Admin role-based dashboards',
    'QR payment tracking with manual verification flow',
    'WhatsApp automated messaging integration for billing and access notifications',
    'Subscription and invoice management system',
    'Performance, responsiveness, and UX improvements across all modules',
  ],

  // Challenges: only stated where grounded in CV. Remainder are honest placeholders.
  challenges: [
    {
      challenge: 'Coordinating payment verification logic with automated credential delivery',
      note: 'Grounded in CV',
    },
    {
      challenge: '[Add specific technical challenge here — placeholder]',
      note: 'Editable placeholder',
    },
    {
      challenge: '[Add specific technical challenge here — placeholder]',
      note: 'Editable placeholder',
    },
  ],

  technologies: [
    { name: 'React.js', category: 'Frontend' },
    { name: 'JavaScript', category: 'Language' },
    { name: 'Node.js', category: 'Backend' },
    { name: 'Express.js', category: 'Backend' },
    { name: 'MongoDB', category: 'Database' },
    { name: 'REST APIs', category: 'Integration' },
    { name: 'WhatsApp API', category: 'Integration' },
  ],
};

// ─── Case Study Modal ─────────────────────────────────────────────────────────

function CaseStudyModal({ onClose }) {
  const [activeTab, setActiveTab] = useState('problem');

  const tabs = [
    { id: 'problem', label: 'Problem & Solution' },
    { id: 'features', label: 'Key Features' },
    { id: 'implementation', label: 'Technical Implementation' },
    { id: 'built', label: 'What I Built' },
    { id: 'challenges', label: 'Challenges' },
    { id: 'tech', label: 'Technologies' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ scale: 0.94, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.94, y: 20, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl bg-slate-900 border border-cyan-500/30 shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/40 text-cyan-400 text-[11px] font-mono">
                Case Study
              </span>
            </div>
            <h2 className="text-xl font-heading font-extrabold text-white">GymSaathi — Full-Stack SaaS</h2>
            <p className="text-sm text-slate-400 mt-0.5">Gym Management & Member Engagement Platform</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-500 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            aria-label="Close case study"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Bar */}
        <div className="flex gap-1 px-6 pt-4 overflow-x-auto shrink-0">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => { soundFx.playClick(); setActiveTab(tab.id); }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${activeTab === tab.id
                ? 'bg-cyan-500/20 border border-cyan-500/50 text-cyan-300'
                : 'text-slate-400 hover:text-slate-200 border border-transparent hover:border-slate-700'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          <AnimatePresence mode="wait">

            {activeTab === 'problem' && (
              <motion.div key="problem" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-5">
                <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
                  <h3 className="text-sm font-heading font-bold text-white mb-2">Problem</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">{CASE_STUDY.problem}</p>
                </div>
                <div className="p-4 rounded-xl bg-cyan-500/8 border border-cyan-500/25">
                  <h3 className="text-sm font-heading font-bold text-cyan-300 mb-2">Solution</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">{CASE_STUDY.solution}</p>
                </div>
              </motion.div>
            )}

            {activeTab === 'features' && (
              <motion.div key="features" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3">
                {CASE_STUDY.keyFeatures.map((f, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-slate-700/40">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                    <span className="text-sm text-slate-300">{f}</span>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'implementation' && (
              <motion.div key="impl" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3">
                <p className="text-xs font-mono text-slate-500 pb-1">Technical details strictly sourced from CV. Placeholders marked where information is unavailable.</p>
                {CASE_STUDY.technicalImplementation.map((item, i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                    <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">{item.area}</span>
                    <p className="text-sm text-slate-300 mt-1.5 leading-relaxed">{item.detail}</p>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'built' && (
              <motion.div key="built" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3">
                {CASE_STUDY.whatIBuilt.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-slate-700/40">
                    <ChevronRight className="w-4 h-4 text-violet-400 mt-0.5 shrink-0" />
                    <span className="text-sm text-slate-300">{item}</span>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'tech' && (
              <motion.div key="tech" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {CASE_STUDY.technologies.map((t, i) => (
                    <div key={i} className="flex flex-col items-start px-3 py-2 rounded-xl bg-slate-800/60 border border-slate-700/50">
                      <span className="text-xs font-semibold text-white">{t.name}</span>
                      <span className="text-[10px] font-mono text-slate-500 mt-0.5">{t.category}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Feature Card ─────────────────────────────────────────────────────────────

function FeatureCard({ feature, index }) {
  const ref = useRef();
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const Icon = feature.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="group p-4 rounded-xl bg-slate-900/70 border border-slate-800/70 hover:border-slate-700 transition-all duration-200 backdrop-blur-sm"
      onMouseEnter={() => soundFx.playHover()}
    >
      <div className="flex items-start gap-3">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
          style={{ backgroundColor: `${feature.color}18` }}
        >
          <Icon className="w-4 h-4" style={{ color: feature.color }} />
        </div>
        <div>
          <h4 className="text-sm font-heading font-bold text-white group-hover:text-sky-300 transition-colors">
            {feature.title}
          </h4>
          <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{feature.desc}</p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export const MainProjectSection = () => {
  const [caseStudyOpen, setCaseStudyOpen] = useState(false);

  const openCaseStudy = () => { soundFx.playClick(); setCaseStudyOpen(true); };
  const closeCaseStudy = () => { soundFx.playClick(); setCaseStudyOpen(false); };

  const handleLink = (url) => {
    soundFx.playClick();
    if (url && !url.startsWith('#')) {
      window.open(url, '_blank', 'noopener noreferrer');
    }
  };

  return (
    <>
      <section id="project" className="py-24 relative z-10 overflow-hidden">

        {/* Background ambient glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-cyan-500/6 rounded-full blur-[200px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-500/6 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Section header ── */}
          <div className="text-center mb-14 space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-400 uppercase tracking-wider"
            >
              <Layers className="w-3.5 h-3.5" />
              Featured SaaS Platform
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: 0.08 }}
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-black tracking-tight text-white">
                GymSaathi
              </h2>
              <p className="text-base sm:text-xl text-slate-400 mt-2 font-light">
                Gym Management & Member Engagement Platform
              </p>
            </motion.div>

            {/* Tech badges */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: 0.18 }}
              className="flex flex-wrap justify-center gap-2 pt-2"
            >
              {mainProject.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-lg bg-slate-800/70 border border-slate-700/60 text-slate-300 text-xs font-mono"
                >
                  {tech}
                </span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: 0.25 }}
              className="flex flex-wrap justify-center gap-3 pt-2"
            >
              {/* LIVE PROJECT */}
              <button
                onClick={() => handleLink(LINKS.live)}
                onMouseEnter={() => soundFx.playHover()}
                disabled={LINKS.live?.startsWith('#')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-heading font-bold tracking-wide transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${LINKS.live?.startsWith('#')
                  ? 'bg-slate-800/60 border border-slate-700 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-cyan-500 to-sky-500 text-slate-950 hover:shadow-[0_0_28px_rgba(0,240,255,0.45)] hover:scale-[1.03] active:scale-[0.97]'
                  }`}
              >
                <ExternalLink className="w-4 h-4" />
                LIVE PROJECT
                {LINKS.live?.startsWith('#') && <span className="text-[10px] font-mono ml-1 opacity-60">(URL pending)</span>}
              </button>

              {/* VIEW CASE STUDY */}
              <button
                onClick={openCaseStudy}
                onMouseEnter={() => soundFx.playHover()}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-heading font-bold tracking-wide bg-slate-800/80 border border-slate-700 text-white hover:border-cyan-500/60 hover:bg-slate-700/80 transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <BookOpen className="w-4 h-4 text-cyan-400" />
                VIEW CASE STUDY
              </button>

              {/* GITHUB */}
              <button
                onClick={() => handleLink(LINKS.github)}
                onMouseEnter={() => soundFx.playHover()}
                disabled={LINKS.github?.startsWith('#')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-heading font-bold tracking-wide transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${LINKS.github?.startsWith('#')
                  ? 'bg-slate-800/60 border border-slate-700 text-slate-500 cursor-not-allowed'
                  : 'bg-slate-800 border border-slate-600 text-white hover:border-violet-500/60 hover:bg-slate-700'
                  }`}
              >
                <GitBranch className="w-4 h-4" />
                GITHUB
                {LINKS.github?.startsWith('#') && <span className="text-[10px] font-mono ml-1 opacity-60">(URL pending)</span>}
              </button>
            </motion.div>
          </div>

          {/* ── 3D Showcase + Features split ── */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">

            {/* 3D Showcase */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.65 }}
              className="xl:col-span-7 relative rounded-2xl overflow-hidden border border-slate-800/80 bg-slate-950/70 backdrop-blur-sm shadow-2xl group"
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent" />

              {/* Fake terminal bar */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-800/60">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-[11px] font-mono text-slate-500">gymsaathi — platform-overview.3d</span>
                </div>
                <span className="text-[10px] font-mono text-cyan-400/70 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Interactive
                </span>
              </div>

              {/* Corner glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at top right, rgba(0,240,255,0.06) 0%, transparent 60%)' }}
              />

              <GymSaathi3DShowcase />
            </motion.div>

            {/* Features grid */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: 0.12 }}
              className="xl:col-span-5 space-y-3"
            >
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-heading font-bold text-slate-200 uppercase tracking-wider">
                  Platform Features
                </h3>
              </div>

              {FEATURES.map((f, i) => (
                <FeatureCard key={i} feature={f} index={i} />
              ))}

              {/* Architecture flow line */}
              <div className="mt-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800/60 font-mono text-[11px] space-y-2">
                <div className="flex items-center justify-between text-slate-500 text-[10px] uppercase tracking-wider">
                  <span>Request Flow</span>
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Active
                  </span>
                </div>
                <code className="text-cyan-400/80 text-[10px] leading-relaxed block">
                  React UI → Express API → MongoDB → WhatsApp Integration
                </code>
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* Case Study Modal */}
      <AnimatePresence>
        {caseStudyOpen && <CaseStudyModal onClose={closeCaseStudy} />}
      </AnimatePresence>
    </>
  );
};

export default MainProjectSection;
