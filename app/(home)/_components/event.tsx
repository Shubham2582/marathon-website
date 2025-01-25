import { Calendar, Users, Trophy } from "lucide-react";
import { motion } from "framer-motion";

const Event = () => {
  return (
    <section className="py-32 bg-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="mb-8 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          EVENT OVERVIEW
        </h2>
        <p className="text-gray-600 text-xl md:text-2xl leading-relaxed mb-12">
          District administration and Narayanpur Police are organising Abujhmad
          peace marathon dedicated to the cause of bringing peace and prosperity
          to the insurgency affected tribal areas of Abujhmad and to provide an
          international platform to the area so that people from across the
          world can come and experience the serenity and divinity of Abujhmad.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              id: "date",
              icon: Calendar,
              title: "February , 2025",
              description: "Mark your calendars",
            },
            {
              id: "runners",
              icon: Users,
              title: "10,000+ Runners",
              description: "From all over the world",
            },
            {
              id: "categories",
              icon: Trophy,
              title: "5 Categories",
              description: "For all skill levels",
            },
          ].map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <item.icon className="w-8 h-8 text-primary" />
              </div>
              <h4>{item.title}</h4>
              <p className="text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Event;
