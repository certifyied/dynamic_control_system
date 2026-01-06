import { useEffect } from "react";
import { motion } from "framer-motion";
import { useCanonical } from "@/hooks/useCanonical";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

// Import all client images
const clientImages = import.meta.glob<{ default: string }>("/src/assets/Clients/*.{png,jpg,jpeg,webp,svg}", { eager: true });

// Convert to array and extract filenames
const clients = Object.entries(clientImages).map(([path, module]) => {
  const filename = path.split("/").pop() || "";
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");
  return {
    image: module.default,
    name: nameWithoutExt,
    filename: filename,
  };
});

const Clients = () => {
  useCanonical();

  // Update SEO metadata for Clients page
  useEffect(() => {
    // Update document title
    document.title = "Our Clients & Partners | Mitsubishi Electric in Kochi";
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Discover our trusted clients and industry partners who rely on Mitsubishi Electric in Kochi for reliable industrial automation solutions and expert support."
      );
    }

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute(
        "content",
        "Our Clients & Partners | Mitsubishi Electric in Kochi"
      );
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute(
        "content",
        "Discover our trusted clients and industry partners who rely on Mitsubishi Electric in Kochi for reliable industrial automation solutions and expert support."
      );
    }

    // Cleanup function to restore default meta tags when component unmounts
    return () => {
      document.title = "Dynamic Control Systems | Mitsubishi Electric in Kochi";
      if (metaDescription) {
        metaDescription.setAttribute(
          "content",
          "Dynamic Control Systems delivers advanced industrial automation, SCADA, and energy solutions powered by Mitsubishi Electric in Kochi."
        );
      }
      if (ogTitle) {
        ogTitle.setAttribute(
          "content",
          "Dynamic Control Systems | Mitsubishi Electric in Kochi"
        );
      }
      if (ogDescription) {
        ogDescription.setAttribute(
          "content",
          "Dynamic Control Systems delivers advanced industrial automation, SCADA, and energy solutions powered by Mitsubishi Electric in Kochi."
        );
      }
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Navigation />

      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-to-b from-muted/30 to-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
                Our Clients
              </h1>
              <p className="text-xl text-muted-foreground">
                Trusted by leading industries, delivering innovation with Mitsubishi Electric in Kochi.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Clients Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {clients.map((client, index) => (
                <motion.div
                  key={client.filename}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <Card className="h-full hover-lift cursor-pointer group overflow-hidden">
                    <AspectRatio ratio={16 / 9}>
                      <div className="w-full h-full bg-white flex items-center justify-center p-6 overflow-hidden">
                        <img
                          src={client.image}
                          alt={client.name}
                          loading="lazy"
                          className="max-w-full max-h-full w-auto h-auto object-contain group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </AspectRatio>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Clients;

