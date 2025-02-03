import { motion } from "framer-motion";
import { Check, Eye, Target } from "lucide-react";

const Mission = () => {
  const missons = [
    {
      title: "Our Mission",
      description:
        "To create a transformative sporting event that brings together communities, promotes peace, and showcases the natural beauty of Abujhmad. We aim to build bridges between diverse groups while encouraging health, fitness, and mutual understanding through the universal language of sports.",
      icon: Target,
      vision: [
        "Foster community integration",
        "Promote health and fitness",
        "Showcase local culture",
        "Support peace initiatives",
      ],
    },
    {
      title: "Our Vision",
      description:
        "To establish the Abujhmad Marathon as a symbol of peace and unity, making it a premier international sporting event that contributes to the region's development while inspiring future generations to embrace physical fitness and community harmony.",
      icon: Eye,
      vision: [
        "International recognition",
        "Sustainable development",
        "Youth empowerment",
        "Cultural preservation",
      ],
    },
  ];

  return (
    <section className="relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto font-medium text-sm md:text-base"
      >
        <h2 className="text-primary text-center">Mission & Vision</h2>

        <div className="grid md:grid-cols-2 gap-4 md:gap-12 mt-10 md:mt-20">
          {/* Mission Card */}
          {missons.map((mission) => (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-primary/10 border border-primary/50 backdrop-blur-sm rounded-2xl p-4 md:p-8"
            >
              <div className="mb-3 md:mb-6">
                <div className="size-12 md:size-16 flex items-center justify-center bg-primary/10 border border-primary/50 rounded-2xl p-2 md:p-4 mb-3 md:mb-6">
                  <mission.icon className="size-8 md:size-10 text-primary" />
                </div>
                <h3 className="text-primary">{mission.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {mission.description}
                </p>
              </div>
              <ul className="space-y-3">
                {mission.vision.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center text-gray-600"
                  >
                    <Check className="size-4 md:size-5 text-primary mr-2 flex-shrink-0" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Mission;
