import { prisma } from './database'
import { sendEmail, createLembreteEmailHTML } from './email-service'

export async function verificarProcedimentosHoje(): Promise<boolean> {
  try {
    const hoje = new Date()
    const inicioDoDia = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate())
    const fimDoDia = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate(), 23, 59, 59)

    const procedimentosHoje = await prisma.procedimento.count({
      where: {
        dataCriacao: {
          gte: inicioDoDia,
          lte: fimDoDia,
        },
      },
    })

    return procedimentosHoje > 0
  } catch (error) {
    console.error('Erro ao verificar procedimentos de hoje:', error)
    return false
  }
}

export async function verificarEmailEnviadoHoje(): Promise<boolean> {
  try {
    const hoje = new Date()
    const inicioDoDia = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate())
    const fimDoDia = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate(), 23, 59, 59)

    const emailEnviado = await prisma.emailLembrete.findFirst({
      where: {
        dataEnvio: {
          gte: inicioDoDia,
          lte: fimDoDia,
        },
      },
    })

    return !!emailEnviado
  } catch (error) {
    console.error('Erro ao verificar email enviado hoje:', error)
    return false
  }
}

export async function registrarEmailEnviado(): Promise<void> {
  try {
    await prisma.emailLembrete.create({
      data: {
        dataEnvio: new Date(),
      },
    })
  } catch (error) {
    console.error('Erro ao registrar email enviado:', error)
  }
}

export async function enviarLembreteSeNecessario(): Promise<{ enviado: boolean; motivo: string }> {
  try {
    const temProcedimentos = await verificarProcedimentosHoje()
    
    if (temProcedimentos) {
      return {
        enviado: false,
        motivo: 'Já existem procedimentos registrados hoje'
      }
    }

    const emailJaEnviado = await verificarEmailEnviadoHoje()
    
    if (emailJaEnviado) {
      return {
        enviado: false,
        motivo: 'Email de lembrete já foi enviado hoje'
      }
    }

    const emailHTML = createLembreteEmailHTML()
    const emailEnviado = await sendEmail({
      to: 'carolinath03@gmail.com',
      subject: '🔔 Lembrete: Nenhum procedimento registrado hoje',
      html: emailHTML,
    })

    if (emailEnviado) {
      await registrarEmailEnviado()
      return {
        enviado: true,
        motivo: 'Email de lembrete enviado com sucesso'
      }
    } else {
      return {
        enviado: false,
        motivo: 'Erro ao enviar email'
      }
    }
  } catch (error) {
    console.error('Erro ao processar lembrete:', error)
    return {
      enviado: false,
      motivo: 'Erro interno do servidor'
    }
  }
}
