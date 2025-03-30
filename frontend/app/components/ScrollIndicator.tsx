import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ScrollIndicator = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setScrolled(true);
      else setScrolled(false);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {!scrolled && (
        <motion.div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          {/* Mouse body */}
          <motion.div
            className="w-10 h-16 rounded-[2rem] border-2 border-green-400 relative flex justify-center pt-2 backdrop-blur-sm"
            animate={{
              borderColor: ["rgba(52, 211, 153, 0.5)", "rgba(52, 211, 153, 0.8)", "rgba(52, 211, 153, 0.5)"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            {/* Scroll wheel */}
            <motion.div
              className="w-1.5 h-1.5 bg-emerald-400 rounded-full"
              animate={{
                y: [0, 8, 0],
                opacity: [1, 0.4, 1],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            {/* Scroll line */}
            <motion.div
              className="absolute bottom-1 w-0.5 h-6 bg-emerald-400/80 rounded-full"
              animate={{
                height: [6, 10, 6],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
              }}
            />
          </motion.div>

          {/* Text label */}
          <motion.span
            className="text-[0.65rem] text-emerald-400/80 font-light tracking-wide"
            animate={{
              opacity: [0.8, 1, 0.8],
              y: [0, 2, 0],
            }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
            }}
          >
            Scroll down
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollIndicator;