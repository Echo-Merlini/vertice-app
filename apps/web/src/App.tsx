import { Routes, Route } from "react-router-dom";
import { HeroSection } from "./sections/HeroSection";
import { WorkMarqueeSection } from "./sections/WorkMarqueeSection";
import { MarqueeSection } from "./sections/MarqueeSection";
import { ServicesSection } from "./sections/ServicesSection";
import { FlagshipSection } from "./sections/FlagshipSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { ContactSection } from "./sections/ContactSection";
import { WorkDetailPage } from "./pages/WorkDetailPage";

function Home() {
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

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/work/:slug" element={<WorkDetailPage />} />
    </Routes>
  );
}
