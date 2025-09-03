import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedCardProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  whileHover?: boolean;
}

export default function AnimatedCard({ 
  children, 
  delay = 0, 
  className = "",
  whileHover = true 
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      whileHover={whileHover ? {
        y: -5,
        scale: 1.02,
        transition: { duration: 0.2 }
      } : undefined}
      className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
}
