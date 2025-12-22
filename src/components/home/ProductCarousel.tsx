import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import pharmaIndustryImage from "@/assets/pharama_industry.jpg";
import foodIndustryImage from "@/assets/food_industry.jpg";
import automationIndustryImage from "@/assets/automation_industry.jpg";
import marineIndustryImage from "@/assets/marine_industry.jpg";

interface Product {
  image: string;
  title: string;
  description: string;
  bulletPoints: string[];
}

const ProductCarousel = () => {
  const products: Product[] = [
    {
      image: pharmaIndustryImage,
      title: "Pharma Industry",
      description: "We deliver precise automation for safe and reliable pharma production.",
      bulletPoints: [
        "Blood bag manufacturing automation",
        "Autoclave system control",
        "Heart valve production systems",
        "Secure packing solutions",
        "End-to-end traceability and cleanroom-friendly automation",
      ],
    },
    {
      image: foodIndustryImage,
      title: "Food & Beverages",
      description: "Automation that enhances hygiene, speed, and consistency.",
      bulletPoints: [
        "Retort machine automation",
        "Food & spice plant control systems",
        "Bottle filling automation",
        "Automated garbage and waste management systems for safe disposal",
        "Systems for hygiene compliance and continuous output",
      ],
    },
    {
      image: automationIndustryImage,
      title: "Automotive Industry",
      description: "Automation that improves speed, accuracy, and quality in automotive plants.",
      bulletPoints: [
        "Assembly line automation",
        "Testing & inspection integration",
        "Motor and drive control systems",
        "Car automation and intelligent vehicle systems",
        "Energy-efficient plant automation",
      ],
    },
    {
      image: marineIndustryImage,
      title: "Marine & Defence",
      description: "Robust systems built for harsh marine and defence environments.",
      bulletPoints: [
        "Corrosion-resistant control panels",
        "Automation for vessels and docks",
        "Pump and engine monitoring",
        "Power management systems",
        "Rugged, vibration-proof solutions",
      ],
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-xl text-black max-w-2xl mx-auto">
            "Comprehensive solutions across diverse industries, powered by decades of expertise"
            </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover-lift cursor-pointer group overflow-hidden">
                <AspectRatio ratio={16 / 9}>
                  <img
                    src={product.image}
                    alt={product.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder.svg";
                    }}
                  />
                </AspectRatio>
                <CardContent className="p-6">
                  <h3 className="font-display text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {product.description}
                  </p>
                  <ul className="text-sm text-muted-foreground mb-4 space-y-1.5">
                    {product.bulletPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-primary mr-2 mt-1.5">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant="ghost" size="sm" className="p-0 h-auto group/btn" asChild>
                    <Link to="/products">
                      Learn more
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;
