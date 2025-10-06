
import { DefaultSession } from "next-auth";

// Estende o tipo de Sessão do Auth.js
declare module "next-auth" {
  interface Session {
    user: {
      /** O ID do usuário (vindo do banco de dados) */
      id: string; 
      // O nome, email e imagem já são padrões, mas você pode listá-los
      name?: string | null | undefined;
      email?: string | null | undefined;
      image?: string | null | undefined;
    } & DefaultSession["user"];
  }
}

// Estende o tipo do Token JWT
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}