# Serviço de Email - Lembrete Diário

## Descrição
Este serviço envia automaticamente um email de lembrete para carolinath03@gmail.com quando não há procedimentos registrados no dia corrente.

## Configuração

### Variáveis de Ambiente
Adicione as seguintes variáveis ao seu arquivo `.env.local`:

```env
# Email Configuration
EMAIL_USER=luarodrigues1996@gmail.com
EMAIL_PASS=ssnz ffrg lldc cwur

# App Configuration
NEXT_PUBLIC_APP_URL=https://procedure-controll.vercel.app

# Cron Job Security
CRON_SECRET=lembrete-procedimentos-2025-secret-key
```

### Instalação das Dependências
```bash
pnpm install
```

### Atualização do Banco de Dados
```bash
npx prisma db push
```

## Como Usar

### 1. Endpoint API
- **GET/POST**: `/api/lembrete` - Endpoint manual
- **GET**: `/api/cron` - Endpoint para cron jobs (com autenticação)
- Verifica se há procedimentos hoje e envia email se necessário

### 2. Script Manual
```bash
node scripts/lembrete-daily.js
```

### 3. Agendamento Automático (Vercel Cron Jobs)
O sistema usa cron jobs nativos da Vercel configurados no `vercel.json`:
```json
{
  "crons": [
    {
      "path": "/api/cron",
      "schedule": "0 19 * * *"
    }
  ]
}
```
Executa automaticamente todos os dias às 19:00 (7 PM).

## Funcionamento

1. **Verificação de Procedimentos**: Verifica se existem procedimentos criados hoje
2. **Verificação de Email**: Verifica se já foi enviado um email hoje
3. **Envio de Email**: Se não há procedimentos e não foi enviado email, envia o lembrete
4. **Registro**: Registra o envio no banco para evitar duplicatas

## Estrutura do Banco

### Tabela: TB_EMAIL_LEMBRETES
- `ID`: Chave primária
- `DATA_ENVIO`: Data e hora do envio
- `DATA_CRIACAO`: Data de criação do registro
- `DATA_ATUALIZACAO`: Data da última atualização

## Logs
Os logs são escritos no console normal do sistema, não no Graylog.

## Resposta da API
```json
{
  "success": true,
  "data": {
    "enviado": true,
    "motivo": "Email de lembrete enviado com sucesso"
  }
}
```

## Possíveis Motivos de Não Envio
- "Já existem procedimentos registrados hoje"
- "Email de lembrete já foi enviado hoje"
- "Erro ao enviar email"
- "Erro interno do servidor"
