import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2, Coffee, FileCode, Database, Atom, Wind, Grid, FileJson,
  Server, HardDrive, Globe, Sparkles, Bot, Terminal, Layout, Palette,
  Grid3x3, Globe2
} from 'lucide-react';
import { technicalProfile } from '../../data/portfolioData';
import { soundFx } from '../../utils/soundEffects';
import { TechUniverse3D } from '../3d/TechUniverse3D';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const iconMap = {
  Coffee: Coffee,
  Code2: Code2,
  FileCode: FileCode,
  Database: Database,
  Atom: Atom,
  Wind: Wind,
  Grid: Grid,
  FileJson: FileJson,
  Server: Server,
  HardDrive: HardDrive,
  Globe: Globe,
  Sparkles: Sparkles,
  Bot: Bot,
  Terminal: Terminal,
  Layout: Layout,
  Palette: Palette,
};

/** Detect WebGL availability */
function canUseWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

/** Detect if user prefers reduced motion */
function prefersReducedMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
}

/** Coarse device-capability check — avoids 3D on clearly low-power devices */
function isLikelyLowPower() {
  const nav = navigator;
  const cores = nav.hardwareConcurrency ?? 4;
  // Treat single/dual core as likely low-power; mobile browsers report 4+ for mid-range
  return cores <= 2;
}

// ─── Category pill tabs ───────────────────────────────────────────────────────

const CATEGORIES = ['All', 'Programming', 'Frontend', 'Backend', 'Database', 'CMS', 'AI'];

// ─── 2D Polished Grid (standalone, keyboard accessible) ───────────────────────

