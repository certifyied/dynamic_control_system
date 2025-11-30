import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, Award, Users, TrendingUp } from "lucide-react";

const About = () => {
  const timeline = [
    { year: "1921", event: "Mitsubishi Electric Corporation established" },
    { year: "1954", event: "Started production of heavy electric equipment" },
    { year: "1980", event: "Launched first industrial robot" },
    { year: "2000", event: "Expanded into renewable energy solutions" },
    { year: "2020", event: "Achieved major sustainability milestones" },
    { year: "2024", event: "Leading in AI-powered automation" },
  ];

  const values = [
    {
      icon: Globe,
      title: "Global Reach",
      description: "Operating in over 150 countries with a commitment to local communities",
    },
    {
      icon: Award,
      title: "Quality Excellence",
      description: "Century-long commitment to superior quality and reliability",
    },
    {
      icon: Users,
      title: "People First",
      description: "Empowering 140,000+ employees to drive innovation",
    },
    {
      icon: TrendingUp,
      title: "Sustainable Growth",
      description: "Balancing business success with environmental responsibility",
    },
  ];

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

        {/* About Content Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <div className="prose prose-lg max-w-none">
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
                  We are a team of young, dynamic, and experienced engineers specializing in Electrical, Automation, and Instrumentation Engineering. Over the years, we have successfully executed numerous industrial projects across India, including key sectors like Steel, Cement, Power Generation, Automobiles, Pharmaceuticals, and Packaging. Our strong technical support team, always prepared to tackle complex on-site challenges, ensures every project runs efficiently and seamlessly.
                </p>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  Dynamic Control Systems – an Authorized Channel Partner for Mitsubishi Electric India Private Limited – is a leading provider of industrial automation in Kochi, especially in Vytilla. Led by Mr. Saji K. Philip, we offer comprehensive sales and service support for Mitsubishi Electric solutions, catering to diverse industrial automation in Kochi. Whether it's new installations, system upgrades, or expansions, our expertise in industrial automation in Kochi helps build long-lasting partnerships with clients who trust us for dependable and innovative solutions.
                </p>
              </div>
            </motion.div>
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

        {/* Values Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
                Our Core Values
              </h2>
              <p className="text-xl text-muted-foreground">
                The principles that guide everything we do
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full hover-lift">
                    <CardContent className="p-6 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                        <value.icon size={28} className="text-primary" />
                      </div>
                      <h3 className="font-display text-xl font-semibold mb-3">
                        {value.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

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
                <div className="text-4xl font-bold text-primary mb-2">150+</div>
                <div className="text-sm text-muted-foreground">Countries</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-primary mb-2">240+</div>
                <div className="text-sm text-muted-foreground">Offices Worldwide</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-primary mb-2">140K+</div>
                <div className="text-sm text-muted-foreground">Employees</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-primary mb-2">100+</div>
                <div className="text-sm text-muted-foreground">Years of Innovation</div>
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
