'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FiBox, FiChevronLeft } from 'react-icons/fi';

const ModelLauncher = () => {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setPosition({
        x: mobile ? 400 : window.innerWidth - 100, // Changed mobile position initially 20 for the mobile ?
        y: window.innerHeight * 0.6
      });
    };

    checkMobile();
    const handleResize = () => {
      checkMobile();
      window.requestAnimationFrame(() => {
        setPosition(prev => ({
          x: isMobile ? 20 : prev.x, // Changed mobile position
          y: prev.y
        }));
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  const handleTap = () => {
    if (!isDragging && isMounted) {
      if (!isExpanded) {
        setIsExpanded(true);
      } else {
        router.push('/upload');
      }
      setHasInteracted(true);
    }
  };

  const handleDragStart = () => {
    setIsDragging(true);
    setHasInteracted(true);
  };

  const handleDragEnd = (_: unknown, info: { point: { x: number; y: number } }) => {
    setPosition({
      x: info.point.x,
      y: info.point.y
    });
    setIsDragging(false);
  };

  if (!isMounted) return null;

  return (
    <motion.div
      className="fixed z-50 cursor-grab active:cursor-grabbing model-launcher"
      style={{
        x: position.x,
        y: position.y,
        // Removed conditional right/bottom for mobile
      }}
      drag
      dragConstraints={{
        top: 0,
        left: 0,
        right: window.innerWidth,
        bottom: window.innerHeight
      }}
      dragElastic={0.1}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onTap={handleTap}
    >
      <motion.div
        className="flex items-center justify-center gap-2 p-4 bg-white/90 backdrop-blur-lg rounded-full shadow-xl border border-green-100 hover:border-green-200 transition-colors"
        animate={{
          width: isExpanded ? 160 : 56,
          height: 56,
          x: isExpanded ? (isMobile ? -120 : -104) : 0 // Adjusted for mobile
        }}
        style={{
          scale: isMobile ? 0.9 : 1,
          marginLeft: 'auto'
        }}
      >
        {/* Drag indicator */}
        <AnimatePresence>
          {!hasInteracted && !isExpanded && (
            <motion.div
              className="absolute -left-8 top-1/2 -translate-y-1/2 text-slate-500"
              initial={{ opacity: 0, x: 5 }}
              animate={{ 
                opacity: 1, 
                x: 0,
                transition: { 
                  x: { 
                    repeat: Infinity, 
                    repeatType: "reverse", 
                    duration: 1 
                  } 
                } 
              }}
              exit={{ opacity: 0, x: -5 }}
            >
              <FiChevronLeft className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="text-green-600"
          animate={{
            rotate: isExpanded ? 360 : 0
          }}
        >
          <FiBox className="w-6 h-6" />
        </motion.div>

        <AnimatePresence>
          {isExpanded && (
            <motion.span
              className="text-green-800 font-medium pr-2 whitespace-nowrap"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              Use Model
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default ModelLauncher;