import { motion } from "framer-motion";

interface Procedimento {
  id: number;
  nome: string;
  data: string;
  observacao: string;
}

interface AnimatedTableProps {
  procedimentos: Procedimento[];
  delay?: number;
}

export default function AnimatedTable({ procedimentos, delay = 0 }: AnimatedTableProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: delay
      }
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
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
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300"
    >
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Histórico de Procedimentos</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Procedimento
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Data
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Observação
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {procedimentos.slice(0, 10).map((procedimento, index) => (
              <motion.tr
                key={procedimento.id}
                variants={rowVariants}
                whileHover={{
                  scale: 1.01,
                  backgroundColor: "#f9fafb",
                  transition: { duration: 0.2 }
                }}
                className="hover:bg-gray-50"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {procedimento.nome}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(procedimento.data).toLocaleDateString('pt-BR')}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {procedimento.observacao}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
