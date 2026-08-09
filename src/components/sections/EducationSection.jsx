import React from 'react';
import { GraduationCap, Award, Calendar, MapPin, CheckCircle2, ShieldCheck, BookOpen } from 'lucide-react';
import { education, certifications } from '../../data/portfolioData';
import { GlassCard } from '../ui/GlassCard';

export const EducationSection = () => {
  return (
    <section id="education" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border-cyanGlow/30 text-xs font-mono text-cyanGlow uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic & Verified Training</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-gradient">
            Education & Industry Certifications
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Formal computer science degree qualifications combined with rigorous Java algorithm & data structures certifications.
          </p>
        </div>

        {/* Two-Column Grid: Education on Left, Certifications on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Academic Education Timeline */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-cyanGlow" />
              <h3 className="text-xl font-heading font-bold text-white">
                Academic Background
              </h3>
            </div>

            <div className="space-y-4">
              {education.map((edu, idx) => (
                <GlassCard key={idx} delay={idx * 0.08} className="p-6 space-y-3 hover:border-cyanGlow/40">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="px-2.5 py-0.5 rounded-md bg-cyanGlow/10 border border-cyanGlow/30 text-cyanGlow font-mono text-[11px] font-semibold">
                        {edu.badge}
                      </span>
                      <h4 className="text-base sm:text-lg font-heading font-bold text-white mt-2">
                        {edu.degree}
                      </h4>
                      <p className="text-sm font-semibold text-gray-300 mt-0.5">
                        {edu.institution}
                      </p>
                    </div>

                    <div className="text-right font-mono text-xs text-gray-400 shrink-0">
                      <div className="flex items-center gap-1 justify-end">
                        <Calendar className="w-3.5 h-3.5 text-cyanGlow" />
                        <span>{edu.duration}</span>
                      </div>
                      <div className="flex items-center gap-1 justify-end mt-1 text-[11px]">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        <span>{edu.location}</span>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>

          {/* Right Column: Verified Certifications */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-cyanGlow" />
              <h3 className="text-xl font-heading font-bold text-white">
                Verified Certifications
              </h3>
            </div>

            <div className="space-y-4">
              {certifications.map((cert, idx) => (
                <GlassCard key={idx} delay={0.2 + idx * 0.1} className="p-6 space-y-4 border-cyanGlow/30 hover:border-cyanGlow">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-emeraldGlow/10 border border-emeraldGlow/30 text-emeraldGlow font-mono text-[11px] font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {cert.badge}
                    </span>
                    <span className="text-xs font-mono text-gray-400">
                      {cert.issuer}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-base font-heading font-extrabold text-white">
                      {cert.title}
                    </h4>
                    <p className="text-xs text-gray-300 mt-2 leading-relaxed">
                      {cert.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-cyanGlow font-mono">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyanGlow" />
                      Coding Ninjas Academy
                    </span>
                    <span>Verified Credential</span>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
