import { useState } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Search, Download, ArrowRight } from "lucide-react";
// Placeholder will be handled via onError fallback to public path

// Import all product images
const productImages = import.meta.glob<{ default: string }>("/src/assets/products/*.{png,jpg,jpeg,webp,svg}", { eager: true });

// Helper function to match image to section
const getSectionForImage = (filename: string): string | null => {
  const lowerFilename = filename.toLowerCase();
  
  if (lowerFilename.includes("plc") && !lowerFilename.includes("software")) {
    return "PLC";
  }
  if (lowerFilename.includes("hmi")) {
    return "HMI";
  }
  if (lowerFilename.includes("inverter") || lowerFilename.includes("invert")) {
    return "Invertors";
  }
  if (lowerFilename.includes("motion-control") || lowerFilename.includes("motion control")) {
    return "Motion control";
  }
  if (lowerFilename.includes("software")) {
    return "Software";
  }
  if (lowerFilename.includes("melsec") && !lowerFilename.includes("plc") && !lowerFilename.includes("software")) {
    return "MELSEC";
  }
  if (lowerFilename.includes("robot")) {
    return "Robot";
  }
  if (lowerFilename.includes("genesis")) {
    return "Genesis";
  }
  if (lowerFilename.includes("servo")) {
    return "Servo";
  }
  
  return null;
};

// Convert to array and group by section
const allProducts = Object.entries(productImages).map(([path, module]) => {
  const filename = path.split("/").pop() || "";
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");
  const section = getSectionForImage(filename);
  
  return {
    image: module.default,
    filename: filename,
    name: nameWithoutExt,
    section: section,
  };
}).filter(product => product.section !== null);

// Group products by section
const sections = [
  "PLC",
  "HMI",
  "Invertors",
  "Motion control",
  "Software",
  "MELSEC",
  "Robot",
  "Genesis",
  "Servo",
];

const productsBySection = sections.map(section => ({
  name: section,
  products: allProducts.filter(p => p.section === section),
}));

// Generate product descriptions based on section
const generateDescription = (section: string, filename: string): string => {
  const descriptions: Record<string, string[]> = {
    "PLC": [
      "Compact programmable logic controller for mid-range industrial automation. Supports Ethernet and analog I/O for flexible integration.",
      "Advanced PLC system with high-speed processing and extensive I/O capabilities. Ideal for complex automation applications.",
      "Reliable programmable controller designed for scalable manufacturing solutions. Features robust communication protocols.",
    ],
    "HMI": [
      "Intuitive human-machine interface with touchscreen display for seamless operator interaction. Supports multiple protocols.",
      "High-performance HMI solution with advanced visualization capabilities. Enables real-time monitoring and control.",
      "Compact HMI panel designed for space-constrained applications. Features responsive touch interface and clear display.",
    ],
    "Invertors": [
      "Energy-efficient variable frequency drive for precise motor control. Reduces energy consumption and extends equipment life.",
      "Advanced inverter technology with intelligent control algorithms. Optimizes performance across various industrial applications.",
      "Compact frequency inverter with integrated safety features. Provides smooth motor operation and protection.",
    ],
    "Motion control": [
      "Precision motion control system with high-speed positioning capabilities. Ensures accurate movement in automation applications.",
      "Advanced motion controller with integrated servo drive technology. Delivers exceptional performance and reliability.",
      "Flexible motion control solution supporting multiple motor types. Features comprehensive programming and diagnostics.",
    ],
    "Software": [
      "Comprehensive engineering software for system design and configuration. Streamlines development and reduces time to market.",
      "Integrated software platform for programming and monitoring automation systems. Features intuitive interface and powerful tools.",
      "Advanced software suite with simulation and debugging capabilities. Accelerates project development and troubleshooting.",
    ],
    "MELSEC": [
      "High-performance MELSEC controller with extensive I/O options. Designed for demanding industrial automation requirements.",
      "Scalable MELSEC system supporting modular expansion. Provides flexibility for growing automation needs.",
      "Reliable MELSEC controller with robust communication features. Ensures seamless integration with existing systems.",
    ],
    "Robot": [
      "Versatile industrial robot with high precision and repeatability. Ideal for assembly, welding, and material handling applications.",
      "Collaborative robot designed for safe human-robot interaction. Features advanced safety sensors and intuitive programming.",
      "High-speed robotic system optimized for production efficiency. Delivers consistent performance in automated manufacturing.",
    ],
    "Genesis": [
      "Next-generation Genesis platform with advanced processing capabilities. Enables sophisticated automation solutions.",
      "Scalable Genesis system supporting complex control applications. Features modular architecture and flexible configuration.",
    ],
    "Servo": [
      "High-performance servo motor with exceptional torque and speed control. Provides precise positioning for automation systems.",
      "Compact servo drive with integrated motion control. Features advanced algorithms for smooth and accurate operation.",
      "Energy-efficient servo system with regenerative capabilities. Reduces power consumption while maintaining high performance.",
    ],
  };

  const sectionDescriptions = descriptions[section] || ["Industrial automation solution designed for reliability and performance."];
  // Use filename hash to pick a consistent description
  const index = filename.length % sectionDescriptions.length;
  return sectionDescriptions[index];
};

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Flatten all products for search
  const allProductsWithDetails = productsBySection.flatMap(section =>
    section.products.map(product => ({
      ...product,
      section: section.name,
      description: generateDescription(section.name, product.filename),
      title: `${section.name} ${product.name}`,
    }))
  );

  const filteredProducts = allProductsWithDetails.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.section.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group filtered products back by section
  const filteredSections = sections.map(sectionName => ({
    name: sectionName,
    products: filteredProducts.filter(p => p.section === sectionName),
  })).filter(section => section.products.length > 0);

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
                Products & Solutions
              </h1>
              <p className="text-xl text-muted-foreground">
                Discover our comprehensive range of innovative solutions designed 
                to enhance efficiency and sustainability across industries.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Search */}
        <section className="py-8 border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Products by Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 space-y-16">
            {filteredSections.map((section, sectionIndex) => (
              <motion.div
                key={section.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
              >
                <div className="mb-8">
                  <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">
                    {section.name}
                  </h2>
                  <div className="w-20 h-1 bg-primary rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {section.products.map((product, index) => (
                    <motion.div
                      key={product.filename}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                    >
                      <Card className="h-full hover-lift cursor-pointer group overflow-hidden">
                        <AspectRatio ratio={16 / 9}>
                          <img
                            src={product.image}
                            alt={product.name}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = "/placeholder.svg";
                            }}
                          />
                        </AspectRatio>
                        <CardContent className="p-6">
                          <Badge variant="secondary" className="mb-4">
                            {product.section}
                          </Badge>
                          
                          <h3 className="font-display text-2xl font-semibold mb-3 group-hover:text-primary transition-colors">
                            {product.section} {product.name}
                          </h3>
                          
                          <p className="text-muted-foreground mb-4">
                            {product.description}
                          </p>

                          <div className="text-xs text-muted-foreground mb-6">
                            Image: {product.filename}
                          </div>

                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="flex-1">
                              <Download className="mr-2 h-4 w-4" />
                              Datasheet
                            </Button>
                            <Button size="sm" className="flex-1">
                              Details
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}

            {filteredSections.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">
                  No products found matching your criteria.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Products;