function TechGrid2D({ allSkills, activeCategory, selectedSkill, onSelect }) {
  const filtered = activeCategory === 'All'
    ? allSkills
    : allSkills.filter(s => s.category === activeCategory);

  return (
    <motion.div
      layout
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3"
    >
      <AnimatePresence mode="popLayout">
        {filtered.map((skill, idx) => {
          const Icon = iconMap[skill.icon] ?? Code2;
          const isSelected = selectedSkill?.name === skill.name;

          return (
            <motion.button
              key={skill.name}
              layout
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.88 }}
              transition={{ duration: 0.22, delay: idx * 0.025 }}
              onClick={() => {
                soundFx.playClick();
                onSelect(isSelected ? null : skill);
              }}
              onMouseEnter={() => {
                soundFx.playHover();
                onSelect(skill);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  soundFx.playClick();
                  onSelect(isSelected ? null : skill);
                }
              }}
              aria-pressed={isSelected}
              aria-label={`${skill.name}: ${skill.description}`}
              className={`relative flex flex-col items-center gap-2 p-4 rounded-xl text-center transition-all duration-200 border cursor-pointer outline-none
                focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950
                ${isSelected
                  ? 'bg-sky-500/15 border-sky-400/70 shadow-[0_0_18px_rgba(56,189,248,0.25)]'
                  : 'bg-slate-900/60 border-slate-800/70 hover:bg-slate-800/80 hover:border-slate-600'
                }`}
            >
              {/* Category colour dot */}
              <span
                className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full opacity-75"
                style={{ backgroundColor: skill.color }}
              />

              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${isSelected ? 'bg-sky-500/25' : 'bg-slate-800/80'
                  }`}
              >
                <Icon className="w-5 h-5" style={{ color: skill.color }} />
              </div>

              <span className="text-xs font-semibold text-slate-200 leading-snug">
                {skill.name}
              </span>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                {skill.category}
              </span>
            </motion.button>
          );
        })}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Inspector panel (description card) ──────────────────────────────────────

function SkillInspector({ skill }) {
  const Icon = skill ? (iconMap[skill.icon] ?? Code2) : null;

  return (
    <div className="min-h-[80px]">
      <AnimatePresence mode="wait">
        {skill ? (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="flex items-start gap-3 p-4 rounded-xl bg-slate-900/80 border border-slate-700/60 backdrop-blur-sm shadow-lg"
            role="status"
            aria-live="polite"
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
              style={{ backgroundColor: `${skill.color}22` }}
            >
              <Icon className="w-4.5 h-4.5" style={{ color: skill.color }} />
            </div>
            <div className="space-y-0.5 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-heading font-bold text-white">{skill.name}</span>
                <span
                  className="text-[10px] font-mono px-2 py-0.5 rounded-full border"
                  style={{ color: skill.color, borderColor: `${skill.color}55`, backgroundColor: `${skill.color}18` }}
                >
                  {skill.category}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{skill.description}</p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center h-[80px] rounded-xl border border-dashed border-slate-800/60 text-slate-500 text-xs font-mono"
            aria-live="polite"
          >
            Hover or select a technology to see details
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export const TechStackSection = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [viewMode, setViewMode] = useState('auto'); // 'auto' | '3d' | '2d'

  // FIX: track viewport width reactively (matchMedia + change listener),
  // not just once at mount. Previously `use3D` was a useMemo with no
  // resize awareness at all, so rotating a device or resizing a window
  // never re-evaluated whether 3D still made sense.
  const [isNarrowViewport, setIsNarrowViewport] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 768
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(max-width: 767px)');
    const handleChange = (e) => setIsNarrowViewport(e.matches);
    // Some older browsers only support addListener/removeListener
    if (mq.addEventListener) mq.addEventListener('change', handleChange);
    else mq.addListener(handleChange);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', handleChange);
      else mq.removeListener(handleChange);
    };
  }, []);

  // Resolve whether to actually show 3D based on env + user toggle
  const use3D = useMemo(() => {
    if (viewMode === '2d') return false;
    if (viewMode === '3d') return true; // explicit user override always wins
    // Auto mode: the 3D universe is driven entirely by hover — there's no
    // hover on touch devices, and the floating labels + small orbiting
    // spheres are hard to read on a phone-sized screen anyway. So default
    // to the 2D grid on narrow viewports regardless of GPU capability;
    // a capable phone can still opt in via the manual 3D toggle.
    if (isNarrowViewport) return false;
    return canUseWebGL() && !prefersReducedMotion() && !isLikelyLowPower();
  }, [viewMode, isNarrowViewport]);

  // Flatten skills with category color for 3D nodes
  const allSkills = useMemo(() =>
    technicalProfile.flatMap(cat =>
      cat.skills.map(s => ({ ...s, category: cat.category, color: cat.color }))
    ), []
  );

  const handleHover3D = useCallback((name) => {
    if (name === null) {
      setHoveredSkill(null);
      setSelectedSkill(null);
    } else {
      const found = allSkills.find(s => s.name === name) ?? null;
      setHoveredSkill(name);
      setSelectedSkill(found);
    }
  }, [allSkills]);

  const handleSelect2D = useCallback((skill) => {
    setSelectedSkill(skill);
  }, []);

  const handleCategoryChange = useCallback((cat) => {
    soundFx.playClick();
    setActiveCategory(cat);
    setSelectedSkill(null);
    setHoveredSkill(null);
  }, []);

  const displayedSkill = selectedSkill ?? (hoveredSkill ? allSkills.find(s => s.name === hoveredSkill) ?? null : null);

  // Category color for header accent
  const activeCatColor = useMemo(() => {
    if (activeCategory === 'All') return '#38BDF8';
    return technicalProfile.find(c => c.category === activeCategory)?.color ?? '#38BDF8';
  }, [activeCategory]);

  return (
    <section id="skills" className="py-24 relative z-10 overflow-hidden">
      {/* Subtle ambient background gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section header ── */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-xs font-mono text-sky-400 uppercase tracking-wider"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Technical Skills</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-white tracking-tight"
          >
            Technologies{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-violet-400">
              I Work With
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="text-slate-400 text-sm sm:text-base"
          >
            17 technologies across 6 categories drawn directly from my CV.
          </motion.p>
        </div>

        {/* ── Controls row: category tabs + 3D/2D toggle ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="flex flex-wrap items-center justify-between gap-3 mb-8"
        >
          {/* Category filter tabs */}
          <div
            className="flex flex-wrap gap-2"
            role="tablist"
            aria-label="Technology category filter"
          >
            {CATEGORIES.map(cat => {
              const catColor = cat === 'All' ? '#38BDF8' :
                technicalProfile.find(c => c.category === cat)?.color ?? '#38BDF8';
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleCategoryChange(cat)}
                  onMouseEnter={() => soundFx.playHover()}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 border outline-none
                    focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950
                    ${isActive
                      ? 'text-white border-transparent shadow-md'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-600'
                    }`}
                  style={isActive ? {
                    backgroundColor: `${catColor}22`,
                    borderColor: `${catColor}66`,
                    color: catColor,
                    boxShadow: `0 0 14px ${catColor}33`,
                  } : {}}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* View mode toggle */}
          <div className="flex items-center gap-1 bg-slate-900/60 border border-slate-800 rounded-xl p-1">
            <button
              onClick={() => setViewMode(viewMode === '3d' ? 'auto' : '3d')}
              onMouseEnter={() => soundFx.playHover()}
              aria-pressed={use3D}
              title="3D Universe view"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all outline-none
                focus-visible:ring-2 focus-visible:ring-sky-400
                ${use3D
                  ? 'bg-slate-700/80 text-sky-300 shadow-inner'
                  : 'text-slate-500 hover:text-slate-300'
                }`}
            >
              <Globe2 className="w-3.5 h-3.5" />
              3D
            </button>
            <button
              onClick={() => setViewMode(viewMode === '2d' ? 'auto' : '2d')}
              onMouseEnter={() => soundFx.playHover()}
              aria-pressed={!use3D}
              title="2D Grid view"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all outline-none
                focus-visible:ring-2 focus-visible:ring-sky-400
                ${!use3D
                  ? 'bg-slate-700/80 text-sky-300 shadow-inner'
                  : 'text-slate-500 hover:text-slate-300'
                }`}
            >
              <Grid3x3 className="w-3.5 h-3.5" />
              2D
            </button>
          </div>
        </motion.div>

        {/* ── Active category label ── */}
        <AnimatePresence mode="wait">
          {activeCategory !== 'All' && (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.2 }}
              className="mb-6 flex items-center gap-2"
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: activeCatColor }}
              />
              <span className="text-xs font-mono uppercase tracking-widest" style={{ color: activeCatColor }}>
                {activeCategory}
              </span>
              <span className="text-xs text-slate-500 font-mono">
                — {activeCategory === 'All' ? allSkills.length : allSkills.filter(s => s.category === activeCategory).length} technologies
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Main content area ── */}
        {use3D ? (
          /* 3D Universe layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* 3D Canvas */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-8 relative rounded-2xl overflow-hidden border border-slate-800/70 bg-slate-950/60 backdrop-blur-sm shadow-2xl min-h-[420px] sm:min-h-[520px]"
            >
              <TechUniverse3D
                allSkills={allSkills}
                activeCategory={activeCategory}
                hoveredSkill={hoveredSkill}
                onHover={handleHover3D}
              />
            </motion.div>

            {/* Sidebar: inspector + category summary */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="lg:col-span-4 space-y-5"
            >
              {/* Inspector panel */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">
                  Technology Inspector
                </h3>
                <SkillInspector skill={displayedSkill} />
              </div>

              {/* Category skill list */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">
                  {activeCategory === 'All' ? 'All Technologies' : `${activeCategory} Skills`}
                </h3>
                <div className="space-y-1">
                  {(activeCategory === 'All' ? allSkills : allSkills.filter(s => s.category === activeCategory)).map(skill => {
                    const isSelected = displayedSkill?.name === skill.name;
                    return (
                      <button
                        key={skill.name}
                        onClick={() => {
                          soundFx.playClick();
                          handleHover3D(isSelected ? null : skill.name);
                        }}
                        onMouseEnter={() => {
                          soundFx.playHover();
                          handleHover3D(skill.name);
                        }}
                        onMouseLeave={() => handleHover3D(null)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleHover3D(isSelected ? null : skill.name);
                          }
                        }}
                        aria-pressed={isSelected}
                        aria-label={`${skill.name}: ${skill.description}`}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-xs transition-all outline-none
                          focus-visible:ring-2 focus-visible:ring-sky-400
                          ${isSelected
                            ? 'bg-slate-800/80 border border-slate-600/60'
                            : 'hover:bg-slate-800/50 border border-transparent'
                          }`}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: skill.color }}
                        />
                        <span className="text-slate-300 font-medium">{skill.name}</span>
                        <span className="text-slate-600 ml-auto font-mono">{skill.category}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        ) : (
          /* 2D Grid layout */
          <div className="space-y-6">
            {/* Skill inspector above the grid */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <SkillInspector skill={displayedSkill} />
            </motion.div>

            <TechGrid2D
              allSkills={allSkills}
              activeCategory={activeCategory}
              selectedSkill={displayedSkill}
              onSelect={handleSelect2D}
            />
          </div>
        )}

      </div>
    </section>
  );
};

export default TechStackSection;