import { NextRequest, NextResponse } from 'next/server'
import { tipoProcedimentoService } from '@/lib/services-server'

export async function GET() {
  try {
    const tipos = await tipoProcedimentoService.listarTodos()
    return NextResponse.json(tipos)
  } catch (error) {
    console.error('Erro ao listar tipos de procedimentos:', error)
    return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { nome, descricao } = await request.json()
    
    const tipo = await tipoProcedimentoService.criar(nome, descricao)
    return NextResponse.json(tipo, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar tipo de procedimento:', error)
    return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 })
  }
}

export const dynamic = 'force-dynamic'
