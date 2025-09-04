import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
import { useState } from "react";

interface ProcedimentoFormProps {
  showForm: boolean;
  onToggleForm: () => void;
  onSubmit: (data: { idTipoProcedimento: number; data: string; observacao: string }) => void;
  procedimentosDisponiveis: { id: number; nome: string }[];
}

export default function ProcedimentoForm({ 
  showForm, 
  onToggleForm, 
  onSubmit, 
  procedimentosDisponiveis 
}: ProcedimentoFormProps) {
  const [formData, setFormData] = useState({
    idTipoProcedimento: 0,
    data: "",
    observacao: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.idTipoProcedimento === 0) {
      return;
    }
    onSubmit(formData);
    setFormData({ idTipoProcedimento: 0, data: "", observacao: "" });
  };

  const formVariants = {
    hidden: { opacity: 0, height: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      height: "auto", 
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      height: 0, 
      scale: 0.8,
      transition: { duration: 0.3 }
    }
  };

  const fieldVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div 
      data-form="procedimento" 
      className={`bg-white rounded-xl shadow-sm border p-6 hover:shadow-lg transition-all duration-300 ${
        showForm ? 'border-blue-300 shadow-lg ring-2 ring-blue-100' : 'border-gray-200'
      }`}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Cadastrar Procedimento</h2>
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          <Plus className="w-5 h-5 text-gray-400" />
        </motion.div>
      </div>
      
      <AnimatePresence mode="wait">
        {!showForm ? (
          <motion.button
            key="add-button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onToggleForm}
            className="w-full py-3 px-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors"
          >
            <Plus className="w-6 h-6 mx-auto mb-2" />
            <span>Adicionar Novo Procedimento</span>
          </motion.button>
        ) : (
          <motion.form
            key="form"
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <motion.div variants={fieldVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Procedimento
              </label>
              <select
                value={formData.idTipoProcedimento}
                onChange={(e) => setFormData({...formData, idTipoProcedimento: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              >
                <option value={0}>Selecione um procedimento</option>
                {procedimentosDisponiveis.map(proc => (
                  <option key={proc.id} value={proc.id}>{proc.nome}</option>
                ))}
              </select>
            </motion.div>

            <motion.div variants={fieldVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data
              </label>
              <input
                type="date"
                value={formData.data}
                onChange={(e) => setFormData({...formData, data: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
            </motion.div>

            <motion.div variants={fieldVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Observação
              </label>
              <textarea
                value={formData.observacao}
                onChange={(e) => setFormData({...formData, observacao: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                rows={3}
                placeholder="Digite uma observação..."
              />
            </motion.div>

            <motion.div 
              variants={fieldVariants}
              className="flex space-x-3"
            >
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Cadastrar
              </motion.button>
              <motion.button
                type="button"
                onClick={onToggleForm}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancelar
              </motion.button>
            </motion.div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
