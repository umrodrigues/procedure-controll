const { enviarLembreteSeNecessario } = require('../src/lib/lembrete-service')

async function executarLembrete() {
  try {
    console.log('Iniciando verificação de lembrete diário...')
    
    const resultado = await enviarLembreteSeNecessario()
    
    console.log('Resultado:', resultado)
    
    if (resultado.enviado) {
      console.log('✅ Email de lembrete enviado com sucesso!')
    } else {
      console.log(`ℹ️ Email não enviado: ${resultado.motivo}`)
    }
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Erro ao executar lembrete:', error)
    process.exit(1)
  }
}

executarLembrete()
