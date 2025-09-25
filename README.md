Estre é um projeto para a disciplina UPXIV da Facens.

# Conecta+
É uma plataforma de Cidade Inteligente e Acessível. Nosso objetivo é empoderar você a explorar a cidade com total autonomia.

Oferecemos informações detalhadas sobre estabelecimentos, garantindo que você saiba onde ir e o que esperar, seja você um cadeirante, um idoso, um pai com carrinho de bebê, ou qualquer pessoa que valoriza a acessibilidade.

## Tecnologias
Next.js, 
ApI Leaflet,
Prisma, Auth.js, Neon
Vercel

## Estado do projeto

Landing page ✅
Exibição do mapa de Sorocaba ✅
Colocar pin com clique ❌
Login de Usuário & autenticação com Auth.js ❌
Integração com banco de Dados Neon ❌
Interface de dados com Prisma ❌
Subir projeto no Vercel ❌

## Próximos passos:

### Banco de Dados e Interface (Prisma e Neon)

Criar conta no Neon e configurar banco de dados

Instalar prisma e configurar o schema.prisma com o modelo para PinAcessibilidade e User

Fazer a primeira migração para aplicar as tabelas no seu banco de dados Neon.

### Login e Autenticação

Instalar o Auth.js

integrar um provedor de login

Proteger as futuras rotas de API para garantir que só aceitem requisições de usuários autenticados

### Colocar pin com clique e API

Criar um Route Handler (API) para a rota POST /api/pins que usa o Prisma para salvar o pin no banco.

No componente do mapa, usar o hook useMapEvents do Leaflet para capturar as coordenadas do clique e enviar para a API.

## Planos futuros

Permitir que o usuario escolha qual cidade ele quer ver.

Votação de pins (por relevância do problema/questão)


### Como usar
First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
