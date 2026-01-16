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
      description: "We deliver precise and reliable automation solutions for safe pharmaceutical production, powered by Mitsubishi Electric and SCADA programming in Kochi.",
      bulletPoints: [
        "Blood bag manufacturing automation with SCADA programming in Kochi",
        "Advanced autoclave system control using SCADA programming in Kochi",
        "Heart valve production automation supported by SCADA programming in Kochi",
        "Secure and compliant packaging through SCADA programming in Kochi",
        "End-to-end traceability with cleanroom-friendly systems and SCADA programming in Kochi",
      ],
    },
    {
      image: foodIndustryImage,
      title: "Food & Beverages",
      description: "We deliver automation solutions that improve hygiene, speed, and consistency in food and processing industries, powered by Mitsubishi Electric and SCADA programming in Kochi.",
      bulletPoints: [
        "Improved hygiene, speed, and consistency with SCADA programming in Kochi",
        "Retort machine automation using SCADA programming in Kochi",
        "Food and spice plant control with SCADA programming in Kochi",
        "High-speed bottle filling via SCADA programming in Kochi",
        "Automated waste management using SCADA programming in Kochi",
        "Hygiene-compliant systems for continuous production with SCADA programming in Kochi",
      ],
    },
    {
      image: automationIndustryImage,
      title: "Automotive Industry",
      description: "We provide advanced automation solutions that boost speed, accuracy, and quality in automotive manufacturing, powered by Mitsubishi Electric and SCADA programming in Kochi.",
      bulletPoints: [
        "Assembly line automation with SCADA programming in Kochi",
        "Integrated testing and inspection systems using SCADA programming in Kochi",
        "Motor and drive control solutions via SCADA programming in Kochi",
        "Intelligent car automation and vehicle systems supported by SCADA programming in Kochi",
        "Energy-efficient plant automation solutions through SCADA programming in Kochi",
      ],
    },
    {
      image: marineIndustryImage,
      title: "Marine & Defence",
      description: "We deliver robust automation systems for harsh marine and defence environments, powered by Mitsubishi Electric and SCADA programming in Kochi.",
      bulletPoints: [
        "Corrosion-resistant control panels with SCADA programming in Kochi",
        "Automation solutions for vessels and dock operations using SCADA programming in Kochi",
        "Pump and engine monitoring systems via SCADA programming in Kochi",
        "Integrated power management solutions with SCADA programming in Kochi",
        "Rugged, vibration-proof automation systems supported by SCADA programming in Kochi",
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
