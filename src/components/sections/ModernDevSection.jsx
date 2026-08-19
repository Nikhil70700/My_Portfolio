import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import ModernDevPipeline from '../3d/ModernDevPipeline';
import { soundFx } from '../../utils/soundEffects';

const aiSkills = [
  'Generative AI',
  'Agentic AI',
  'Prompt Engineering',
  'AI-assisted development',
];

export const ModernDevSection = () => (
  <section id="modern-development" className="py-24 relative z-10 overflow-hidden">
    {/* Ambient background glow */}
    <div className="absolute top-1/2 right-1/3 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-[160px] pointer-events-none" />

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-400 uppercase tracking-wider"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI-Assisted Engineering</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-white tracking-tight"
        >
          Building With <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">Modern Development</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto"
        >
          I leverage AI-assisted development tools and modern workflows to accelerate development, streamline debugging, and engineer practical software solutions.
        </motion.p>

        {/* AI Skill Badges */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 pt-2"
        >
          {aiSkills.map((skill, i) => (
            <span
              key={i}
              onMouseEnter={() => soundFx.playHover()}
              className="px-3 py-1 rounded-xl bg-slate-900/80 border border-cyan-500/30 text-xs font-mono text-cyan-300 backdrop-blur-sm"
            >
              {skill}
            </span>
          ))}
        </motion.div>
      </div>

      {/* 3D Animated Pipeline Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6 }}
        className="relative rounded-2xl overflow-hidden border border-slate-800/80 bg-slate-950/60 backdrop-blur-sm shadow-2xl p-2 sm:p-4"
      >
        <ModernDevPipeline />
      </motion.div>

    </div>
  </section>
);

export default ModernDevSection;
