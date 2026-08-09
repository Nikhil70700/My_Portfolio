import React from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  ArrowRight,
  Sparkles,
  MapPin,
  Download,
  Eye
} from 'lucide-react';
import { personalInfo } from '../../data/portfolioData';
import { soundFx } from '../../utils/soundEffects';
import { Hero3DScene } from '../3d/Hero3DScene';

export const HeroSection = ({ _onOpenCommand }) => {

  const scrollToWork = () => {
    soundFx.playClick();
    const target = document.getElementById('project') || document.getElementById('main-project');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadResume = () => {
    soundFx.playClick();

    // Resume download handler
    const resumeUrl = personalInfo.resume && personalInfo.resume !== '#download-resume'
      ? personalInfo.resume
      : '/resume.pdf';

    // Create anchor and trigger download
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Nikhil_Kumar_Pandey_Resume.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Staggered Animation Sequence Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }
    }
  };

  const sceneVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, delay: 0.2, ease: "easeOut" }
    }
  };

  return (
    <section id="hero" className="relative min-h-[92vh] pt-28 pb-16 flex items-center justify-center overflow-hidden">

      {/* Ambient Radial Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyanGlow/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-blueGlow/10 rounded-full blur-[160px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">

        {/* Main Hero Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Left Column: Text & CTAs (7 Cols on Desktop) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-6 text-center lg:text-left pt-4 lg:pt-0"
          >

            {/* Live Availability Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-panel border-cyanGlow/30 text-xs font-medium text-gray-300 shadow-[0_0_20px_rgba(0,240,255,0.15)]">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emeraldGlow opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emeraldGlow"></span>
                </span>
                <span className="tracking-wide">Available for Full-Time Software & Full-Stack Roles</span>
                <span className="text-gray-500 hidden sm:inline">|</span>
                <span className="hidden sm:flex items-center gap-1 text-gray-400">
                  <MapPin className="w-3.5 h-3.5 text-cyanGlow" />
                  {personalInfo.location}
                </span>
              </div>
            </motion.div>

            {/* Step 3: Name Reveal */}
            <motion.div variants={itemVariants}>
              <h1 className="text-4xl sm:text-6xl lg:text-6xl xl:text-7xl font-heading font-black tracking-tight uppercase">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-gray-300 drop-shadow-[0_0_35px_rgba(0,240,255,0.25)]">
                  NIKHIL KUMAR PANDEY
                </span>
              </h1>
            </motion.div>

            {/* Step 4: Professional Title Reveal */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyanGlow/10 border border-cyanGlow/30">
                <Sparkles className="w-4 h-4 text-cyanGlow animate-spin-slow" />
                <h2 className="text-base sm:text-xl md:text-2xl font-heading font-bold text-cyanGlow tracking-widest uppercase">
                  SOFTWARE DEVELOPER
                </h2>
              </div>
            </motion.div>

            {/* Step 5: Description Reveal */}
            <motion.div variants={itemVariants}>
              <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans font-normal">
                "Building responsive, scalable and user-focused web applications across frontend, backend and full-stack development."
              </p>
            </motion.div>

            {/* Step 6: CTA Buttons Reveal */}
            <motion.div variants={itemVariants} className="pt-2">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">

                {/* Primary Button: VIEW MY WORK */}
                <button
                  onClick={scrollToWork}
                  onMouseEnter={() => soundFx.playHover()}
                  className="px-7 py-4 rounded-xl bg-gradient-to-r from-cyanGlow via-cyan-400 to-blueGlow text-obsidian-950 font-heading font-extrabold text-sm tracking-wider uppercase hover:shadow-[0_0_35px_rgba(0,240,255,0.6)] hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 flex items-center gap-2.5 group cursor-pointer"
                >
                  <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>VIEW MY WORK</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Secondary Button: DOWNLOAD RESUME */}
                <button
                  onClick={handleDownloadResume}
                  onMouseEnter={() => soundFx.playHover()}
                  className="px-7 py-4 rounded-xl glass-panel hover:border-cyanGlow/60 text-white font-heading font-bold text-sm tracking-wider uppercase hover:bg-white/10 hover:shadow-[0_0_25px_rgba(0,240,255,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center gap-2.5 group cursor-pointer"
                >
                  <Download className="w-4 h-4 text-cyanGlow group-hover:translate-y-0.5 transition-transform" />
                  <span>DOWNLOAD RESUME</span>
                </button>

              </div>
            </motion.div>

            {/* Step 7: Additional Links (Social Links Reveal) */}
            <motion.div variants={itemVariants} className="pt-4">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-5 pt-3 border-t border-gray-800/80">
                <span className="text-xs font-mono uppercase tracking-widest text-gray-400">
                  Connect:
                </span>

                {/* GitHub Link */}
                <a
                  href={personalInfo.github || "https://github.com/nikhilpandey829"}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFx.playClick()}
                  onMouseEnter={() => soundFx.playHover()}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-lg glass-panel hover:border-cyanGlow/50 text-gray-300 hover:text-cyanGlow text-xs font-mono transition-all group"
                >
                  <svg className="w-4 h-4 text-cyanGlow group-hover:scale-110 transition-transform fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  <span>GitHub</span>
                </a>

                {/* LinkedIn Link */}
                <a
                  href={personalInfo.linkedin || "https://linkedin.com/in/nikhilkumar-pandey"}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFx.playClick()}
                  onMouseEnter={() => soundFx.playHover()}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-lg glass-panel hover:border-cyanGlow/50 text-gray-300 hover:text-cyanGlow text-xs font-mono transition-all group"
                >
                  <svg className="w-4 h-4 text-cyanGlow group-hover:scale-110 transition-transform fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26z" />
                  </svg>
                  <span>LinkedIn</span>
                </a>

                {/* Email Link */}
                <a
                  href={`mailto:${personalInfo.email}`}
                  onClick={() => soundFx.playClick()}
                  onMouseEnter={() => soundFx.playHover()}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-lg glass-panel hover:border-cyanGlow/50 text-gray-300 hover:text-cyanGlow text-xs font-mono transition-all group"
                >
                  <Mail className="w-4 h-4 text-cyanGlow group-hover:scale-110 transition-transform" />
                  <span>Email</span>
                </a>

              </div>
            </motion.div>

          </motion.div>

          {/* Right Column: 3D Developer Environment (5 Cols on Desktop, Step 2 reveal) */}
          <motion.div
            variants={sceneVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-5 relative flex items-center justify-center order-first lg:order-last"
          >
            {/* FIX: explicit height instead of h-full. The parent grid row
                uses items-center and sizes to content, so h-full (100%)
                here was resolving against an effectively auto/0 height
                ancestor and collapsing — which both misaligned this column
                against the text column's natural height and left the
                absolute-positioned glow halo below with nothing to fill. */}
            <div className="w-full h-[380px] sm:h-[440px] lg:h-[480px] relative">
              {/* Outer Glow Halo behind 3D Scene */}
              <div className="absolute inset-0 bg-gradient-to-tr from-cyanGlow/20 to-blueGlow/20 rounded-full blur-3xl opacity-40 pointer-events-none" />
              <Hero3DScene />
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default HeroSection;