import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Workflow from "@/components/Workflow";
import TechStack from "@/components/TechStack";
import ContactCTA, { Footer } from "@/components/ContactCTA";

export default function LandingPage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <Workflow />
      <TechStack />
      <ContactCTA />
      <Footer />
    </main>
  );
}
