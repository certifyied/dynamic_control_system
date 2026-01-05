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
      description: "We deliver precise and reliable automation solutions for safe pharmaceutical production, powered by Mitsubishi Electric in Kochi.",
      bulletPoints: [
        "Blood bag manufacturing automation",
        "Advanced autoclave system control",
        "Heart valve production automation systems",
        "Secure and compliant packaging solutions",
        "End-to-end traceability with cleanroom-friendly automation",
      ],
    },
    {
      image: foodIndustryImage,
      title: "Food & Beverages",
      description: "We deliver automation solutions that enhance hygiene, speed, and consistency in food and processing industries, powered by Mitsubishi Electric in Kochi.",
      bulletPoints: [
        "Retort machine automation",
        "Food and spice plant control systems",
        "High-speed bottle filling automation",
        "Automated garbage and waste management systems for safe disposal",
        "Systems designed for hygiene compliance and continuous production",
      ],
    },
    {
      image: automationIndustryImage,
      title: "Automotive Industry",
      description: "We provide advanced automation solutions that enhance speed, accuracy, and quality in automotive manufacturing plants, powered by Mitsubishi Electric in Kochi.",
      bulletPoints: [
        "Assembly line automation",
        "Integrated testing and inspection systems",
        "Motor and drive control solutions",
        "Intelligent car automation and vehicle systems",
        "Energy-efficient plant automation solutions",
      ],
    },
    {
      image: marineIndustryImage,
      title: "Marine & Defence",
      description: "We deliver robust automation systems designed for harsh marine and defence environments, powered by Mitsubishi Electric in Kochi.",
      bulletPoints: [
        "Corrosion-resistant control panels",
        "Automation solutions for vessels and dock operations",
        "Pump and engine monitoring systems",
        "Integrated power management solutions",
        "Rugged, vibration-proof automation systems",
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
