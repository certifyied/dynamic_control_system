import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      title: "Engineering & Design",
      description: "To ensure result-oriented, cost-effective, and time-efficient outcomes, we provide tailored, intelligent, and adaptable engineering solutions delivered within the promised timeframe. Our Industrial Automation Experts offer comprehensive support for PLC, SCADA, HMI, consulting, design, development, maintenance, bug fixing, and third-party interface integration for process industries. With a strong focus on Industrial Automation in Kochi, we deliver end-to-end solutions that drive efficiency and reliability.",
    },
    {
      title: "Industrial, Factory & Process Automation",
      description: "Companies in the process and manufacturing sectors need a technology partner who truly understands their operations. At Dynamic Control Systems, we recognise how industrial automation in Kochi can streamline processes, enhance workflow, and boost overall efficiency. With our strong expertise in engineering and controls, we ensure that every automation solution we deliver is accurate, effective, and tailored to your needs.",
    },
    {
      title: "SCADA System Integration",
      description: "Dynamic Control Systems designs and builds SCADA (Supervisory Control and Data Acquisition) systems tailored to meet diverse project requirements in Industrial Processes and Machinery. As a key player in Industrial Automation in Kochi, we deliver customized SCADA solutions that enhance control, monitoring, and efficiency across various industrial applications.",
    },
    {
      title: "Industrial IoT Solution Development",
      description: "Enables device connectivity, data processing and management, application integration, security, access control, monitoring, alarm management, digital twin, and integration with enterprise applications.",
    },
    {
      title: "Embedded System",
      description: "We design and deliver high-quality embedded system solutions for both industrial and residential applications. With our expertise in Industrial Automation in Kochi, we ensure reliable, efficient, and innovative embedded solutions tailored to meet diverse automation needs.",
    },
    {
      title: "Project Training",
      description: "Dynamic Control Systems is dedicated to helping fresh graduates gain the skills and expertise needed to advance their careers. Through specialized training focused on Industrial Automation in Kochi, we prepare students to confidently step into real-world industrial automation roles and succeed in the evolving technology landscape.",
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
              Comprehensive solutions for industrial automation and control systems
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
              <Card className="h-full hover-lift cursor-pointer group">
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

