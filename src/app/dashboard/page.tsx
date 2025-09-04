"use client";

import { useState, useEffect } from "react";
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
import { Procedimento as ProcedimentoDB, TipoProcedimento } from "@/lib/services";

export default function DashboardPage() {
  const [procedimentos] = useState<ProcedimentoDB[]>([]);
  const [tiposProcedimentos] = useState<TipoProcedimento[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mesAtual] = useState(0);

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

  const handleSubmit = (data: { idTipoProcedimento: number; data: string; observacao: string }) => {
    console.log("Novo procedimento cadastrado:", data);
  };

  const handleNovoTipo = (novoTipo: string) => {
    console.log("Novo tipo de procedimento adicionado:", novoTipo);
  };

  const handleLogout = () => {
    window.location.href = "/";
  };

  useEffect(() => {
    setLoading(false);
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
            procedimentosExistentes={tiposProcedimentos.map(t => t.nome)}
          />
        </div>

        <div className="mt-6 sm:mt-8">
          {procedimentos.length > 0 ? (
            <AnimatedTable
              procedimentos={procedimentos.map(p => ({
                id: p.id,
                nome: p.tipoProcedimento.nome,
                data: p.dataProcedimento.toISOString().split('T')[0],
                observacao: p.observacao || ''
              }))}
              delay={0.5}
            />
          ) : (
            <EmptyState
              icon={Inbox}
              title="Nenhum Procedimento Cadastrado"
              description="Comece cadastrando seu primeiro procedimento médico usando o formulário acima."
              actionText="Cadastrar Primeiro Procedimento"
              onAction={() => setShowForm(true)}
              variant="default"
            />
          )}
        </div>
          </>
        )}
      </main>
    </div>
  );
}
