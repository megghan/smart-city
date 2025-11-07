Conecta+ | Plataforma de Acessibilidade e Cidades Inteligentes
Este é o projeto desenvolvido para a disciplina UPXIV da Facens com foco em soluções de Cidade Inteligente e Acessível.


O Conecta+ é mais do que um mapa: é uma plataforma social que visa empoderar o cidadão a explorar a cidade com total autonomia, fornecendo dados em tempo real sobre a acessibilidade de locais. Nosso objetivo é transformar o feedback da comunidade em informação acionável, garantindo que todos saibam o que esperar antes de se deslocar.

# 🛠️ Stack Tecnológica
Nosso projeto utiliza uma stack moderna e escalável:

Frontend: Next.js 14 (App Router) e React

Estilização & UI: Tailwind CSS e shadcn/ui (para componentes acessíveis e bonitos)

Mapeamento: Leaflet e React-Leaflet (para renderização de mapas e Pins)

Autenticação: Auth.js (NextAuth) com provedor GitHub

Banco de Dados: Neon (PostgreSQL Serverless)

ORM: Prisma (para interface de dados segura e tipada)

Deploy: Vercel


# 🚀 Estado Atual do Projeto
O projeto está em um Estado Estável (MVP), com as funcionalidades principais implementadas e integradas.



Landing Page & Estrutura	✅ Completo	Design inicial e navegação básica.

Login de Usuário	✅ Completo	Autenticação robusta via Auth.js 
(GitHub). Rotas de API protegidas.

Integração com BD	✅ Completo	Conexão com Neon e interface de dados via Prisma.

Mapa Interativo	✅ Completo	Exibição do mapa, Pins no banco de dados e UX aprimorada.

Criação de Pins (CRUD)	✅ Completo	Usuário logado pode clicar no mapa para adicionar Pins com Nome/Descrição/Tipo (Rota POST /api/pins).

Edição/Exclusão de Pins	✅ Completo	Usuário só pode editar/excluir Pins que ele mesmo criou (Rotas PATCH e DELETE).

Sistema de Votação	✅ Completo	Usuários logados podem votar (1-5 estrelas) em qualquer Pin. O sistema recalcula e exibe a Nota Média em tempo real.

Deploy	✅ Completo	Projeto configurado e rodando em ambiente de produção na Vercel.


#📈 Funcionalidades Recentes (Atualização UPXIV)
As funcionalidades mais importantes para a entrega da UPXIV foram focadas na interação social e na coleta de dados:

Refatoração da Criação de Pin: Substituição do alert() nativo por um Modal/Dialog com shadcn/ui para uma experiência de usuário (UX) superior e mais profissional.

Implementação do Rating: Nova rota POST /api/ratings com lógica upsert no Prisma para garantir que o usuário só tenha um voto por Pin, e recálculo automático da nota_media e contagem_ratings no Pin.

Melhoria do Pop-up: Substituímos o pop-up básico por um Card estilizado com shadcn/ui para exibir o nome, a descrição completa e o componente interativo de votação por estrelas.

O projeto está pronto para a entrega, mas identificamos as seguintes evoluções importantes:

1. Filtros no Mapa (Próxima Feature)
Implementar filtros de busca por Cidade e Tipo de Acessibilidade (Ex.: 'Rampa', 'Banheiro Adaptado').

Modificar a rota GET /api/pins para aceitar query parameters e aplicar filtros no Prisma.

2. Aprimoramento da UX
Implementar a funcionalidade para o usuário logado visualizar seu voto atual ao abrir o Pop-up (via GET /api/ratings?pinId=...).

Utilizar debouncing ou throttling nas requisições do mapa para otimizar o desempenho em grandes volumes de Pins.




# 🚀 Como Executar o Projeto Localmente
Para rodar o projeto em sua máquina:

1. Pré-requisitos
Node.js (versão 18+)

Conta no Neon (para o banco de dados)

Conta no GitHub (para o Auth.js)

2. Configuração
Crie um arquivo .env.local na raiz do projeto com as seguintes variáveis:

# Variáveis do Neon (Prisma)
DATABASE_URL="postgresql://user:password@endpoint/db?sslmode=require"

# Variáveis do Auth.js
GITHUB_ID="SEU_ID_DO_GITHUB"
GITHUB_SECRET="SEU_SECRET_DO_GITHUB"
NEXTAUTH_SECRET="UM_TEXTO_LONGO_E_ALEATORIO"

# URL de desenvolvimento (NÃO MUDE EM DEV)
NEXTAUTH_URL="http://localhost:3000" 
3. Instalação e Execução
Instale as dependências:

Bash

npm install
Rode o servidor de desenvolvimento:

Bash

npm run dev
Abra http://localhost:3000 no seu navegador para ver o resultado. O projeto usa o Next.js App Router e next/font para otimização de fontes.

(Mantenha as seções "Learn More" e "Deploy on Vercel" originais abaixo para referência do Next.js.)

Learn More
To learn more about Next.js, take a look at the following resources:

Next.js Documentation - learn about Next.js features and API.

Learn Next.js - an interactive Next.js tutorial.

You can check out the Next.js GitHub repository - your feedback and contributions are welcome!

Deploy on Vercel
The easiest way to deploy your Next.js app is to use the Vercel Platform from the creators of Next.js.

Check out our Next.js deployment documentation for more details.