import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Factory, Building2, Zap, Train, LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface Product {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

const ProductCarousel = () => {
  const products: Product[] = [
    {
      icon: Factory,
      title: "Factory Automation",
      description: "Smart Manufacturing Automation - Harness the power of intelligent PLC, HMI, SCADA, and robotics integration to automate critical manufacturing processes. Our solutions improve accuracy, streamline workflows, and ensure high-quality, repeatable production outcomes across all industrial environments.",
      color: "text-primary",
    },
    {
      icon: Building2,
      title: "Motion Control & Robotics",
      description: "Motion Control & Robotics - Enhance speed, precision, and safety with advanced robotic systems and motion control technologies. From assembly and handling to inspection and packaging, we deliver automation that reduces manual effort and boosts overall operational efficiency.",
      color: "text-accent",
    },
    {
      icon: Zap,
      title: "Real-Time Monitoring",
      description: "Industrial IoT & Real-Time Monitoring - Transform your factory into a connected ecosystem with IIoT-based data monitoring and smart analytics. Our systems enable real-time visibility, predictive maintenance, and informed decision-making—helping industries minimize downtime and maximize productivity.",
      color: "text-primary",
    },
    {
      icon: Train,
      title: "Automation Solutions",
      description: "Customized Automation Solutions - Every factory is unique—so are our solutions. We design and implement tailor-made automation systems that align with your production requirements, ensuring seamless integration, reliable performance, and long-term scalability for future growth.",
      color: "text-accent",
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
``
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => {
            const IconComponent = product.icon;
            return (
              <motion.div
                key={product.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover-lift cursor-pointer group">
                  <CardContent className="p-6">
                    <div className={`${product.color} mb-4`}>
                      <IconComponent size={40} strokeWidth={1.5} />
                    </div>
                    <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {product.description}
                    </p>
                    <Button variant="ghost" size="sm" className="p-0 h-auto group/btn" asChild>
                      <Link to="/products">
                        Learn more
                        <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;
