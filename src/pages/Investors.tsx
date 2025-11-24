import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, TrendingUp, Calendar, FileText } from "lucide-react";

const Investors = () => {
  const financialReports = [
    { title: "Annual Report 2023", date: "March 2024", type: "Annual Report" },
    { title: "Q4 2023 Earnings", date: "February 2024", type: "Quarterly Report" },
    { title: "Q3 2023 Earnings", date: "November 2023", type: "Quarterly Report" },
    { title: "Sustainability Report 2023", date: "September 2023", type: "ESG Report" },
  ];

  const pressReleases = [
    {
      date: "March 15, 2024",
      title: "Mitsubishi Electric Reports Record Revenue Growth",
      summary: "Strong performance across all business segments driven by digital transformation initiatives.",
    },
    {
      date: "March 1, 2024",
      title: "New Strategic Partnership Announcement",
      summary: "Collaboration with leading technology companies to advance smart infrastructure solutions.",
    },
    {
      date: "February 20, 2024",
      title: "Expansion of R&D Facilities",
      summary: "Investment of $500M in new research centers focused on AI and renewable energy.",
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
                Investor Relations
              </h1>
              <p className="text-xl text-muted-foreground">
                Access financial reports, corporate governance information, and 
                insights into our business performance.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Key Metrics */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-4xl font-bold mb-4">
                Financial Highlights
              </h2>
              <p className="text-xl text-muted-foreground">
                FY2023 Performance Overview
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardContent className="p-6 text-center">
                    <TrendingUp className="text-primary mx-auto mb-4" size={32} />
                    <div className="text-3xl font-bold text-primary mb-2">¥4.8T</div>
                    <div className="text-sm text-muted-foreground">Revenue</div>
                    <div className="text-xs text-green-600 mt-1">+12% YoY</div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <Card>
                  <CardContent className="p-6 text-center">
                    <TrendingUp className="text-primary mx-auto mb-4" size={32} />
                    <div className="text-3xl font-bold text-primary mb-2">¥285B</div>
                    <div className="text-sm text-muted-foreground">Operating Income</div>
                    <div className="text-xs text-green-600 mt-1">+18% YoY</div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Card>
                  <CardContent className="p-6 text-center">
                    <TrendingUp className="text-primary mx-auto mb-4" size={32} />
                    <div className="text-3xl font-bold text-primary mb-2">6.2%</div>
                    <div className="text-sm text-muted-foreground">Operating Margin</div>
                    <div className="text-xs text-green-600 mt-1">+0.5pp</div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <Card>
                  <CardContent className="p-6 text-center">
                    <TrendingUp className="text-primary mx-auto mb-4" size={32} />
                    <div className="text-3xl font-bold text-primary mb-2">¥70</div>
                    <div className="text-sm text-muted-foreground">Dividend Per Share</div>
                    <div className="text-xs text-green-600 mt-1">Stable</div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Financial Reports */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-display text-4xl font-bold mb-4">
                Financial Reports & Documents
              </h2>
              <p className="text-xl text-muted-foreground">
                Access our latest financial disclosures and reports
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {financialReports.map((report, index) => (
                <motion.div
                  key={report.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover-lift">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <FileText className="text-primary" size={20} />
                            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                              {report.type}
                            </span>
                          </div>
                          <h3 className="font-display text-xl font-semibold mb-2">
                            {report.title}
                          </h3>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar size={14} />
                            <span>{report.date}</span>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          <Download className="mr-2 h-4 w-4" />
                          PDF
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Press Releases */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-display text-4xl font-bold mb-4">
                Press Releases
              </h2>
              <p className="text-xl text-muted-foreground">
                Latest news and announcements
              </p>
            </motion.div>

            <div className="space-y-6 max-w-3xl">
              {pressReleases.map((release, index) => (
                <motion.div
                  key={release.title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover-lift cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Calendar size={14} />
                        <span>{release.date}</span>
                      </div>
                      <h3 className="font-display text-xl font-semibold mb-2 hover:text-primary transition-colors">
                        {release.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {release.summary}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact IR */}
        <section className="py-20 bg-secondary text-secondary-foreground">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-4xl font-bold mb-4">
                Investor Inquiries
              </h2>
              <p className="text-xl text-secondary-foreground/80 mb-8 max-w-2xl mx-auto">
                For questions about our financial performance, governance, or investor relations, 
                please contact our IR team.
              </p>
              <Button size="lg" variant="default">
                Contact IR Team
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Investors;
