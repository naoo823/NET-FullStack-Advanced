// Button UI componentimport { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

// A helper function for cleanly merging Tailwind classes
const cn = (...inputs) => {
  return twMerge(clsx(inputs));
};

export function Button({ children, className, variant = 'primary', ...props }) {
  const baseClasses = 'px-6 py-3 font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-accent';

  const variantClasses = {
    primary: 'bg-primary text-dark hover:bg-primary-hover shadow-lg shadow-primary/20',
    secondary: 'bg-dark-accent border border-gray/30 hover:bg-gray/10 text-light',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95, y: 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={cn(baseClasses, variantClasses[variant], className)}
      {...props}
    >
      {children}
    </motion.button>
  );
}