import { useState } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar, ArrowRight, Clock } from "lucide-react";

const Blog = () => {
  const [selectedBlog, setSelectedBlog] = useState<number | null>(null);

  const blogPosts = [
    {
      id: 1,
      title: "The Future of Industrial Automation",
      excerpt: "Exploring how AI and machine learning are revolutionizing manufacturing processes and increasing efficiency across industries.",
      category: "Technology",
      date: "March 20, 2024",
      readTime: "5 min read",
      content: `Industrial automation has come a long way from simple mechanical systems to sophisticated AI-driven solutions. Today's manufacturing facilities are leveraging cutting-edge technologies to optimize production, reduce waste, and improve quality.

The integration of artificial intelligence and machine learning in industrial automation is transforming how we approach manufacturing. These technologies enable predictive maintenance, real-time quality control, and adaptive production lines that can respond to changing demands.

Key benefits include:
- Increased production efficiency by up to 40%
- Reduced downtime through predictive maintenance
- Improved product quality with real-time monitoring
- Enhanced worker safety through automated processes

As we look to the future, the convergence of IoT, AI, and automation will continue to reshape the industrial landscape, creating smarter, more responsive manufacturing ecosystems.`,
    },
    {
      id: 2,
      title: "Sustainable Energy Solutions for Modern Facilities",
      excerpt: "Discover how smart energy management systems are helping businesses reduce their carbon footprint while cutting operational costs.",
      category: "Sustainability",
      date: "March 18, 2024",
      readTime: "7 min read",
      content: `Sustainability is no longer just a buzzword—it's a critical component of modern business operations. Companies worldwide are recognizing the importance of reducing their environmental impact while maintaining operational efficiency.

Smart energy management systems are at the forefront of this transformation. These solutions combine real-time monitoring, predictive analytics, and automated controls to optimize energy consumption across facilities.

The results speak for themselves:
- Average energy cost reduction of 30-45%
- Significant reduction in carbon emissions
- Improved compliance with environmental regulations
- Enhanced brand reputation and stakeholder confidence

Modern facilities are implementing integrated energy solutions that monitor everything from HVAC systems to production equipment, ensuring optimal energy usage without compromising performance.`,
    },
    {
      id: 3,
      title: "Building Smart Cities: Infrastructure for Tomorrow",
      excerpt: "How advanced control systems are enabling the development of intelligent urban infrastructure that improves quality of life.",
      category: "Infrastructure",
      date: "March 15, 2024",
      readTime: "6 min read",
      content: `Smart cities represent the future of urban living, where technology seamlessly integrates with infrastructure to create more efficient, sustainable, and livable environments. Advanced control systems play a crucial role in making this vision a reality.

From intelligent traffic management to smart building automation, these systems collect and analyze data to optimize city operations in real-time. The benefits extend beyond efficiency—they create safer, more accessible, and more responsive urban environments.

Key applications include:
- Intelligent traffic flow management reducing congestion by up to 25%
- Smart grid systems optimizing energy distribution
- Automated building systems improving comfort and efficiency
- Integrated public safety and emergency response systems

As urban populations continue to grow, smart city technologies will become essential for managing resources, reducing environmental impact, and enhancing the quality of life for millions of residents.`,
    },
    {
      id: 4,
      title: "Robotics in Manufacturing: Precision and Efficiency",
      excerpt: "An in-depth look at how modern robotics are transforming production lines and enabling new levels of precision and automation.",
      category: "Manufacturing",
      date: "March 12, 2024",
      readTime: "8 min read",
      content: `Robotics technology has evolved dramatically, moving from simple repetitive tasks to complex, adaptive systems that can work alongside human operators. Modern manufacturing robots combine precision, speed, and intelligence to revolutionize production processes.

Collaborative robots, or cobots, are particularly transformative. These systems are designed to work safely alongside human workers, combining the precision and consistency of automation with human flexibility and problem-solving capabilities.

The impact on manufacturing is profound:
- Precision improvements of up to 99.9% in critical operations
- Production speed increases of 30-50% in many applications
- Enhanced worker safety through automation of hazardous tasks
- Flexibility to adapt to changing production requirements

As robotics technology continues to advance, we're seeing the emergence of more intelligent, adaptable systems that can learn from their environment and optimize their performance over time.`,
    },
    {
      id: 5,
      title: "Data-Driven Decision Making in Industrial Settings",
      excerpt: "How real-time data analytics are empowering businesses to make informed decisions and optimize operations continuously.",
      category: "Analytics",
      date: "March 10, 2024",
      readTime: "6 min read",
      content: `In today's industrial landscape, data is one of the most valuable assets. The ability to collect, analyze, and act on real-time data is transforming how businesses operate and compete.

Modern industrial systems generate vast amounts of data from sensors, equipment, and processes. Advanced analytics platforms turn this raw data into actionable insights, enabling predictive maintenance, quality optimization, and process improvement.

The advantages are clear:
- Real-time visibility into all operations
- Predictive insights preventing costly downtime
- Data-driven optimization improving efficiency by 20-35%
- Enhanced quality control through continuous monitoring

Organizations that successfully implement data-driven strategies are seeing significant improvements in productivity, quality, and profitability. The key is having the right tools and expertise to turn data into decisions.`,
    },
    {
      id: 6,
      title: "Cybersecurity in Industrial Control Systems",
      excerpt: "Understanding the critical importance of securing industrial networks and protecting against evolving cyber threats.",
      category: "Security",
      date: "March 8, 2024",
      readTime: "7 min read",
      content: `As industrial systems become increasingly connected and digitized, cybersecurity has become a top priority. Industrial control systems (ICS) are attractive targets for cybercriminals, making robust security measures essential.

Modern industrial cybersecurity goes beyond traditional IT security. It requires specialized knowledge of operational technology (OT) systems, understanding of industrial protocols, and strategies that protect both data and physical operations.

Critical security measures include:
- Network segmentation isolating critical systems
- Continuous monitoring and threat detection
- Regular security assessments and vulnerability management
- Employee training on cybersecurity best practices

The consequences of a security breach in industrial systems can be severe, affecting not just data but physical operations, safety, and public infrastructure. A comprehensive security strategy is essential for protecting these critical systems.`,
    },
  ];

  const openDialog = (blogId: number) => {
    setSelectedBlog(blogId);
  };

  const closeDialog = () => {
    setSelectedBlog(null);
  };

  const currentBlog = blogPosts.find((blog) => blog.id === selectedBlog);

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
                Blog
              </h1>
              <p className="text-xl text-muted-foreground">
                Insights, trends, and updates on industrial automation, technology, 
                and innovation shaping the future of manufacturing.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.map((blog, index) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card
                    className="h-full hover-lift cursor-pointer group"
                    onClick={() => openDialog(blog.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant="secondary">{blog.category}</Badge>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock size={12} />
                          <span>{blog.readTime}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <Calendar size={14} />
                        <span>{blog.date}</span>
                      </div>
                      
                      <h3 className="font-display text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                        {blog.title}
                      </h3>
                      
                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {blog.excerpt}
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

        {/* Blog Dialog */}
        <Dialog open={selectedBlog !== null} onOpenChange={closeDialog}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            {currentBlog && (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <Badge variant="secondary">{currentBlog.category}</Badge>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{currentBlog.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{currentBlog.readTime}</span>
                      </div>
                    </div>
                  </div>
                  <DialogTitle className="text-2xl md:text-3xl font-display">
                    {currentBlog.title}
                  </DialogTitle>
                  <DialogDescription className="text-base pt-2">
                    {currentBlog.excerpt}
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-6 space-y-4">
                  <div className="prose prose-sm max-w-none">
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                      {currentBlog.content}
                    </p>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;

