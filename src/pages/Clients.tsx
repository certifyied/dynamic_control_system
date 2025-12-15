import { motion } from "framer-motion";
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
                Trusted by leading organizations across industries. We're proud to partner with 
                companies that drive innovation and excellence.
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

