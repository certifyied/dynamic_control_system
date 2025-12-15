import { useState } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Award, ArrowRight } from "lucide-react";
import automationIndustry from "@/assets/automation_industry.jpg";
import sajiImage from "@/assets/saji.jpg";
import christoImage from "@/assets/christo.jpg";
import joeImage from "@/assets/joe.jpg";

const About = () => {
  const timeline = [
    { year: "1998", event: "Dynamic Control Systems established" },
    { year: "2000", event: "Associated with Mitsubushi Systems" },
    { year: "2013", event: "Launched panel manufacturing with MAC " },
    { year: "2015", event: "Started a college wing for IoT automation students" },
    { year: "2019", event: "Registerd a new training institute DCSRI " },
    { year: "2025", event: "Leading in AI-powered automation" },
  ];

  const directors = [
    {
      id: 1,
      image: sajiImage,
      name: "Mr. Saji K. Philip",
      designation: "Technical Director",
      description: "Leading Dynamic Control Systems with decades of expertise in industrial automation and strategic vision for growth.",
      fullDescription: `Mr. Saji K. Philip, founder of DCS, is the core of our technical strength and vision. A B.Tech graduate from M.A. College of Engineering, Kothamangalam, Saji gained valuable experience at Concast India Pvt. Ltd., Mumbai, before returning home with a clear mission: to elevate the industrial automation landscape.

With deep expertise in the electrical and automotive industries, he has supported countless industries and machine builders across India. His commitment to continuous learning and hands-on guidance has shaped a technically strong and passionately driven DCS team.`,
    },
    {
      id: 2,
      image: christoImage,
      name: "Mr. Christo S Kayyalakam",
      designation: "The Strategy and Network Builder",
      description: "Driving innovation and excellence in automation solutions with a focus on customer success and technical excellence.",
      fullDescription: `Our CEO, Cristo S. Kayyalakam, brings strong business acumen built during his corporate career, including his tenure at IBM, Bangalore. A B.Tech graduate from M.A. College of Engineering, he returned to the core family business with a vision to scale, expand, and strengthen customer relationships.

Cristo leads key functions such as marketing, customer relations, and business expansion. Driven by his passion for industry-ready talent, he also founded an industrial automation training institute to bridge the knowledge gap between institutes and industries for the next generation.`,
    },
    {
      id: 3,
      image: joeImage,
      name: "Mr. Joe",
      designation: "CTO",
      description: "Specializing in advanced automation technologies and building strong partnerships with industry leaders.",
      fullDescription: `Our CTO, Joe, brings global exposure and advanced technical expertise to DCS. A B.Tech graduate in Electrical & Electronics Engineering from NIT Calicut, he has over eight years of experience in Electrical, Instrumentation, and Automation.

Joe began his career in Kerala and later moved to Qatar, where he excelled as an E&I Engineer and Lead Engineer, handling complex EPIC projects across oil & gas, airport operations, and large-scale infrastructure. His skills span system design, process automation, final testing, execution, and large project management.

Since joining DCS in 2023, Joe has been driving our technical direction with strong leadership in manpower management, troubleshooting, and high-level problem-solving.`,
    },
  ];

  const [selectedDirector, setSelectedDirector] = useState<number | null>(null);

  const openDialog = (directorId: number) => {
    setSelectedDirector(directorId);
  };

  const closeDialog = () => {
    setSelectedDirector(null);
  };

  const currentDirector = directors.find((director) => director.id === selectedDirector);

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-12 bg-gradient-to-b from-muted/30 to-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h1 className="font-display text-5xl md:text-6xl font-bold mb-8">
                About Us
              </h1>
            </motion.div>
          </div>
        </section>

        {/* About Content Section - Two Column Layout */}
        <section className="py-20 md:py-24">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-[48%_52%] gap-8 lg:gap-12 xl:gap-16 items-center">
              {/* Left Column: Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="order-1 lg:order-none"
              >
                {/* Section Label */}
                <div className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
                  About Dynamic Control Systems
                </div>
                
                {/* Main Heading */}
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
                  Leading Industrial Automation Solutions
                </h2>
                
                {/* Description */}
                <div className="space-y-4 mb-8 max-w-[600px]">
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    We are a team of young, dynamic, and experienced engineers specializing in Electrical, Automation, and Instrumentation Engineering. Over the years, we have successfully executed numerous industrial projects across India, including key sectors like Steel, Cement, Power Generation, Automobiles, Pharmaceuticals, and Packaging.
                  </p>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    Dynamic Control Systems – an Authorized Channel Partner for Mitsubishi Electric India Private Limited – is a leading provider of industrial automation in Kochi, especially in Vytilla. Led by Mr. Saji K. Philip, we offer comprehensive sales and service support for Mitsubishi Electric solutions, catering to diverse industrial automation needs.
                  </p>
                </div>
                
                {/* CTA Button */}
                <Button size="lg" className="group">
                  Learn More About Us
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>

              {/* Right Column: Image Container */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative order-2 lg:order-none"
              >
                {/* Image Container */}
                <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden shadow-xl">
                  <img
                    src={automationIndustry}
                    alt="Industrial Automation Solutions"
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Highlight/Stat Card Overlay */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="absolute bottom-6 left-6 right-6 md:right-auto md:w-auto"
                  >
                    <Card className="bg-background/95 backdrop-blur-sm shadow-lg border-2 border-primary/20">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                              <Award className="h-8 w-8 text-primary" />
                            </div>
                          </div>
                          <div>
                            <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                              27+
                            </div>
                            <div className="text-sm md:text-base text-muted-foreground font-medium">
                              Years of Excellence
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
                Our Journey
              </h2>
              <p className="text-xl text-muted-foreground">
                A century of innovation and excellence
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 hidden md:block" />

                {timeline.map((item, index) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`flex items-center mb-8 ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    <div className={`flex-1 ${index % 2 === 0 ? "md:text-right md:pr-12" : "md:pl-12"}`}>
                      <Card className="inline-block">
                        <CardContent className="p-4">
                          <div className="font-display text-2xl font-bold text-primary mb-2">
                            {item.year}
                          </div>
                          <p className="text-foreground">{item.event}</p>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="hidden md:block w-4 h-4 bg-primary rounded-full border-4 border-background relative z-10" />
                    <div className="flex-1" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Directors Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
                Our Directors
              </h2>
              <p className="text-xl text-muted-foreground">
                Meet the leadership team driving innovation and excellence
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {directors.map((director, index) => (
                <motion.div
                  key={director.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card 
                    className="h-full hover-lift cursor-pointer group overflow-hidden"
                    onClick={() => openDialog(director.id)}
                  >
                    <AspectRatio ratio={4 / 3}>
                      <img
                        src={director.image}
                        alt={director.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/placeholder.svg";
                        }}
                      />
                    </AspectRatio>
                    <CardContent className="p-6 text-center">
                      <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {director.name}
                      </h3>
                      <p className="text-primary font-medium mb-3">
                        {director.designation}
                      </p>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                        {director.description}
                      </p>
                      <Button variant="ghost" size="sm" className="p-0 h-auto group/btn">
                        Read more
                        <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Director Dialog */}
        <Dialog open={selectedDirector !== null} onOpenChange={closeDialog}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            {currentDirector && (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src={currentDirector.image}
                        alt={currentDirector.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/placeholder.svg";
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <DialogTitle className="text-2xl md:text-3xl font-display mb-2">
                        {currentDirector.name}
                      </DialogTitle>
                      <DialogDescription className="text-primary font-medium text-base">
                        {currentDirector.designation}
                      </DialogDescription>
                    </div>
                  </div>
                </DialogHeader>
                <div className="mt-6 space-y-4">
                  <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed whitespace-pre-line">
                    {currentDirector.fullDescription}
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Global Presence */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
                Global Presence
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                With operations spanning six continents, we bring innovation to communities worldwide
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-primary mb-2">27+</div>
                <div className="text-sm text-muted-foreground">Innovation</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-primary mb-2">1000+</div>
                <div className="text-sm text-muted-foreground">Projects Served</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-primary mb-2">500+</div>
                <div className="text-sm text-muted-foreground">customers</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-primary mb-2">70+</div>
                <div className="text-sm text-muted-foreground">testimonials</div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
