import { prisma } from './database'
import bcrypt from 'bcryptjs'

export interface Procedimento {
  id: number
  idTipoProcedimento: number
  idUsuario: number
  dataProcedimento: Date
  observacao?: string
  dataCriacao: Date
  dataAtualizacao: Date
  tipoProcedimento: {
    id: number
    nome: string
    descricao?: string
  }
  usuario: {
    id: number
    nome: string
    email: string
  }
}

export interface TipoProcedimento {
  id: number
  nome: string
  descricao?: string
  ativo: boolean
}

export interface Usuario {
  id: number
  nome: string
  email: string
  ativo: boolean
}

export const procedimentoService = {
  async listarTodos(): Promise<Procedimento[]> {
    return await prisma.procedimento.findMany({
      include: {
        tipoProcedimento: true,
        usuario: true
      },
      orderBy: {
        dataProcedimento: 'desc'
      }
    })
  },

  async criar(dados: {
    idTipoProcedimento: number
    idUsuario: number
    dataProcedimento: Date
    observacao?: string
  }): Promise<Procedimento> {
    return await prisma.procedimento.create({
      data: dados,
      include: {
        tipoProcedimento: true,
        usuario: true
      }
    })
  },

  async contarTotal(): Promise<number> {
    return await prisma.procedimento.count()
  },

  async topProcedimentos(limite: number = 3): Promise<Array<{ tipo: string; quantidade: number }>> {
    const resultado = await prisma.procedimento.groupBy({
      by: ['idTipoProcedimento'],
      _count: {
        idTipoProcedimento: true
      },
      orderBy: {
        _count: {
          idTipoProcedimento: 'desc'
        }
      },
      take: limite
    })

    const tipos = await prisma.tipoProcedimento.findMany({
      where: {
        id: {
          in: resultado.map((r: { idTipoProcedimento: number; _count: { idTipoProcedimento: number } }) => r.idTipoProcedimento)
        }
      }
    })

    return resultado.map((r: { idTipoProcedimento: number; _count: { idTipoProcedimento: number } }) => {
      const tipo = tipos.find((t: { id: number; nome: string }) => t.id === r.idTipoProcedimento)
      return {
        tipo: tipo?.nome || 'Desconhecido',
        quantidade: r._count.idTipoProcedimento
      }
    })
  }
}

export const tipoProcedimentoService = {
  async listarTodos(): Promise<TipoProcedimento[]> {
    return await prisma.tipoProcedimento.findMany({
      where: { ativo: true },
      orderBy: { nome: 'asc' }
    })
  },

  async criar(nome: string, descricao?: string): Promise<TipoProcedimento> {
    return await prisma.tipoProcedimento.create({
      data: { nome, descricao }
    })
  },

  async verificarExistente(nome: string): Promise<boolean> {
    const existente = await prisma.tipoProcedimento.findFirst({
      where: { nome: { equals: nome, mode: 'insensitive' } }
    })
    return !!existente
  }
}

export const usuarioService = {
  async autenticar(login: string, senha: string): Promise<Usuario | null> {
    const usuario = await prisma.usuario.findFirst({
      where: { 
        OR: [
          { email: login.toLowerCase() },
          { nome: login }
        ],
        ativo: true
      }
    })

    if (!usuario) return null

    const senhaCorreta = await bcrypt.compare(senha, usuario.senhaHash)
    return senhaCorreta ? {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      ativo: usuario.ativo
    } : null
  }
}
