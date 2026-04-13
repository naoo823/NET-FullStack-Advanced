// Home pageimport { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button.jsx';
import { Card } from '../components/ui/Card.jsx';
import { Code, Smartphone, Video, Target, Feather, ShieldCheck } from 'lucide-react';

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
};

const services = [
  { icon: Smartphone, title: 'Mobile Development', desc: 'Cross-platform apps with Flutter that feel native and perform beautifully.' },
  { icon: Code, title: 'Web Development', desc: 'Full-stack solutions with React & Node, built for scale and security.' },
  { icon: Video, title: 'Video & Motion', desc: 'Engaging visual storytelling through professional editing and motion graphics.' },
];

const values = [
  { icon: Target, title: 'Discipline', desc: 'We adhere to strict timelines and coding standards to ensure predictable, high-quality outcomes.' },
  { icon: ShieldCheck, title: 'Quality', desc: 'Every line of code, pixel, and frame is meticulously crafted for excellence and durability.' },
  { icon: Feather, title: 'Silence', desc: 'We focus on deep work, communicating effectively and purposefully to let the results speak for themselves.' },
];

export default function Home() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-32"
    >
      {/* 1. Hero Section */}
      <section className="text-center pt-20 pb-10">
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-light to-primary animate-gradient-text"
        >
          Silence. Discipline. Quality.
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-xl text-gray max-w-3xl mx-auto mb-8"
        >
          We are NET, a collective of digital artisans dedicated to crafting exceptional web, mobile, and media experiences with unwavering focus.
        </motion.p>
        <motion.div variants={itemVariants}>
          <Link to="/portfolio">
            <Button size="lg">Explore Our Work</Button>
          </Link>
        </motion.div>
      </section>

      {/* 2. Services Section */}
      <section>
        <motion.h2 variants={itemVariants} className="text-4xl font-bold text-center mb-16">
          Our Core Services
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="text-center h-full hover:border-primary hover:-translate-y-2 transition-all duration-300 group">
                <div className="flex justify-center text-primary mb-6">
                  <div className="p-4 bg-dark rounded-full shadow-lg shadow-primary/10 transition-all duration-300 group-hover:shadow-primary/30">
                    <service.icon size={36} />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-light">{service.title}</h3>
                <p className="text-gray leading-relaxed">{service.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* 3. Why Choose Us Section */}
      <section>
        <motion.h2 variants={itemVariants} className="text-4xl font-bold text-center mb-16">
          The NET Philosophy
        </motion.h2>
        <div className="max-w-4xl mx-auto space-y-8">
          {values.map((value, index) => (
            <motion.div key={index} variants={itemVariants}>
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 text-primary mt-1"><value.icon size={28} /></div>
                <div>
                  <h3 className="text-2xl font-semibold text-light">{value.title}</h3>
                  <p className="text-gray mt-1">{value.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. Call to Action (CTA) Section */}
      <motion.section variants={itemVariants} className="text-center">
        <Card className="max-w-3xl mx-auto border-primary/30">
          <h2 className="text-3xl font-bold text-light">Ready to Build Something Exceptional?</h2>
          <p className="text-gray mt-4 mb-6">Let's discuss how our disciplined approach can bring your vision to life.</p>
          <Link to="/contact">
            <Button>Get In Touch</Button>
          </Link>
        </Card>
      </motion.section>

    </motion.div>
  );
}