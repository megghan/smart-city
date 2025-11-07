// src/lib/auth.ts

import { PrismaAdapter } from "@auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
// IMPORTANTE: Importamos o cliente Prisma que você criou
import prisma from "./prisma"; 
import { Adapter } from "next-auth/adapters";

// A interface AuthOptions contém toda a configuração do NextAuth
export const authOptions: AuthOptions = {
  // 1. ADAPTER: Conecta o Auth.js ao seu banco Neon via Prisma
  adapter: PrismaAdapter(prisma) as Adapter, 
  
  // 2. PROVIDERS: Define as opções de login
  providers: [
    GitHubProvider({
      // Puxa as chaves do seu arquivo .env
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  
  // 3. SECRET: Usa a chave secreta que você gerou para criptografia
  secret: process.env.AUTH_SECRET,
  
  // 4. SESSÃO: Configura a sessão para usar JWT (melhor para APIs)
  session: {
    strategy: "jwt",
  },
  
  // 5. Pages (Opcional, mas útil): Redireciona para o login em vez da página padrão
  pages: {
    signIn: '/login', // Se você criar uma página /login
  },

  // 6. Callbacks: Permite adicionar informações customizadas à sessão (útil com Prisma)
  callbacks: {
    async session({ token, session }) {
      if (token) {
        // Agora, o TypeScript sabe que 'id' existe no token
        session.user.id = token.id as string; 
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        // Adiciona o ID ao token JWT
        token.id = user.id; 
      }
      return token;
    }
  }
};