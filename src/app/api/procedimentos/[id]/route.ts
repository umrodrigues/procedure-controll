import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/database'
import { tipoProcedimentoService } from '@/lib/services-server'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { idTipoProcedimento, data, observacao } = await request.json()
    const { id } = await params
    
    const procedimentoExiste = await prisma.procedimento.findUnique({
      where: { id: parseInt(id) }
    })
    
    if (!procedimentoExiste) {
      return NextResponse.json({ 
        message: 'Procedimento não encontrado' 
      }, { status: 404 })
    }
    
    const tipoExiste = await tipoProcedimentoService.buscarPorId(idTipoProcedimento)
    
    if (!tipoExiste) {
      return NextResponse.json({ 
        message: 'Tipo de procedimento não encontrado' 
      }, { status: 400 })
    }
    
    const procedimento = await prisma.procedimento.update({
      where: { id: parseInt(id) },
      data: {
        idTipoProcedimento,
        dataProcedimento: (() => {
          const [ano, mes, dia] = data.split('-').map(Number);
          return new Date(ano, mes - 1, dia, 12, 0, 0, 0);
        })(),
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

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const preferredRegion = 'auto'
