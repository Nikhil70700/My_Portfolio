import React, { useState, useRef } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Briefcase, Calendar, MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import { experiences } from '../../data/portfolioData';
import { soundFx } from '../../utils/soundEffects';

// ─── Animated timeline line that fills on scroll ──────────────────────────────

function TimelineLine({ containerRef }) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 20%'],
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 overflow-visible pointer-events-none">
      {/* Static dim track */}
      <div className="absolute inset-0 bg-slate-800/60" />
      {/* Animated fill */}
      <motion.div
        className="absolute top-0 left-0 right-0 origin-top"
        style={{
          scaleY,
          height: '100%',
          background: 'linear-gradient(to bottom, #00F0FF, #38BDF8, #8B5CF6)',
        }}
      />
    </div>
  );
}

// ─── Dot on the timeline ──────────────────────────────────────────────────────

function TimelineDot({ color, isActive }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-20% 0px' });

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : {}}
      transition={{ duration: 0.45, delay: 0.1, type: 'spring', stiffness: 200 }}
      className="absolute left-6 md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center"
    >
      {/* Outer pulse ring */}
      {isActive && (
        <motion.div
          className="absolute w-10 h-10 rounded-full"
          style={{ backgroundColor: `${color}22`, border: `1.5px solid ${color}66` }}
          animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
      {/* Inner dot */}
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center border-2 bg-slate-950 shadow-lg"
        style={{ borderColor: color, boxShadow: `0 0 14px ${color}55` }}
      >
        <Briefcase className="w-3 h-3" style={{ color }} />
      </div>
    </motion.div>
  );
}

// ─── Tech tag pill ────────────────────────────────────────────────────────────

function TechTag({ tag, color, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10px' });

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, scale: 0.8, y: 8 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.28, delay }}
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-mono border transition-all cursor-default select-none hover:brightness-110"
      style={{
        backgroundColor: `${color}14`,
        borderColor: `${color}44`,
        color: `${color}dd`,
      }}
    >
      {tag}
    </motion.span>
  );
}

// ─── Individual Experience Card ───────────────────────────────────────────────

