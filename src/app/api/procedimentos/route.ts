import { NextRequest, NextResponse } from 'next/server'
import { procedimentoService } from '@/lib/services-server'
import { prisma } from '@/lib/database'

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
    console.log('Dados recebidos:', body)
    
    const { idTipoProcedimento, idUsuario, data, observacao } = body
    
    if (!idTipoProcedimento || !idUsuario || !data) {
      return NextResponse.json({ 
        message: 'Dados obrigatórios não fornecidos',
        required: ['idTipoProcedimento', 'idUsuario', 'data']
      }, { status: 400 })
    }

    // Verificar se o tipo de procedimento existe
    const tipoExiste = await prisma.tipoProcedimento.findUnique({
      where: { id: idTipoProcedimento }
    })
    
    if (!tipoExiste) {
      return NextResponse.json({ 
        message: 'Tipo de procedimento não encontrado',
        idTipoProcedimento
      }, { status: 400 })
    }

    // Verificar se o usuário existe
    const usuarioExiste = await prisma.usuario.findUnique({
      where: { id: idUsuario }
    })
    
    if (!usuarioExiste) {
      return NextResponse.json({ 
        message: 'Usuário não encontrado',
        idUsuario
      }, { status: 400 })
    }
    
    // Validar e converter a data
    console.log('Data recebida:', data, 'Tipo:', typeof data);
    const dataProcedimento = new Date(data);
    console.log('Data convertida:', dataProcedimento, 'É válida:', !isNaN(dataProcedimento.getTime()));
    
    if (isNaN(dataProcedimento.getTime())) {
      return NextResponse.json({ 
        message: 'Data inválida fornecida',
        received: data,
        type: typeof data
      }, { status: 400 })
    }
    
    const procedimento = await procedimentoService.criar({
      idTipoProcedimento,
      idUsuario,
      dataProcedimento,
      observacao
    })
    
    console.log('Procedimento criado:', procedimento)
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
