import React from 'react';
import { motion } from 'framer-motion';
import { soundFx } from '../../utils/soundEffects';

export const GlassCard = ({ children, className = '', hoverGlow = true, delay = 0, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => soundFx.playHover()}
      onClick={() => {
        if (onClick) {
          soundFx.playClick();
          onClick();
        }
      }}
      className={`glass-panel rounded-2xl p-6 relative overflow-hidden transition-all duration-300 ${
        hoverGlow ? 'hover:border-cyanGlow/40 hover:shadow-[0_0_30px_rgba(0,240,255,0.12)]' : ''
      } ${className}`}
    >
      {/* Corner accent lights */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-cyanGlow/5 rounded-full blur-2xl pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};
