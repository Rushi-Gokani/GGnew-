import React from 'react';
import { motion } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  // Scroll to top on mount (when new page enters)
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ 
        duration: 0.8, 
        ease: [0.25, 1, 0.5, 1] // "Barba-like" smooth easing
      }}
      className="relative w-full"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
