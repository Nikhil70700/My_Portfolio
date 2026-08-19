import React, { useState } from 'react';
import { DynamicBackgroundCanvas } from './components/3d/DynamicBackgroundCanvas';
import { Navbar } from './components/layout/Navbar';
import { CommandPalette } from './components/layout/CommandPalette';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { TechStackSection } from './components/sections/TechStackSection';
import { MainProjectSection } from './components/sections/MainProjectSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { EducationSection } from './components/sections/EducationSection';
import { CertificationsSection } from './components/sections/CertificationsSection';
import { ModernDevSection } from './components/sections/ModernDevSection';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/layout/Footer';



export function App() {
  const [commandOpen, setCommandOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  return (
    <div className="min-h-screen bg-obsidian-950 text-gray-100 relative font-sans selection:bg-cyanGlow/30 selection:text-white overflow-x-hidden bg-tech-grid">
      
      {/* 3D Background Canvas Layer */}
      <DynamicBackgroundCanvas />

      {/* Floating Header Navbar */}
      <Navbar
        onOpenCommand={setCommandOpen}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
      />
      {/* Quick Command Palette Modal */}
      <CommandPalette
        isOpen={commandOpen}
        onClose={setCommandOpen}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
      />

      {/* Page Sections */}
      <main>
        <HeroSection onOpenCommand={setCommandOpen} />
        <AboutSection />
        <TechStackSection />
        <MainProjectSection />
        <ExperienceSection />
        <EducationSection />
        <CertificationsSection />
        <ModernDevSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}

export default App;
