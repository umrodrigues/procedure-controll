import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export interface EmailOptions {
  to: string
  subject: string
  html: string
}

export async function sendEmail({ to, subject, html }: EmailOptions): Promise<boolean> {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    }

    const result = await transporter.sendMail(mailOptions)
    console.log('Email enviado com sucesso:', result.messageId)
    return true
  } catch (error) {
    console.error('Erro ao enviar email:', error)
    return false
  }
}

export function createLembreteEmailHTML(): string {
  const hoje = new Date().toLocaleDateString('pt-BR')
  
  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Lembrete - Controle de Procedimentos</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f4f4f4;
            }
            .container {
                background-color: #ffffff;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0,0,0,0.1);
            }
            .header {
                text-align: center;
                border-bottom: 2px solid #007bff;
                padding-bottom: 20px;
                margin-bottom: 30px;
            }
            .header h1 {
                color: #007bff;
                margin: 0;
                font-size: 24px;
            }
            .content {
                margin-bottom: 30px;
            }
            .alert {
                background-color: #fff3cd;
                border: 1px solid #ffeaa7;
                color: #856404;
                padding: 15px;
                border-radius: 5px;
                margin: 20px 0;
            }
            .footer {
                text-align: center;
                border-top: 1px solid #eee;
                padding-top: 20px;
                color: #666;
                font-size: 14px;
            }
            .button {
                display: inline-block;
                background-color: #007bff;
                color: white;
                padding: 12px 24px;
                text-decoration: none;
                border-radius: 5px;
                margin: 20px 0;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🔔 Lembrete de Procedimentos</h1>
            </div>
            
            <div class="content">
                <p>Olá!</p>
                
                <p>Este é um lembrete automático do sistema de <strong>Controle de Procedimentos</strong>.</p>
                
                <div class="alert">
                    <strong>⚠️ Atenção:</strong> Não foram encontrados procedimentos registrados para hoje (${hoje}).
                </div>
                
                <p>Lembre-se de registrar seus procedimentos diários para manter o controle atualizado.</p>
                
                <p>Para acessar o sistema e registrar novos procedimentos, clique no botão abaixo:</p>
                
                <div style="text-align: center;">
                    <a href="https://procedure-controll.vercel.app" class="button">
                        Acessar Sistema
                    </a>
                </div>
            </div>
            
            <div class="footer">
                <p>Este é um email automático do sistema de Controle de Procedimentos.</p>
                <p>Data do envio: ${new Date().toLocaleString('pt-BR')}</p>
            </div>
        </div>
    </body>
    </html>
  `
}
