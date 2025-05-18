import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  position?: 'top' | 'right' | 'bottom' | 'left';
  delay?: number;
  className?: string;
}

export const Tooltip = ({ 
  children, 
  content, 
  position = 'top', 
  delay = 0.2,
  className = ''
}: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const positionStyles = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 mb-1',
    right: 'left-full top-1/2 transform translate-y-[-50%] translate-x-2 ml-1',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 translate-y-2 mt-1',
    left: 'right-full top-1/2 transform translate-y-[-50%] -translate-x-2 mr-1'
  };

  const arrowStyles = {
    top: 'absolute left-1/2 bottom-[-6px] transform -translate-x-1/2 border-l-4 border-l-transparent border-t-4 border-r-4 border-r-transparent',
    right: 'absolute top-1/2 left-[-6px] transform -translate-y-1/2 border-t-4 border-t-transparent border-r-4 border-b-4 border-b-transparent',
    bottom: 'absolute left-1/2 top-[-6px] transform -translate-x-1/2 border-l-4 border-l-transparent border-b-4 border-r-4 border-r-transparent',
    left: 'absolute top-1/2 right-[-6px] transform -translate-y-1/2 border-t-4 border-t-transparent border-l-4 border-b-4 border-b-transparent'
  };

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay * 1000);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  // Close tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current && 
        !tooltipRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={triggerRef}
    >
      {children}
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={tooltipRef}
            className={`absolute z-50 w-max max-w-xs ${positionStyles[position]} ${className}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1 }}
          >
            <div className="bg-gray-800 text-white text-xs p-2 px-3 rounded-lg shadow-lg">
              {content}
              <div 
                className={`${arrowStyles[position]} border-gray-800`}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
