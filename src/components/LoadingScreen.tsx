import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gg-cream"
      initial={{ opacity: 1 }}
      exit={{
        y: "-100%",
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
      }}
    >
      <div className="relative flex flex-col items-center gap-8">
        {/* Logo Animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <img
            src="/logo-blue.webp"
            alt="Global Gourmet"
            className="h-16 w-auto md:h-20"
          />
        </motion.div>

        {/* Progress Bar */}
        <div className="w-48 h-[2px] bg-gg-navy/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gg-navy"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear" }}
          />
        </div>

        {/* Percentage Text */}
        <motion.p
          className="text-gg-navy/60 text-sm font-medium tabular-nums"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {progress}%
        </motion.p>
      </div>
    </motion.div>
  );
}
