/*
 * DESIGN: Cyber-Dark Resume Website — Main Page
 * Assembles all sections in order with smooth scroll
 * Dark theme: #0A0E1A bg, #B8C8DC/#7A8FA8 accents (Deep Navy & Crisp White)
 * Fonts: Playfair Display (display) + Lato (body) + JetBrains Mono (labels)
 */

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import VenturesSection from "@/components/VenturesSection";
import CertificationsSection from "@/components/CertificationsSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: "#0A0E1A" }}>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <EducationSection />
      <ProjectsSection />
      <SkillsSection />
      <VenturesSection />
      <CertificationsSection />
      <ContactSection />
    </div>
  );
}
