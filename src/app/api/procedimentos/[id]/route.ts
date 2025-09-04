import { NextRequest, NextResponse } from 'next/server'
import { procedimentoService } from '@/lib/services-server'
import { prisma } from '@/lib/database'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { idTipoProcedimento, data, observacao } = await request.json()
    const { id } = await params
    
    // Verificar se o procedimento existe
    const procedimentoExiste = await prisma.procedimento.findUnique({
      where: { id: parseInt(id) }
    })
    
    if (!procedimentoExiste) {
      return NextResponse.json({ 
        message: 'Procedimento não encontrado' 
      }, { status: 404 })
    }
    
    // Verificar se o tipo de procedimento existe
    const tipoExiste = await prisma.tipoProcedimento.findUnique({
      where: { id: idTipoProcedimento }
    })
    
    if (!tipoExiste) {
      return NextResponse.json({ 
        message: 'Tipo de procedimento não encontrado' 
      }, { status: 400 })
    }
    
    const procedimento = await prisma.procedimento.update({
      where: { id: parseInt(id) },
      data: {
        idTipoProcedimento,
        dataProcedimento: new Date(data),
        observacao
      },
      include: {
        tipoProcedimento: true,
        usuario: true
      }
    })
    
    return NextResponse.json(procedimento)
  } catch (error) {
    console.error('Erro ao atualizar procedimento:', error)
    return NextResponse.json({ 
      message: 'Erro interno do servidor',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    // Verificar se o procedimento existe
    const procedimentoExiste = await prisma.procedimento.findUnique({
      where: { id: parseInt(id) }
    })
    
    if (!procedimentoExiste) {
      return NextResponse.json({ 
        message: 'Procedimento não encontrado' 
      }, { status: 404 })
    }
    
    await prisma.procedimento.delete({
      where: { id: parseInt(id) }
    })
    
    return NextResponse.json({ message: 'Procedimento excluído com sucesso' })
  } catch (error) {
    console.error('Erro ao excluir procedimento:', error)
    return NextResponse.json({ 
      message: 'Erro interno do servidor',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    }, { status: 500 })
  }
}
