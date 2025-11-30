import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import ProductCarousel from "@/components/home/ProductCarousel";
import MissionSection from "@/components/home/MissionSection";
import ServicesSection from "@/components/home/ServicesSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <ProductCarousel />
        <MissionSection />
        <ServicesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
