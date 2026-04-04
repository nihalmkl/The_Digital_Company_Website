
import { IntroAnimation } from "@/components/ui/IntroAnimation";
import Header from "../ui/Header";
import HeroSection from "./HomeBanner";
import TextRevealSection from "./TextRevealSection";
import FooterSection from "../ui/Footer";
import ClientsSection from "./BrandLogo";
import SquidGameDeck from "./SquidGameDeck";
import PictureSection from "./PictureSection";
import AnimatedTeamSection from "./TeamSection";
import ServicesSection from "./Service";
import SmoothScrollProvider from "../ui/SmoothScrollProvider";


export default function HomePage() {
  return (
    // The main wrapper dictates the global background color (beige)
    <main className="relative w-full min-h-screen bg-[#EBE8E2] overflow-x-hidden font-sans">
      
      <IntroAnimation />

      <Header/>
  <SmoothScrollProvider>

      <div className="relative w-full flex flex-col">
        <div data-header-theme="light">
          <HeroSection />
        </div>

        <div data-header-theme="dark">
          <TextRevealSection />
        </div>

        <div data-header-theme="dark">
          <PictureSection />
        </div>
           <div data-header-theme="light">
        <SquidGameDeck/>
        </div>

         <div data-header-theme="light">
        <AnimatedTeamSection/>
        </div>

         <div data-header-theme="dark">
        <ServicesSection/>
        </div>
          <div data-header-theme="dark">
        <ClientsSection/>
        </div>

         <div data-header-theme="light">
        <FooterSection/>
        </div>
      </div>
      </SmoothScrollProvider>

    </main>
  );
}