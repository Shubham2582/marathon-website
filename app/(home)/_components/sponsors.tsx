import { motion } from "framer-motion";
import Image from "next/image";

const Sponsors = () => {
  return (
    <section className="py-32 bg-neutral-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Our Esteemed Sponsors
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* First Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl shadow-lg p-8 transition-transform duration-300 hover:-translate-y-2"
          >
            <div className="aspect-[3/2] relative">
              <Image
                src="/images/logo1.png"
                alt="Sponsor Logo 1"
                fill
                className="object-contain"
              />
            </div>
          </motion.div>

          {/* Second Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-3xl shadow-lg p-8 transition-transform duration-300 hover:-translate-y-2"
          >
            <div className="aspect-[3/2] relative">
              <Image
                src="/images/logo2.png"
                alt="Sponsor Logo 2"
                fill
                className="object-contain"
              />
            </div>
          </motion.div>

          {/* Empty Placeholder Slots */}
          <motion.div className="bg-white rounded-3xl shadow-lg p-8 opacity-30">
            <div className="aspect-[3/2] relative">
              <Image
                src="/placeholder.svg"
                alt="Future Sponsor"
                fill
                className="object-contain"
              />
            </div>
          </motion.div>

          <motion.div className="bg-white rounded-3xl shadow-lg p-8 opacity-30">
            <div className="aspect-[3/2] relative">
              <Image
                src="/placeholder.svg"
                alt="Future Sponsor"
                fill
                className="object-contain"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Sponsors;
