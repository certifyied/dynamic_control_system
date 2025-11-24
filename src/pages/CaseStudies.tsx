import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, TrendingUp, Clock, MapPin } from "lucide-react";

const CaseStudies = () => {
  const caseStudies = [
    {
      title: "Smart Factory Transformation",
      industry: "Manufacturing",
      location: "Germany",
      challenge: "Aging production lines causing inefficiency and increased downtime",
      solution: "Implemented AI-powered automation with predictive maintenance",
      results: [
        { metric: "40%", label: "Productivity Increase" },
        { metric: "60%", label: "Downtime Reduction" },
        { metric: "€2M", label: "Annual Savings" },
      ],
      testimonial: "The transformation exceeded our expectations. We're now operating at peak efficiency with minimal interruptions.",
      author: "Klaus Schmidt, Operations Director",
      image: "🏭",
    },
    {
      title: "Sustainable Building Project",
      industry: "Real Estate",
      location: "Japan",
      challenge: "High energy consumption in commercial tower complex",
      solution: "Integrated smart HVAC and energy management systems",
      results: [
        { metric: "45%", label: "Energy Reduction" },
        { metric: "35%", label: "Cost Savings" },
        { metric: "80%", label: "Tenant Satisfaction" },
      ],
      testimonial: "A remarkable improvement in both efficiency and occupant comfort.",
      author: "Yuki Tanaka, Facility Manager",
      image: "🏢",
    },
    {
      title: "Metro System Modernization",
      industry: "Transportation",
      location: "United Kingdom",
      challenge: "Outdated train control systems affecting service reliability",
      solution: "Deployed next-generation signaling and propulsion systems",
      results: [
        { metric: "30%", label: "Service Frequency" },
        { metric: "50%", label: "Fewer Delays" },
        { metric: "25%", label: "Energy Efficiency" },
      ],
      testimonial: "Passengers are experiencing unprecedented reliability and comfort.",
      author: "James Wilson, Transit Authority",
      image: "🚇",
    },
  ];

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
                Case Studies
              </h1>
              <p className="text-xl text-muted-foreground">
                Real-world success stories showcasing how our solutions drive 
                measurable results for our clients worldwide.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Case Studies Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4 space-y-16">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Card className="overflow-hidden hover-lift">
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-2 gap-0">
                      {/* Content */}
                      <div className="p-8 lg:p-12">
                        <div className="flex items-center gap-4 mb-6">
                          <Badge variant="secondary">{study.industry}</Badge>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin size={14} />
                            {study.location}
                          </div>
                        </div>

                        <h2 className="font-display text-3xl font-bold mb-4">
                          {study.title}
                        </h2>

                        <div className="space-y-4 mb-6">
                          <div>
                            <h3 className="font-semibold text-sm text-primary mb-2">
                              Challenge
                            </h3>
                            <p className="text-muted-foreground">
                              {study.challenge}
                            </p>
                          </div>

                          <div>
                            <h3 className="font-semibold text-sm text-primary mb-2">
                              Solution
                            </h3>
                            <p className="text-muted-foreground">
                              {study.solution}
                            </p>
                          </div>
                        </div>

                        <Button className="group">
                          Read Full Story
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </div>

                      {/* Results & Testimonial */}
                      <div className="bg-muted/30 p-8 lg:p-12 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-6">
                            <TrendingUp className="text-primary" size={20} />
                            <h3 className="font-display font-semibold text-lg">
                              Key Results
                            </h3>
                          </div>

                          <div className="grid grid-cols-3 gap-4 mb-8">
                            {study.results.map((result) => (
                              <div key={result.label} className="text-center">
                                <div className="text-3xl font-bold text-primary mb-1">
                                  {result.metric}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {result.label}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="border-t pt-6">
                          <p className="text-foreground italic mb-4">
                            "{study.testimonial}"
                          </p>
                          <p className="text-sm text-muted-foreground">
                            — {study.author}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-secondary text-secondary-foreground">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-4xl font-bold mb-4">
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl text-secondary-foreground/80 mb-8 max-w-2xl mx-auto">
                Let's discuss how our solutions can drive success for your organization.
              </p>
              <Button size="lg" variant="default">
                Get Started
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CaseStudies;
