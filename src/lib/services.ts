// Serviços do cliente - sem acesso direto ao banco

export interface Procedimento {
  id: number
  idTipoProcedimento: number
  idUsuario: number
  dataProcedimento: Date
  observacao?: string
  dataCriacao: Date
  dataAtualizacao: Date
  tipoProcedimento: {
    id: number
    nome: string
    descricao?: string
  }
  usuario: {
    id: number
    nome: string
    email: string
  }
}

export interface TipoProcedimento {
  id: number
  nome: string
  descricao?: string
  ativo: boolean
}

export interface Usuario {
  id: number
  nome: string
  email: string
  ativo: boolean
}

// Outros serviços serão implementados via API routes

export const usuarioService = {
  async autenticar(login: string, senha: string): Promise<Usuario | null> {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: login, password: senha }),
      })

      if (response.ok) {
        const data = await response.json()
        return data.usuario
      } else {
        return null
      }
    } catch (error) {
      console.error('Erro na autenticação:', error)
      return null
    }
  }
}
