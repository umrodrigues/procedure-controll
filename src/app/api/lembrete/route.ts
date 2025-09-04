import { NextRequest, NextResponse } from 'next/server'
import { enviarLembreteSeNecessario } from '@/lib/lembrete-service'

export async function POST(request: NextRequest) {
  try {
    const resultado = await enviarLembreteSeNecessario()
    
    return NextResponse.json({
      success: true,
      data: resultado
    })
  } catch (error) {
    console.error('Erro no endpoint de lembrete:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Erro interno do servidor'
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { enviarLembreteSeNecessario } = await import('@/lib/lembrete-service')
    const resultado = await enviarLembreteSeNecessario()
    
    return NextResponse.json({
      success: true,
      data: resultado
    })
  } catch (error) {
    console.error('Erro no endpoint de lembrete:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Erro interno do servidor'
    }, { status: 500 })
  }
}
