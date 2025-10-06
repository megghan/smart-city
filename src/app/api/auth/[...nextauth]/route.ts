// src/app/api/auth/[...nextauth]/route.ts

// 1. Importa a biblioteca principal do Auth.js
import NextAuth from "next-auth";

// 2. Importa toda a sua configuração de adaptador, provedores e segredo
import { authOptions } from "@/lib/auth"; 

// 3. Inicializa o Auth.js (criando o handler que lida com todas as requisições)
const handler = NextAuth(authOptions);

// 4. Exporta o handler para os métodos GET e POST
// O Auth.js precisa de ambos para lidar com o login (GET) e o retorno/callback (POST).
export { handler as GET, handler as POST };