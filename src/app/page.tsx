import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SimulationSection from "@/components/SimulationSection";
import ExplainabilitySection from "@/components/ExplainabilitySection";
import ArchitectureSection from "@/components/ArchitectureSection";
import FeaturesSection from "@/components/FeaturesSection";
import StakeholdersSection from "@/components/StakeholdersSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Hero />
        <SimulationSection />
        <ExplainabilitySection />
        <ArchitectureSection />
        <FeaturesSection />
        <StakeholdersSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}

