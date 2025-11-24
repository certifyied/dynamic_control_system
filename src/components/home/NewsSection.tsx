import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const NewsSection = () => {
  const news = [
    {
      date: "March 15, 2024",
      title: "New Factory Automation Solution Launches",
      excerpt: "Revolutionary AI-powered automation system designed for Industry 4.0 manufacturing.",
      category: "Product Launch",
    },
    {
      date: "March 10, 2024",
      title: "Sustainability Report 2024 Published",
      excerpt: "Achieving carbon neutrality milestones across global operations.",
      category: "Sustainability",
    },
    {
      date: "March 5, 2024",
      title: "Partnership with Leading Tech Companies",
      excerpt: "Strategic alliance to advance smart city infrastructure worldwide.",
      category: "Partnership",
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
              Latest News
            </h2>
            <p className="text-xl text-muted-foreground">
              Stay updated with our latest announcements and innovations
            </p>
          </div>
          <Button variant="outline" className="hidden md:flex" asChild>
            <a href="#">
              View All News
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {news.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover-lift cursor-pointer group">
                <CardContent className="p-6">
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-4">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Calendar size={14} />
                    <span>{item.date}</span>
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {item.excerpt}
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

        <div className="mt-8 md:hidden">
          <Button variant="outline" className="w-full" asChild>
            <a href="#">
              View All News
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
