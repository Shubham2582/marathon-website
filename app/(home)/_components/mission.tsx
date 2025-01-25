import { motion } from "framer-motion";
import { Check, Eye, Target } from "lucide-react";

const Mission = () => {
  return (
    <section className="py-32 bg-neutral-100 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-center bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Mission & Vision
        </h2>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-xl transition-shadow"
          >
            <div className="mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3>Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To create a transformative sporting event that brings together
                communities, promotes peace, and showcases the natural beauty of
                Abujhmad. We aim to build bridges between diverse groups while
                encouraging health, fitness, and mutual understanding through
                the universal language of sports.
              </p>
            </div>
            <ul className="space-y-3">
              {[
                "Foster community integration",
                "Promote health and fitness",
                "Showcase local culture",
                "Support peace initiatives",
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center text-gray-600"
                >
                  <Check className="w-5 h-5 text-primary mr-2 flex-shrink-0" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-xl transition-shadow"
          >
            <div className="mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-primary" />
              </div>
              <h3>Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To establish the Abujhmad Marathon as a symbol of peace and
                unity, making it a premier international sporting event that
                contributes to the region's development while inspiring future
                generations to embrace physical fitness and community harmony.
              </p>
            </div>
            <ul className="space-y-3">
              {[
                "International recognition",
                "Sustainable development",
                "Youth empowerment",
                "Cultural preservation",
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center text-gray-600"
                >
                  <Check className="w-5 h-5 text-primary mr-2 flex-shrink-0" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Mission;
