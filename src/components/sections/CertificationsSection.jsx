import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldCheck } from 'lucide-react';
import { certifications } from '../../data/portfolioData';
import { soundFx } from '../../utils/soundEffects';

// Interactive 3D tilt certificate card
function CertificateCard({ cert, index }) {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotateX(((y - centerY) / centerY) * -10);
    setRotateY(((x - centerX) / centerX) * 10);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => soundFx.playHover()}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.15s ease-out',
      }}
      className="relative flex flex-col justify-between p-7 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-950/90 border border-slate-800 hover:border-cyan-500/60 shadow-xl hover:shadow-[0_12px_40px_rgba(0,240,255,0.12)] transition-colors group overflow-hidden"
    >
      {/* Accent corner glow */}
      <div className="absolute -top-16 -right-16 w-36 h-36 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-colors pointer-events-none" />

      {/* Top row: Badge & Issuer */}
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            {cert.badge}
          </span>
          <span className="text-xs font-mono text-cyan-400 font-medium tracking-wide">
            {cert.issuer}
          </span>
        </div>

        {/* Certificate Title */}
        <div className="pt-2">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-105 transition-transform">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-white group-hover:text-cyan-300 transition-colors leading-snug">
            {cert.title}
          </h3>
        </div>
      </div>

      {/* Bottom details */}
      <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
        <span>Provider: <strong className="text-slate-200">{cert.issuer}</strong></span>
        <span className="text-cyan-400">{cert.type}</span>
      </div>
    </motion.div>
  );
}

export const CertificationsSection = () => {
  return (
    <section id="certifications" className="py-24 relative z-10 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-violet-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-400 uppercase tracking-wider"
          >
            <Award className="w-3.5 h-3.5" />
            <span>Verified Credentials</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-white tracking-tight"
          >
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">Certifications</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-slate-400 text-sm sm:text-base"
          >
            Credentials in Java Programming and Data Structures awarded by Coding Ninjas.
          </motion.p>
        </div>

        {/* 2 Focused High-End Certificate Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {certifications.map((cert, idx) => (
            <CertificateCard key={idx} cert={cert} index={idx} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default CertificationsSection;
