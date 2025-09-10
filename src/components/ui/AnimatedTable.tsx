import { motion } from "framer-motion";
import { Calendar, FileText, MessageSquare, Edit, Trash2 } from "lucide-react";

interface Procedimento {
  id: number;
  nome: string;
  data: string;
  observacao: string;
}

interface AnimatedTableProps {
  procedimentos: Procedimento[];
  delay?: number;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

export default function AnimatedTable({ procedimentos, delay = 0, onEdit, onDelete }: AnimatedTableProps) {
  if (procedimentos.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center"
      >
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <FileText className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhum Procedimento</h3>
        <p className="text-gray-600">Os procedimentos cadastrados aparecerão aqui em uma tabela organizada.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
    >
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Histórico de Procedimentos</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {procedimentos.map((procedimento, index) => (
              <motion.tr
                key={procedimento.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: delay + index * 0.1 }}
                whileHover={{ backgroundColor: "#f9fafb" }}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <FileText className="w-4 h-4 text-blue-500 mr-3" />
                    <span className="text-sm font-medium text-gray-900">{procedimento.nome}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 text-green-500 mr-3" />
                    <span className="text-sm text-gray-900">
                      {(() => {
                        const [ano, mes, dia] = procedimento.data.split('-').map(Number);
                        const data = new Date(ano, mes - 1, dia);
                        return data.toLocaleDateString('pt-BR');
                      })()}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-start">
                    <MessageSquare className="w-4 h-4 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-900 max-w-xs truncate">
                      {procedimento.observacao || "Sem observações"}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    {onEdit && (
                      <motion.button
                        onClick={() => onEdit(procedimento.id)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Editar"
                      >
                        <Edit className="w-4 h-4" />
                      </motion.button>
                    )}
                    {onDelete && (
                      <motion.button
                        onClick={() => onDelete(procedimento.id)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Excluir"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    )}
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
