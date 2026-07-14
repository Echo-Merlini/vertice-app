import { HeroSection } from "./sections/HeroSection";
import { WorkMarqueeSection } from "./sections/WorkMarqueeSection";
import { MarqueeSection } from "./sections/MarqueeSection";
import { ServicesSection } from "./sections/ServicesSection";
import { FlagshipSection } from "./sections/FlagshipSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { ContactSection } from "./sections/ContactSection";

export default function App() {
  return (
    <main style={{ background: "#0C0D11", overflowX: "clip" }}>
      <HeroSection />
      <WorkMarqueeSection />
      <MarqueeSection />
      <ServicesSection />
      <FlagshipSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}
