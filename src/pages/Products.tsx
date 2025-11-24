import { useState } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Download, ArrowRight } from "lucide-react";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Factory Automation",
    "Building Systems",
    "Energy Solutions",
    "Transportation",
    "Home Appliances",
  ];

  const products = [
    {
      title: "MELSERVO-J5 Series",
      category: "Factory Automation",
      description: "High-performance servo system with advanced motion control",
      specs: ["500W - 7kW", "EtherCAT/CC-Link IE", "IP67 Rating"],
    },
    {
      title: "HVAC Controls",
      category: "Building Systems",
      description: "Intelligent climate control for commercial buildings",
      specs: ["IoT-Enabled", "Energy Efficient", "Cloud Management"],
    },
    {
      title: "Solar Power Systems",
      category: "Energy Solutions",
      description: "Complete photovoltaic solutions for sustainable energy",
      specs: ["20+ Year Warranty", "Smart Monitoring", "High Efficiency"],
    },
    {
      title: "Train Control Systems",
      category: "Transportation",
      description: "Reliable propulsion and control for modern rail networks",
      specs: ["Safety Certified", "Real-time Diagnostics", "Scalable"],
    },
    {
      title: "FR-D700 VFD Series",
      category: "Factory Automation",
      description: "Variable frequency drives for industrial applications",
      specs: ["0.1-400kW", "Compact Design", "Multi-Function"],
    },
    {
      title: "Elevator Systems",
      category: "Building Systems",
      description: "Advanced elevator solutions for high-rise buildings",
      specs: ["Energy Saving", "Smooth Operation", "Smart Destination"],
    },
  ];

  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory === "All" || product.category === selectedCategory) &&
      (product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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

        {/* Search and Filter */}
        <section className="py-8 border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full hover-lift cursor-pointer group">
                    <CardContent className="p-6">
                      <Badge variant="secondary" className="mb-4">
                        {product.category}
                      </Badge>
                      
                      <h3 className="font-display text-2xl font-semibold mb-3 group-hover:text-primary transition-colors">
                        {product.title}
                      </h3>
                      
                      <p className="text-muted-foreground mb-4">
                        {product.description}
                      </p>

                      <div className="space-y-2 mb-6">
                        {product.specs.map((spec) => (
                          <div key={spec} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                            <span className="text-sm text-muted-foreground">{spec}</span>
                          </div>
                        ))}
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

            {filteredProducts.length === 0 && (
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
