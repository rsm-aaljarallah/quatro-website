/*
 * DESIGN: Cyber-Dark Resume Website — Main Page
 * Assembles all sections in order with smooth scroll
 * Dark theme: #050A18 bg, #00D4FF/#0066FF accents
 * Fonts: Syne (display) + DM Sans (body) + JetBrains Mono (labels)
 * Sections: Hero → About → Experience → Education → Skills → Projects → Certifications → Contact
 */

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import CertificationsSection from "@/components/CertificationsSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: "#050A18" }}>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <EducationSection />
      <SkillsSection />
      <ProjectsSection />
      <CertificationsSection />
      <ContactSection />
    </div>
  );
}
