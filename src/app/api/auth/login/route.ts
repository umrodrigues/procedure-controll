import { NextRequest, NextResponse } from 'next/server'
import { usuarioService } from '@/lib/services-server'

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username e password são obrigatórios' },
        { status: 400 }
      )
    }

    const usuario = await usuarioService.autenticar(username, password)

    if (usuario) {
      return NextResponse.json({
        success: true,
        usuario: {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email
        }
      })
    } else {
      return NextResponse.json(
        { error: 'Credenciais inválidas' },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Erro na autenticação:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
