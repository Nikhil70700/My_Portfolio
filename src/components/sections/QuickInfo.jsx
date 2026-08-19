import React from 'react';
import { ArrowRight, Download, Mail } from 'lucide-react';
import { personalInfo } from '../../data/portfolioData';

export const QuickInfo = () => {
  const coreTech = ['React.js', 'JavaScript', 'Node.js', 'Express.js', 'MongoDB', 'MySQL'];

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = personalInfo.resume || '/resume.pdf';
    link.download = 'Nikhil_Kumar_Pandey_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="relative py-12 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-gradient mb-2">
          NIKHIL KUMAR PANDEY
        </h2>
        <p className="text-xl text-gray-300 mb-4">Software Developer</p>
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {coreTech.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 bg-cyanGlow/15 border border-cyanGlow/30 rounded-full text-cyanGlow text-xs font-mono"
            >
              {tech}
            </span>
          ))}
        </div>
        <p className="text-gray-400 mb-6">
          Primary Project: <strong>GymSaathi</strong> – Gym Management &amp; Member Engagement Platform
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => scrollTo('project')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyanGlow to-violetGlow text-obsidian-950 font-medium hover:opacity-90 transition"
          >
            <ArrowRight className="w-4 h-4" /> VIEW PROJECTS
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl glass-panel hover:border-cyanGlow/40 text-white font-medium"
          >
            <Download className="w-4 h-4" /> DOWNLOAD RESUME
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800/70 border border-slate-600 text-gray-200 hover:bg-slate-700 transition"
          >
            <Mail className="w-4 h-4" /> CONTACT ME
          </button>
        </div>
      </div>
    </section>
  );
};
