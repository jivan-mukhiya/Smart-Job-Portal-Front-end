import { CTASection } from "@/components/landing/CTASection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { Footer } from "@/components/landing/Footer";
import { HeroSection } from "@/components/landing/HeroSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { Navbar } from "@/components/landing/Navbar";
import { UserTypeSection } from "@/components/landing/UserTypeSection";


export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        <HeroSection />

        <UserTypeSection />

        <FeaturesSection />

        <HowItWorksSection />

        <CTASection />
      </main>

      <Footer />
    </>
  );
}