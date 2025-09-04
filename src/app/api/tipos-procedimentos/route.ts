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
    
    if (!nome || nome.trim().length === 0) {
      return NextResponse.json({ message: 'Nome é obrigatório' }, { status: 400 })
    }

    const tipoExistente = await tipoProcedimentoService.verificarExistente(nome.trim())
    if (tipoExistente) {
      return NextResponse.json({ message: 'Tipo de procedimento já existe' }, { status: 409 })
    }

    const tipo = await tipoProcedimentoService.criar(nome.trim(), descricao?.trim() || null)
    return NextResponse.json(tipo, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar tipo de procedimento:', error)
    return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, nome, descricao } = await request.json()
    
    if (!id || !nome || nome.trim().length === 0) {
      return NextResponse.json({ message: 'ID e nome são obrigatórios' }, { status: 400 })
    }

    const tipoExistente = await tipoProcedimentoService.verificarExistente(nome.trim())
    if (tipoExistente) {
      const tipoExistenteCompleto = await tipoProcedimentoService.buscarPorId(parseInt(id))
      if (!tipoExistenteCompleto || tipoExistenteCompleto.id !== parseInt(id)) {
        return NextResponse.json({ message: 'Tipo de procedimento já existe' }, { status: 409 })
      }
    }

    const tipoAtualizado = await tipoProcedimentoService.atualizar(parseInt(id), nome.trim(), descricao?.trim() || null)
    return NextResponse.json(tipoAtualizado)
  } catch (error) {
    console.error('Erro ao atualizar tipo de procedimento:', error)
    return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ message: 'ID é obrigatório' }, { status: 400 })
    }

    await tipoProcedimentoService.excluir(parseInt(id))
    return NextResponse.json({ message: 'Tipo de procedimento excluído com sucesso' })
  } catch (error) {
    console.error('Erro ao excluir tipo de procedimento:', error)
    return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 })
  }
}

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const preferredRegion = 'auto'
