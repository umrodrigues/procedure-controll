// Teste do serviço de email via API
const fetch = require('node-fetch')

async function testarEmail() {
  console.log('🧪 Testando serviço de email via API...')
  
  try {
    const response = await fetch('http://localhost:3000/api/lembrete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    const resultado = await response.json()
    console.log('📧 Resultado do teste:', resultado)
    
    if (resultado.success && resultado.data.enviado) {
      console.log('✅ Email enviado com sucesso!')
    } else {
      console.log(`ℹ️ Email não enviado: ${resultado.data?.motivo || 'Erro desconhecido'}`)
    }
  } catch (error) {
    console.error('❌ Erro no teste:', error.message)
    console.log('💡 Certifique-se de que o servidor Next.js está rodando (pnpm dev)')
  }
}

testarEmail()
