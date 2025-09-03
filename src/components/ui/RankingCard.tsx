import { motion, Variants } from "framer-motion";
import { Trophy, Medal, Award } from "lucide-react";

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
  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center"
      >
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <Trophy className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Ranking Vazio</h3>
        <p className="text-gray-600">Quando houver procedimentos cadastrados, o ranking será exibido aqui.</p>
      </motion.div>
    );
  }

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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const getIcon = (position: number) => {
    switch (position) {
      case 0:
        return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 1:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 2:
        return <Award className="w-5 h-5 text-amber-600" />;
      default:
        return <div className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">
          {position + 1}
        </div>;
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300"
    >
      <h2 className="text-lg font-semibold text-gray-900 mb-6">{title}</h2>
      
      <div className="space-y-4">
        {items.map((item, index) => (
          <motion.div
            key={item.nome}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-100 hover:border-gray-200 transition-all duration-200"
          >
            <div className="flex items-center space-x-3">
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                {getIcon(index)}
              </motion.div>
              <span className="font-medium text-gray-900">{item.nome}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Quantidade:</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full">
                {item.quantidade}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
