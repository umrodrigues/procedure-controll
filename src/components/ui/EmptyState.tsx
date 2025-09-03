import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  variant?: "default" | "success" | "warning" | "info";
}

export default function EmptyState({ 
  icon: Icon, 
  title, 
  description, 
  actionText, 
  onAction,
  variant = "default" 
}: EmptyStateProps) {
  const variantStyles = {
    default: "bg-gray-50 border-gray-200 text-gray-600",
    success: "bg-green-50 border-green-200 text-green-600",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-600",
    info: "bg-blue-50 border-blue-200 text-blue-600"
  };

  const iconStyles = {
    default: "bg-gray-100 text-gray-400",
    success: "bg-green-100 text-green-400",
    warning: "bg-yellow-100 text-yellow-400",
    info: "bg-blue-100 text-blue-400"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`w-full p-8 text-center border-2 border-dashed rounded-xl ${variantStyles[variant]}`}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${iconStyles[variant]}`}
      >
        <Icon className="w-8 h-8" />
      </motion.div>
      
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm mb-4 opacity-80">{description}</p>
      
      {actionText && onAction && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAction}
          className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors"
        >
          {actionText}
        </motion.button>
      )}
    </motion.div>
  );
}
