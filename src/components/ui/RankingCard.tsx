import { motion, Variants } from "framer-motion";
import { ClipboardList } from "lucide-react";

interface RankingItem {
  nome: string;
  quantidade: number;
}

interface RankingCardProps {
  title: string;
  items: RankingItem[];
  delay?: number;
}

export default function RankingCard({ title, items, delay = 0 }: RankingCardProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900">{title}</h2>
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          <ClipboardList className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
        </motion.div>
      </div>
      
      <div className="space-y-3 sm:space-y-4">
        {items.map((item, index) => (
          <motion.div
            key={item.nome}
            variants={itemVariants}
            whileHover={{
              x: 10,
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
            className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-2 sm:space-x-3">
              <motion.div
                className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base ${
                  index === 0 ? 'bg-yellow-500' : 
                  index === 1 ? 'bg-gray-400' : 
                  'bg-orange-500'
                }`}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                {index + 1}
              </motion.div>
              <span className="font-medium text-gray-900 text-sm sm:text-base truncate max-w-[120px] sm:max-w-[150px] md:max-w-none">{item.nome}</span>
            </div>
            <motion.span 
              className="text-base sm:text-lg font-bold text-gray-600"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              {item.quantidade}
            </motion.span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
