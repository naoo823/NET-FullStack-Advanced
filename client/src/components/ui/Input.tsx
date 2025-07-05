import React from 'react';
import { motion } from 'framer-motion';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const Input = React.forwardRef(({ icon, ...props }, ref) => {
  return (
    <motion.div variants={itemVariants} className="relative group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray transition-colors duration-300 group-focus-within:text-primary">
        {icon}
      </div>
      <input
        ref={ref}
        className="w-full pl-12 pr-4 py-3 bg-dark-accent rounded-lg border border-gray/20 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
        {...props}
      />
    </motion.div>
  );
});