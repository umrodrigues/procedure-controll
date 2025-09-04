"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  LogOut,
  Activity,
  BarChart3,
  Inbox
} from "lucide-react";
import StatCard from "../../components/ui/StatCard";
import RankingCard from "../../components/ui/RankingCard";
import ProcedimentoForm from "../../components/ui/ProcedimentoForm";
import AnimatedTable from "../../components/ui/AnimatedTable";
import NovoTipoProcedimento from "../../components/ui/NovoTipoProcedimento";
import EmptyState from "../../components/ui/EmptyState";
import EditProcedimentoModal from "../../components/ui/EditProcedimentoModal";
import ConfirmModal from "../../components/ui/ConfirmModal";
import { Procedimento as ProcedimentoDB, TipoProcedimento } from "@/lib/services";

type ProcedimentoFromAPI = Omit<ProcedimentoDB, 'dataProcedimento' | 'dataCriacao' | 'dataAtualizacao'> & {
  dataProcedimento: string;
  dataCriacao: string;
  dataAtualizacao: string;
};
import { useAlert } from "@/components/ui/Alert";
import { useLoadingStore } from "@/lib/store";

export default function DashboardPage() {
  const [procedimentos, setProcedimentos] = useState<ProcedimentoFromAPI[]>([]);
  const [tiposProcedimentos, setTiposProcedimentos] = useState<TipoProcedimento[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLocalLoading] = useState(true);
  const [mesAtual] = useState(0);
  const [editModal, setEditModal] = useState<{ isOpen: boolean; procedimento: { id: number; nome: string; data: string; observacao: string } | null }>({ isOpen: false, procedimento: null });
  const [confirmModal, setConfirmModal] = useState<{ isOpen: boolean; id: number | null; message: string }>({ isOpen: false, id: null, message: '' });
  const [confirmTipoModal, setConfirmTipoModal] = useState<{ isOpen: boolean; id: number | null; message: string }>({ isOpen: false, id: null, message: '' });
  const { showAlert, AlertContainer } = useAlert();
  const { setLoading } = useLoadingStore();
  
  const setLoadingRef = useRef(setLoading);
  const showAlertRef = useRef(showAlert);
  
  setLoadingRef.current = setLoading;
  showAlertRef.current = showAlert;

  const totalProcedimentos = procedimentos.length;
  const procedimentosEsteMes = procedimentos.filter(p => new Date(p.dataProcedimento).getMonth() === mesAtual).length;
  const tiposDiferentes = tiposProcedimentos.length;
  
  const topProcedimentos = procedimentos.reduce((acc, proc) => {
    const tipo = proc.tipoProcedimento.nome;
    acc[tipo] = (acc[tipo] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const top3Procedimentos = Object.entries(topProcedimentos)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3)
    .map(([nome, quantidade]) => ({ nome, quantidade }));

  const handleSubmit = async (data: { idTipoProcedimento: number; data: string; observacao: string }) => {
    setLoading(true, 'Cadastrando procedimento...');
    try {
      const response = await fetch('/api/procedimentos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          idUsuario: 1 // Usuário logado (admin)
        })
      });

      if (response.ok) {
        const novoProcedimento = await response.json();
        setProcedimentos(prev => [novoProcedimento, ...prev]);
        setShowForm(false);
        showAlert({
          type: 'success',
          title: 'Sucesso!',
          message: 'Procedimento cadastrado com sucesso!'
        });
      } else {
        showAlert({
          type: 'error',
          title: 'Erro!',
          message: 'Erro ao cadastrar procedimento. Tente novamente.'
        });
      }
    } catch (error) {
      console.error('Erro ao criar procedimento:', error);
      showAlert({
        type: 'error',
        title: 'Erro!',
        message: 'Erro de conexão. Verifique sua internet e tente novamente.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNovoTipo = async (novoTipo: string) => {
    setLoading(true, 'Criando tipo de procedimento...');
    try {
      const response = await fetch('/api/tipos-procedimentos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: novoTipo })
      });

      if (response.ok) {
        const novoTipoCriado = await response.json();
        setTiposProcedimentos(prev => [...prev, novoTipoCriado]);
        showAlert({
          type: 'success',
          title: 'Sucesso!',
          message: 'Tipo de procedimento criado com sucesso!'
        });
      } else {
        showAlert({
          type: 'error',
          title: 'Erro!',
          message: 'Erro ao criar tipo de procedimento. Tente novamente.'
        });
      }
    } catch (error) {
      console.error('Erro ao criar tipo de procedimento:', error);
      showAlert({
        type: 'error',
        title: 'Erro!',
        message: 'Erro de conexão. Verifique sua internet e tente novamente.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditarTipo = async (id: number, nome: string, descricao?: string) => {
    setLoading(true, 'Atualizando tipo de procedimento...');
    try {
      const response = await fetch('/api/tipos-procedimentos', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, nome, descricao })
      });

      if (response.ok) {
        const tipoAtualizado = await response.json();
        setTiposProcedimentos(prev => 
          prev.map(tipo => tipo.id === id ? tipoAtualizado : tipo)
        );
        showAlert({
          type: 'success',
          title: 'Sucesso!',
          message: 'Tipo de procedimento atualizado com sucesso!'
        });
      } else {
        showAlert({
          type: 'error',
          title: 'Erro!',
          message: 'Erro ao atualizar tipo de procedimento. Tente novamente.'
        });
      }
    } catch (error) {
      console.error('Erro ao atualizar tipo de procedimento:', error);
      showAlert({
        type: 'error',
        title: 'Erro!',
        message: 'Erro de conexão. Verifique sua internet e tente novamente.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleExcluirTipo = (id: number) => {
    const tipo = tiposProcedimentos.find(t => t.id === id);
    const nomeTipo = tipo?.nome || 'este tipo de procedimento';
    
    setConfirmTipoModal({
      isOpen: true,
      id: id,
      message: `Tem certeza que deseja excluir "${nomeTipo}"? Esta ação não pode ser desfeita.`
    });
  };

  const confirmDeleteTipo = async () => {
    if (!confirmTipoModal.id) return;
    
    setLoading(true, 'Excluindo tipo de procedimento...');
    try {
      const response = await fetch(`/api/tipos-procedimentos?id=${confirmTipoModal.id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setTiposProcedimentos(prev => prev.filter(tipo => tipo.id !== confirmTipoModal.id));
        showAlert({
          type: 'success',
          title: 'Sucesso!',
          message: 'Tipo de procedimento excluído com sucesso!'
        });
      } else {
        showAlert({
          type: 'error',
          title: 'Erro!',
          message: 'Erro ao excluir tipo de procedimento. Tente novamente.'
        });
      }
    } catch (error) {
      console.error('Erro ao excluir tipo de procedimento:', error);
      showAlert({
        type: 'error',
        title: 'Erro!',
        message: 'Erro de conexão. Verifique sua internet e tente novamente.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (id: number) => {
    const procedimento = procedimentos.find(p => p.id === id);
    if (procedimento) {
      setEditModal({
        isOpen: true,
        procedimento: {
          id: procedimento.id,
          nome: procedimento.tipoProcedimento.nome,
          data: new Date(procedimento.dataProcedimento).toISOString().split('T')[0],
          observacao: procedimento.observacao || ''
        }
      });
    }
  };

  const handleSaveEdit = async (id: number, data: { idTipoProcedimento: number; data: string; observacao: string }) => {
    setLoading(true, 'Salvando alterações...');
    try {
      const response = await fetch(`/api/procedimentos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        const procedimentoAtualizado = await response.json();
        setProcedimentos(prev => prev.map(p => p.id === id ? procedimentoAtualizado : p));
        showAlert({
          type: 'success',
          title: 'Sucesso!',
          message: 'Procedimento atualizado com sucesso!'
        });
      } else {
        showAlert({
          type: 'error',
          title: 'Erro!',
          message: 'Erro ao atualizar procedimento. Tente novamente.'
        });
      }
    } catch (error) {
      console.error('Erro ao atualizar procedimento:', error);
      showAlert({
        type: 'error',
        title: 'Erro!',
        message: 'Erro de conexão. Verifique sua internet e tente novamente.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: number) => {
    const procedimento = procedimentos.find(p => p.id === id);
    const nomeProcedimento = procedimento?.tipoProcedimento.nome || 'este procedimento';
    
    setConfirmModal({
      isOpen: true,
      id: id,
      message: `Tem certeza que deseja excluir ${nomeProcedimento}? Esta ação não pode ser desfeita.`
    });
  };

  const confirmDelete = async () => {
    if (!confirmModal.id) return;
    
    setLoading(true, 'Excluindo procedimento...');
    try {
      const response = await fetch(`/api/procedimentos/${confirmModal.id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setProcedimentos(prev => prev.filter(p => p.id !== confirmModal.id));
        showAlert({
          type: 'success',
          title: 'Sucesso!',
          message: 'Procedimento excluído com sucesso!'
        });
      } else {
        const errorData = await response.json();
        showAlert({
          type: 'error',
          title: 'Erro!',
          message: errorData.message || 'Erro ao excluir procedimento. Tente novamente.'
        });
      }
    } catch (error) {
      console.error('Erro ao excluir procedimento:', error);
      showAlert({
        type: 'error',
        title: 'Erro!',
        message: 'Erro de conexão. Verifique sua internet e tente novamente.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    window.location.href = "/";
  };

  useEffect(() => {
    const carregarDados = async () => {
      setLoadingRef.current(true, 'Carregando dados...');
      try {
        const [procedimentosRes, tiposRes] = await Promise.all([
          fetch('/api/procedimentos'),
          fetch('/api/tipos-procedimentos')
        ]);

        if (procedimentosRes.ok) {
          const procedimentosData = await procedimentosRes.json();
          setProcedimentos(procedimentosData);
        } else {
          showAlertRef.current({
            type: 'error',
            title: 'Erro!',
            message: 'Erro ao carregar procedimentos.'
          });
        }

        if (tiposRes.ok) {
          const tiposData = await tiposRes.json();
          setTiposProcedimentos(tiposData);
        } else {
          showAlertRef.current({
            type: 'error',
            title: 'Erro!',
            message: 'Erro ao carregar tipos de procedimentos.'
          });
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        showAlertRef.current({
          type: 'error',
          title: 'Erro!',
          message: 'Erro de conexão ao carregar dados.'
        });
      } finally {
        setLoadingRef.current(false);
        setLocalLoading(false);
      }
    };

    carregarDados();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <header className="bg-white/80 backdrop-blur-xl shadow-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12">
                <iframe
                  src="https://lottie.host/embed/6cfb87b6-e42f-4e00-992b-f719343d8834/AtIh7Cj2lN.lottie"
                  style={{ width: '100%', height: '100%', border: 'none' }}
                  title="Dashboard Animation"
                />
              </div>
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
                Controle de Procedimentos Médicos
              </h1>
            </div>
            <motion.button
              onClick={handleLogout}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg sm:rounded-xl transition-all duration-200 font-medium text-sm sm:text-base"
            >
              <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Sair</span>
            </motion.button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 md:py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
          <StatCard
            title="Total de Procedimentos"
            value={totalProcedimentos}
            icon={Activity}
            color="bg-blue-500"
            delay={0}
          />
          <StatCard
            title="Este Mês"
            value={procedimentosEsteMes}
            icon={TrendingUp}
            color="bg-green-500"
            delay={0.1}
          />
          <StatCard
            title="Tipos Diferentes"
            value={tiposDiferentes}
            icon={BarChart3}
            color="bg-purple-500"
            delay={0.2}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
          {top3Procedimentos.length > 0 ? (
            <RankingCard
              title="Top 3 Procedimentos"
              items={top3Procedimentos}
              delay={0.3}
            />
          ) : (
            <EmptyState
              icon={BarChart3}
              title="Nenhum Procedimento Registrado"
              description="Quando você cadastrar procedimentos, eles aparecerão aqui em um ranking dos mais realizados."
              variant="info"
            />
          )}
          
          <ProcedimentoForm
            showForm={showForm}
            onToggleForm={() => setShowForm(!showForm)}
            onSubmit={handleSubmit}
            procedimentosDisponiveis={tiposProcedimentos.map(t => ({ id: t.id, nome: t.nome }))}
          />
        </div>

        <div className="mb-6 sm:mb-8">
          <NovoTipoProcedimento
            onNovoTipo={handleNovoTipo}
            procedimentosExistentes={tiposProcedimentos}
            onEditarTipo={handleEditarTipo}
            onExcluirTipo={handleExcluirTipo}
          />
        </div>

        <div className="mt-6 sm:mt-8">
          {procedimentos.length > 0 ? (
            <AnimatedTable
              procedimentos={procedimentos.map(p => ({
                id: p.id,
                nome: p.tipoProcedimento.nome,
                data: new Date(p.dataProcedimento).toISOString().split('T')[0],
                observacao: p.observacao || ''
              }))}
              delay={0.5}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ) : (
            <EmptyState
              icon={Inbox}
              title="Nenhum Procedimento Cadastrado"
              description="Comece cadastrando seu primeiro procedimento médico usando o formulário acima."
              actionText="Cadastrar Primeiro Procedimento"
              onAction={() => {
                setShowForm(true);
                setTimeout(() => {
                  const formElement = document.querySelector('[data-form="procedimento"]');
                  if (formElement) {
                    formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }
                }, 100);
              }}
              variant="default"
            />
          )}
        </div>
          </>
        )}
      </main>
      
      <EditProcedimentoModal
        isOpen={editModal.isOpen}
        onClose={() => setEditModal({ isOpen: false, procedimento: null })}
        procedimento={editModal.procedimento}
        tiposProcedimentos={tiposProcedimentos.map(t => ({ id: t.id, nome: t.nome }))}
        onSave={handleSaveEdit}
      />
      
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ isOpen: false, id: null, message: '' })}
        onConfirm={confirmDelete}
        title="Confirmar Exclusão"
        message={confirmModal.message}
        confirmText="Excluir"
        cancelText="Cancelar"
        type="danger"
      />
      
      <ConfirmModal
        isOpen={confirmTipoModal.isOpen}
        onClose={() => setConfirmTipoModal({ isOpen: false, id: null, message: '' })}
        onConfirm={confirmDeleteTipo}
        title="Confirmar Exclusão"
        message={confirmTipoModal.message}
        confirmText="Excluir"
        cancelText="Cancelar"
        type="danger"
      />
      
      <AlertContainer />
    </div>
  );
}
