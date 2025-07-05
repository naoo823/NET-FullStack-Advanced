// Card UI componentimport { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

const cn = (...inputs) => {
  return twMerge(clsx(inputs));
};

export function Card({ children, className }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={cn(
        'bg-dark-accent/50 p-6 rounded-xl border border-gray/20 backdrop-blur-sm',
        className
      )}
    >
      {children}
    </motion.div>
  );
}