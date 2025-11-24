import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import ProductCarousel from "@/components/home/ProductCarousel";
import MissionSection from "@/components/home/MissionSection";
import NewsSection from "@/components/home/NewsSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <ProductCarousel />
        <MissionSection />
        <NewsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
