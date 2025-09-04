import { motion, AnimatePresence, Variants } from "framer-motion";
import { Plus, FileText, Edit2, Trash2 } from "lucide-react";
import { useState } from "react";

interface TipoProcedimento {
  id: number;
  nome: string;
  descricao?: string;
  ativo: boolean;
}

interface NovoTipoProcedimentoProps {
  onNovoTipo: (novoTipo: string) => void;
  procedimentosExistentes: TipoProcedimento[];
  onEditarTipo: (id: number, nome: string, descricao?: string) => void;
  onExcluirTipo: (id: number) => void;
}

export default function NovoTipoProcedimento({ 
  onNovoTipo, 
  procedimentosExistentes,
  onEditarTipo,
  onExcluirTipo
}: NovoTipoProcedimentoProps) {
  const [showForm, setShowForm] = useState(false);
  const [novoTipo, setNovoTipo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [editandoNome, setEditandoNome] = useState("");
  const [editandoDescricao, setEditandoDescricao] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (novoTipo.trim() && !procedimentosExistentes.some(p => p.nome.toLowerCase() === novoTipo.trim().toLowerCase())) {
      onNovoTipo(novoTipo.trim());
      setNovoTipo("");
      setDescricao("");
      setShowForm(false);
    }
  };

  const handleEditar = (tipo: TipoProcedimento) => {
    setEditandoId(tipo.id);
    setEditandoNome(tipo.nome);
    setEditandoDescricao(tipo.descricao || "");
  };

  const handleSalvarEdicao = () => {
    if (editandoId && editandoNome.trim()) {
      onEditarTipo(editandoId, editandoNome.trim(), editandoDescricao.trim() || undefined);
      setEditandoId(null);
      setEditandoNome("");
      setEditandoDescricao("");
    }
  };

  const handleCancelarEdicao = () => {
    setEditandoId(null);
    setEditandoNome("");
    setEditandoDescricao("");
  };

  const handleExcluir = (id: number) => {
    onExcluirTipo(id);
  };

  const formVariants: Variants = {
    hidden: { opacity: 0, height: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      height: "auto", 
      scale: 1,
      transition: {
        type: "spring",
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

  const fieldVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Tipos de Procedimentos</h2>
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          <FileText className="w-5 h-5 text-gray-400" />
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
            onClick={() => setShowForm(true)}
            className="w-full py-3 px-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-green-400 hover:text-green-600 transition-colors"
          >
            <Plus className="w-6 h-6 mx-auto mb-2" />
            <span>Adicionar Novo Tipo de Procedimento</span>
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
                Nome do Procedimento
              </label>
              <input
                type="text"
                value={novoTipo}
                onChange={(e) => setNovoTipo(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                placeholder="Ex: Tomografia Computadorizada"
                required
              />
            </motion.div>

            <motion.div variants={fieldVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição (Opcional)
              </label>
              <textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                rows={2}
                placeholder="Descrição detalhada do procedimento..."
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
                className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
              >
                Adicionar Tipo
              </motion.button>
              <motion.button
                type="button"
                onClick={() => setShowForm(false)}
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

      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Tipos Disponíveis:</h3>
        {procedimentosExistentes.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center py-4 text-gray-500"
          >
            <p className="text-sm">Nenhum tipo de procedimento cadastrado ainda.</p>
            <p className="text-xs mt-1">Adicione o primeiro tipo usando o formulário acima.</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto">
            {procedimentosExistentes.map((tipo, index) => (
              <motion.div
                key={tipo.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group relative px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-700 border border-gray-200 hover:bg-gray-100 transition-colors"
              >
                {editandoId === tipo.id ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={editandoNome}
                      onChange={(e) => setEditandoNome(e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                      autoFocus
                    />
                    <textarea
                      value={editandoDescricao}
                      onChange={(e) => setEditandoDescricao(e.target.value)}
                      className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                      rows={2}
                      placeholder="Descrição (opcional)"
                    />
                    <div className="flex space-x-1">
                      <button
                        onClick={handleSalvarEdicao}
                        className="px-2 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                      >
                        Salvar
                      </button>
                      <button
                        onClick={handleCancelarEdicao}
                        className="px-2 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="font-medium">{tipo.nome}</div>
                      {tipo.descricao && (
                        <div className="text-xs text-gray-500 mt-1">{tipo.descricao}</div>
                      )}
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1 ml-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleEditar(tipo)}
                        className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                        title="Editar"
                      >
                        <Edit2 className="w-3 h-3" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleExcluir(tipo.id)}
                        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                        title="Excluir"
                      >
                        <Trash2 className="w-3 h-3" />
                      </motion.button>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
