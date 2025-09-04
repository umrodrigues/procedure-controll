"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Save, Calendar, FileText, MessageSquare } from "lucide-react";

interface Procedimento {
  id: number;
  nome: string;
  data: string;
  observacao: string;
}

interface EditProcedimentoModalProps {
  isOpen: boolean;
  onClose: () => void;
  procedimento: Procedimento | null;
  tiposProcedimentos: { id: number; nome: string }[];
  onSave: (id: number, data: { idTipoProcedimento: number; data: string; observacao: string }) => void;
}

export default function EditProcedimentoModal({
  isOpen,
  onClose,
  procedimento,
  tiposProcedimentos,
  onSave
}: EditProcedimentoModalProps) {
  const [formData, setFormData] = useState({
    idTipoProcedimento: 0,
    data: "",
    observacao: ""
  });

  useEffect(() => {
    if (procedimento) {
      const tipoId = tiposProcedimentos.find(t => t.nome === procedimento.nome)?.id || 0;
      setFormData({
        idTipoProcedimento: tipoId,
        data: procedimento.data,
        observacao: procedimento.observacao
      });
    }
  }, [procedimento, tiposProcedimentos]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (procedimento && formData.idTipoProcedimento > 0) {
      onSave(procedimento.id, formData);
      onClose();
    }
  };

  const handleClose = () => {
    setFormData({ idTipoProcedimento: 0, data: "", observacao: "" });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Editar Procedimento</h2>
                <motion.button
                  onClick={handleClose}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FileText className="w-4 h-4 inline mr-2" />
                  Tipo de Procedimento
                </label>
                <select
                  value={formData.idTipoProcedimento}
                  onChange={(e) => setFormData({...formData, idTipoProcedimento: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                >
                  <option value={0}>Selecione um procedimento</option>
                  {tiposProcedimentos.map(tipo => (
                    <option key={tipo.id} value={tipo.id}>{tipo.nome}</option>
                  ))}
                </select>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Data do Procedimento
                </label>
                <input
                  type="date"
                  value={formData.data}
                  onChange={(e) => setFormData({...formData, data: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MessageSquare className="w-4 h-4 inline mr-2" />
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex space-x-3 pt-4"
              >
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Salvar Alterações
                </motion.button>
                <motion.button
                  type="button"
                  onClick={handleClose}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors font-medium"
                >
                  Cancelar
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
