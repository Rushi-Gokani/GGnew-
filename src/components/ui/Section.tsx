import React from 'react';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  dark?: boolean;
}

export const Section: React.FC<SectionProps> = ({ children, className, id, dark = false }) => {
  return (
    <section 
      id={id} 
      className={twMerge(
        "py-20 md:py-32 px-6 md:px-12 lg:px-24 overflow-hidden scroll-mt-24 md:scroll-mt-28 lg:scroll-mt-32",
        dark ? "bg-gg-slate text-gg-cream" : "bg-gg-cream text-gg-slate",
        className
      )}
    >
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </section>
  );
};

export const FadeIn: React.FC<{ children: React.ReactNode; delay?: number; direction?: 'up' | 'down' | 'left' | 'right'; className?: string }> = ({ 
  children, 
  delay = 0,
  direction = 'up',
  className
}) => {
  const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

  const variants = {
    hidden: { 
      opacity: 0, 
      y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
      x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      x: 0,
      transition: { duration: 0.8, ease: easeOut, delay } 
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};
