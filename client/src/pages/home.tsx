import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import AxonSection from "@/components/axon-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="bg-dark-gradient text-portfolio overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <AxonSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
