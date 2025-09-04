import { NextRequest, NextResponse } from 'next/server'
import { procedimentoService } from '@/lib/services-server'

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
    const { idTipoProcedimento, idUsuario, dataProcedimento, observacao } = await request.json()
    
    const procedimento = await procedimentoService.criar({
      idTipoProcedimento,
      idUsuario,
      dataProcedimento: new Date(dataProcedimento),
      observacao
    })
    
    return NextResponse.json(procedimento, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar procedimento:', error)
    return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 })
  }
}
