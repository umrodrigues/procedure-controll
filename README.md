# 🏥 Controle de Procedimentos Médicos

Sistema moderno e responsivo para controle e monitoramento de procedimentos médicos, desenvolvido com Next.js, TypeScript e Tailwind CSS.

## ✨ Características

- **Login Mockado**: Sistema de autenticação simples (admin/123456)
- **Dashboard Responsivo**: Interface moderna com estatísticas em tempo real
- **Animações Fluidas**: Framer Motion para transições suaves
- **Animações Lottie**: Integração com Lottie para elementos visuais
- **Layout Responsivo**: Design adaptável para todos os dispositivos
- **Componentes Modulares**: Arquitetura limpa e reutilizável
- **Gestão de Tipos**: Cadastro dinâmico de novos tipos de procedimentos

## 🚀 Tecnologias

- **Frontend**: Next.js 15 + React 19
- **Estilização**: Tailwind CSS v4
- **Animações**: Framer Motion + Lottie
- **Ícones**: Lucide React
- **Linguagem**: TypeScript
- **Gerenciador**: pnpm

## 🎯 Funcionalidades

### Dashboard
- **Estatísticas em Tempo Real**: Total de procedimentos, procedimentos do mês, tipos diferentes
- **Top 3 Procedimentos**: Ranking dos procedimentos mais realizados
- **Cadastro de Procedimentos**: Formulário para adicionar novos registros
- **Gestão de Tipos**: Adicionar novos tipos de procedimentos dinamicamente
- **Histórico Completo**: Tabela com todos os procedimentos cadastrados

### Sistema de Login
- **Autenticação Mockada**: Usuário: `admin`, Senha: `123456`
- **Animações de Transição**: Feedback visual durante o processo
- **Validação de Formulário**: Campos obrigatórios e validação

### Gestão de Tipos de Procedimentos
- **Adicionar Novos Tipos**: Interface intuitiva para criar novos tipos
- **Validação de Duplicatas**: Previne tipos duplicados
- **Visualização em Tempo Real**: Lista atualizada dos tipos disponíveis
- **Descrição Opcional**: Campo para detalhar o procedimento

## 🛠️ Instalação

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd procedure-controll
   ```

2. **Instale as dependências**
   ```bash
   pnpm install
   ```

3. **Execute o projeto**
   ```bash
   pnpm dev
   ```

4. **Acesse no navegador**
   ```
   http://localhost:3000
   ```

## 🔑 Credenciais de Acesso

- **Usuário**: `admin`
- **Senha**: `123456`

## 📱 Responsividade

O sistema é totalmente responsivo e funciona perfeitamente em:
- 📱 Dispositivos móveis
- 💻 Tablets
- 🖥️ Desktops
- 🖥️ Monitores grandes

## 🎨 Componentes UI

- **StatCard**: Cards de estatísticas com contadores animados
- **RankingCard**: Ranking com animações sequenciais
- **ProcedimentoForm**: Formulário com transições suaves
- **NovoTipoProcedimento**: Gestão de tipos de procedimentos
- **AnimatedTable**: Tabela com animações de entrada
- **LoadingSpinner**: Spinner de carregamento animado

## 🌟 Animações Lottie

- **Login**: Animação de autenticação
- **Dashboard**: Animação de estatísticas
- **Transições**: Animações suaves entre estados

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── dashboard/
│   │   └── page.tsx          # Página do dashboard
│   ├── globals.css           # Estilos globais
│   ├── layout.tsx            # Layout principal
│   └── page.tsx              # Página de login
├── components/
│   └── ui/                   # Componentes reutilizáveis
│       ├── AnimatedCard.tsx
│       ├── AnimatedTable.tsx
│       ├── LoadingSpinner.tsx
│       ├── NovoTipoProcedimento.tsx  # Novo componente
│       ├── ProcedimentoForm.tsx
│       ├── RankingCard.tsx
│       └── StatCard.tsx
```

## 🔧 Como Usar

### 1. Login
- Acesse o sistema com as credenciais fornecidas
- Aproveite as animações de transição

### 2. Dashboard
- Visualize estatísticas em tempo real
- Acompanhe o ranking dos procedimentos

### 3. Cadastrar Procedimentos
- Use o formulário para adicionar novos registros
- Selecione o tipo, data e adicione observações

### 4. Gerenciar Tipos
- Adicione novos tipos de procedimentos
- Visualize todos os tipos disponíveis
- Evite duplicatas automaticamente

## 🎯 Próximas Funcionalidades

- [ ] Persistência de dados com banco de dados
- [ ] Sistema de usuários real
- [ ] Relatórios e exportação
- [ ] Filtros avançados
- [ ] Notificações em tempo real
- [ ] Categorização de procedimentos
- [ ] Histórico de alterações

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Desenvolvido por

Sistema desenvolvido com foco em experiência do usuário e design moderno para controle de procedimentos médicos.

---

⭐ Se este projeto te ajudou, considere dar uma estrela!
