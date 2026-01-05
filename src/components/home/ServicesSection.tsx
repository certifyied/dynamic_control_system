import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ArrowRight } from "lucide-react";
import embeddedSystemImage from "@/assets/services/embeded_system.jpg";

// Import service-specific images from services folder
const serviceImages = import.meta.glob<{ default: string }>(
  "/src/assets/services/*.{png,jpg,jpeg,webp,svg}",
  { eager: true }
);

const getImageForService = (title: string): string => {
  const entries = Object.entries(serviceImages);

  // Normalize both title and filename for robust matching
  const normalize = (value: string) =>
    value.toLowerCase().replace(/[^a-z0-9]/g, "");

  const match = entries.find(([path]) => {
    const filename = path.split("/").pop() || "";
    const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");
    return normalize(nameWithoutExt) === normalize(title);
  });

  // Fallback: first service image or placeholder
  return match?.[1].default || entries[0]?.[1].default || "/placeholder.svg";
};

const ServicesSection = () => {
  const services = [
    {
      title: "Engineering & Design",
      description:
        "At our company, we deliver result-oriented, cost-effective, and time-efficient engineering solutions, tailored to your needs, with intelligent and adaptable approaches, proudly utilizing Mitsubishi Electric in Kochi for optimal performance.",
      image: getImageForService("Engineering & Design"),
    },
    {
      title: "Industrial, Factory & Process Automation",
      description:
        "Companies in the process and manufacturing sectors need a technology partner who truly understands their operations. At Dynamic Control Systems, we leverage Mitsubishi Electric in Kochi to deliver advanced industrial automation solutions that optimise efficiency and productivity.",
      image: getImageForService("Industrial, Factory & Process Automation"),
    },
    {
      title: "SCADA System Integration",
      description:
        "Dynamic Control Systems specializes in designing and building SCADA (Supervisory Control and Data Acquisition) systems, customized to meet diverse industrial process requirements, with strong expertise in Mitsubishi Electric in Kochi solutions.",
      image: getImageForService("SCADA System Integration"),
    },
    {
      title: "Industrial IoT Solution Development",
      description:
        "Enables seamless device connectivity, data processing and management, application integration, security, access control, monitoring, alarm management, digital twin capabilities, and enterprise integration — all powered by solutions featuring Mitsubishi Electric in Kochi.",
      image: getImageForService("Industrial IoT Solution Development"),
    },
    {
      title: "Embedded System",
      description:
        "We design and deliver high-quality embedded system solutions for both industrial and residential applications. Leveraging our expertise in Mitsubishi Electric in Kochi, we provide reliable, efficient, and innovative embedded solutions tailored to meet diverse automation requirements.",
      image: embeddedSystemImage,
    },
    {
      title: "Project Training",
      description:
        "Dynamic Control Systems is committed to helping fresh graduates acquire the skills and expertise needed to advance their careers. Through specialized training in Mitsubishi Electric in Kochi, we equip students to confidently step into real-world industrial automation roles and excel in the evolving technology landscape.",
      image: getImageForService("Project Training"),
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-end mb-12"
        >
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Our Services
            </h2>
            <p className="text-xl text-muted-foreground">
              Comprehensive solutions for industrial automation and control systems powered by Mitsubishi Electric in Kochi.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover-lift cursor-pointer group overflow-hidden">
                <AspectRatio ratio={16 / 9}>
                  <img
                    src={service.image}
                    alt={service.title}
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
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-4">
                    {service.description}
                  </p>
                  <Button variant="ghost" size="sm" className="p-0 h-auto group/btn">
                    Learn more
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
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

export default ServicesSection;

