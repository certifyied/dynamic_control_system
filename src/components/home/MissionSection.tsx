import { motion } from "framer-motion";
import { Target, Users, Lightbulb } from "lucide-react";

const MissionSection = () => {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To contribute to a vibrant and sustainable society through continuous technological innovation and SCADA programming in Kochi with Mitsubishi Electric.",
    },
    {
      icon: Users,
      title: "Our Values",
      description: "Driven by integrity, respect, and teamwork, we collaborate for a greater purpose through SCADA automation in Kochi with Mitsubishi Electric.",
    },
    {
      icon: Lightbulb,
      title: "Our Vision",
      description: "To be a leading global provider of innovative solutions that enhance quality of life worldwide through SCADA programming in Kochi  with Mitsubishi Electric.",
    },
  ];

  return (
    <section className="py-20 bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Changes for the Better
          </h2>
          <p className="text-xl text-secondary-foreground/80 max-w-2xl mx-auto">
            Our commitment to excellence and innovation shapes a better tomorrow
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-6">
                <value.icon size={28} className="text-primary-foreground" />
              </div>
              <h3 className="font-display text-2xl font-semibold mb-4">
                {value.title}
              </h3>
              <p className="text-secondary-foreground/80">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
