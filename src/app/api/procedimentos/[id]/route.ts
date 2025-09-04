import { NextRequest, NextResponse } from 'next/server'
import { procedimentoService } from '@/lib/services-server'
import { prisma } from '@/lib/database'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { idTipoProcedimento, dataProcedimento, observacao } = await request.json()
    
    const procedimento = await prisma.procedimento.update({
      where: { id: parseInt(params.id) },
      data: {
        idTipoProcedimento,
        dataProcedimento: new Date(dataProcedimento),
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
    return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.procedimento.delete({
      where: { id: parseInt(params.id) }
    })
    
    return NextResponse.json({ message: 'Procedimento excluído com sucesso' })
  } catch (error) {
    console.error('Erro ao excluir procedimento:', error)
    return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 })
  }
}
