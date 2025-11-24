import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Factory, Building2, Zap, Train } from "lucide-react";
import { Link } from "react-router-dom";

const ProductCarousel = () => {
  const products = [
    {
      icon: Factory,
      title: "Factory Automation",
      description: "Advanced automation systems for manufacturing excellence",
      color: "text-primary",
    },
    {
      icon: Building2,
      title: "Building Systems",
      description: "Smart building solutions for energy efficiency",
      color: "text-accent",
    },
    {
      icon: Zap,
      title: "Energy Solutions",
      description: "Sustainable power generation and distribution",
      color: "text-primary",
    },
    {
      icon: Train,
      title: "Transportation",
      description: "Reliable systems for rail and transit networks",
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
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Our Product Families
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive solutions across diverse industries, powered by decades of expertise
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
              <Card className="h-full hover-lift cursor-pointer group">
                <CardContent className="p-6">
                  <div className={`${product.color} mb-4`}>
                    <product.icon size={40} strokeWidth={1.5} />
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;
