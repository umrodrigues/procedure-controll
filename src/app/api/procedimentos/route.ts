import { NextRequest, NextResponse } from 'next/server'
import { procedimentoService, tipoProcedimentoService, usuarioService } from '@/lib/services-server'

export async function GET() {
  try {
    const procedimentos = await procedimentoService.listarTodos()
    return NextResponse.json(procedimentos)
  } catch (error) {
    console.error('Erro ao listar procedimentos:', error)
    return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const { idTipoProcedimento, idUsuario, data, observacao } = body
    
    if (!idTipoProcedimento || !idUsuario || !data) {
      return NextResponse.json({ 
        message: 'Dados obrigatórios não fornecidos',
        required: ['idTipoProcedimento', 'idUsuario', 'data']
      }, { status: 400 })
    }

    const tipoExiste = await tipoProcedimentoService.buscarPorId(idTipoProcedimento)
    
    if (!tipoExiste) {
      return NextResponse.json({ 
        message: 'Tipo de procedimento não encontrado',
        idTipoProcedimento
      }, { status: 400 })
    }

    const usuarioExiste = await usuarioService.buscarPorId(idUsuario)
    
    if (!usuarioExiste) {
      return NextResponse.json({ 
        message: 'Usuário não encontrado',
        idUsuario
      }, { status: 400 })
    }
    
    const [ano, mes, dia] = data.split('-').map(Number);
    const dataProcedimento = new Date(Date.UTC(ano, mes - 1, dia, 12, 0, 0, 0));
    
    const procedimento = await procedimentoService.criar({
      idTipoProcedimento,
      idUsuario,
      dataProcedimento,
      observacao
    })
    
    return NextResponse.json(procedimento, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar procedimento:', error)
    return NextResponse.json({ 
      message: 'Erro interno do servidor',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    }, { status: 500 })
  }
}

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const preferredRegion = 'auto'
