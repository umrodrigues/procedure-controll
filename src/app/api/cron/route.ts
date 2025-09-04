import { NextRequest, NextResponse } from 'next/server'
import { enviarLembreteSeNecessario } from '@/lib/lembrete-service'

export async function GET(request: NextRequest) {
  try {
    // Verificar autenticação do cron job
    if (request.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    console.log('Cron job executado:', new Date().toISOString())
    
    const resultado = await enviarLembreteSeNecessario()
    
    return NextResponse.json({
      success: true,
      data: resultado,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Erro no cron job de lembrete:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Erro interno do servidor',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