function ExperienceCard({ exp, index }) {
  const [expanded, setExpanded] = useState(index === 0);
  const cardRef = useRef(null);
  const inView = useInView(cardRef, { once: true, margin: '-80px 0px' });
  const isLeft = index % 2 === 0; // alternating sides on desktop

  const cardVariants = {
    hidden: {
      opacity: 0,
      x: isLeft ? -48 : 48,
      rotateY: isLeft ? -6 : 6,
    },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: { duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 gap-0 min-h-[32px]">

      {/* Date stamp — opposite side of card on desktop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.25 }}
        className={`hidden md:flex flex-col items-end justify-center pr-10 pb-8 pt-2 ${isLeft ? 'order-2' : 'order-1'}`}
      >
        <div
          className="text-xs font-mono font-semibold tracking-widest uppercase"
          style={{ color: exp.accentColor }}
        >
          {exp.durationShort}
        </div>
        <div className="text-[11px] text-slate-500 font-mono mt-0.5 flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          {exp.location}
        </div>
      </motion.div>

      {/* Timeline dot — sits on the central line */}
      <TimelineDot color={exp.accentColor} isActive={index === 0} index={index} />

      {/* The card itself */}
      <motion.div
        ref={cardRef}
        variants={cardVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className={`relative ${isLeft ? 'order-1 md:pr-10' : 'order-2 md:pl-10'} pl-14 md:pl-0 pb-12`}
        style={{ perspective: '900px' }}
      >
        <div
          className="relative rounded-2xl bg-slate-900/70 border backdrop-blur-sm overflow-hidden group hover:shadow-2xl transition-all duration-300"
          style={{
            borderColor: `${exp.accentColor}30`,
            boxShadow: `0 4px 30px ${exp.accentColor}08`,
          }}
          onMouseEnter={() => soundFx.playHover()}
        >
          {/* Accent top border */}
          <div
            className="absolute top-0 left-0 right-0 h-0.5"
            style={{ background: `linear-gradient(to right, transparent, ${exp.accentColor}, transparent)` }}
          />

          {/* Subtle corner glow on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
            style={{ background: `radial-gradient(ellipse at top left, ${exp.accentColor}10 0%, transparent 60%)` }}
          />

          <div className="p-5 sm:p-6 space-y-4">

            {/* Header */}
            <div className="space-y-2">
              {/* Type badge + date (mobile shows date here) */}
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold border"
                  style={{
                    backgroundColor: `${exp.accentColor}18`,
                    borderColor: `${exp.accentColor}55`,
                    color: exp.accentColor,
                  }}
                >
                  {exp.type}
                </span>
                <span className="flex items-center gap-1 text-[11px] font-mono text-slate-500 md:hidden">
                  <Calendar className="w-3 h-3" />
                  {exp.durationShort}
                </span>
              </div>

              {/* Role */}
              <h3 className="text-base sm:text-lg font-heading font-extrabold text-white leading-snug">
                {exp.role}
              </h3>

              {/* Company + location */}
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
                <span className="font-semibold" style={{ color: exp.accentColor }}>
                  {exp.company}
                </span>
                <span className="text-slate-600 hidden md:inline">•</span>
                <span className="text-slate-400 text-xs flex items-center gap-1 md:hidden">
                  <MapPin className="w-3 h-3" />
                  {exp.location}
                </span>
              </div>
            </div>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-1.5">
              {exp.techTags.map((tag, tIdx) => (
                <TechTag
                  key={tag}
                  tag={tag}
                  color={exp.accentColor}
                  delay={tIdx * 0.04 + 0.1}
                />
              ))}
            </div>

            {/* Responsibilities — expandable */}
            <div>
              <button
                onClick={() => {
                  soundFx.playClick();
                  setExpanded(e => !e);
                }}
                className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-slate-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded"
                aria-expanded={expanded}
              >
                {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                {expanded ? 'Hide details' : 'Show responsibilities'}
              </button>

              <AnimatePresence initial={false}>
                {expanded && (
                  <motion.ul
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden mt-3 space-y-2"
                  >
                    {exp.responsibilities.map((resp, rIdx) => (
                      <motion.li
                        key={rIdx}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.25, delay: rIdx * 0.06 }}
                        className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed"
                      >
                        <span
                          className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: exp.accentColor }}
                        />
                        {resp}
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </motion.div>

    </div>
  );
}



// ─── Main Section ─────────────────────────────────────────────────────────────

export const ExperienceSection = () => {
  const containerRef = useRef(null);

  return (
    <section id="experience" className="py-24 relative z-10 overflow-hidden">

      {/* Ambient gradients */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-violet-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section header ── */}
        <div className="text-center mb-16 space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-400 uppercase tracking-wider"
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Professional Journey</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-white tracking-tight"
          >
            Professional{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">
              Journey
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto"
          >
            Hands-on experience across SaaS development, full-stack engineering, and WordPress solutions.
          </motion.p>

          {/* Factual Focus Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: 0.22 }}
            className="flex flex-wrap justify-center gap-2 pt-4"
          >
            {['Software Development', 'Full-Stack Engineering', 'SaaS Platform Development'].map((pill, pIdx) => (
              <span
                key={pIdx}
                className="px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/80 text-xs font-mono text-cyan-300 backdrop-blur-sm"
              >
                {pill}
              </span>
            ))}
          </motion.div>
        </div>

        {/* ── Animated vertical timeline ── */}
        <div ref={containerRef} className="relative transform-gpu rotate-y-3" style={{ perspective: '1200px' }}>
          {/* Scrolling timeline line */}
          <TimelineLine containerRef={containerRef} />

          {/* Experience cards */}
          <div className="space-y-0">
            {experiences.map((exp, idx) => (
              <ExperienceCard key={idx} exp={exp} index={idx} />
            ))}
          </div>

          {/* Timeline end cap */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: '-10px' }}
            transition={{ duration: 0.4, delay: 0.2, type: 'spring' }}
            className="absolute left-6 md:left-1/2 bottom-0 -translate-x-1/2 w-4 h-4 rounded-full bg-slate-800 border-2 border-slate-600 z-20"
          />
        </div>

      </div>
    </section>
  );
};

export default ExperienceSection;
