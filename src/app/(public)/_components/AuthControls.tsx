'use client'; 

import { signIn, signOut, useSession } from "next-auth/react";
// 💡 ADICIONEI o Github e o Chrome (usado como ícone do Google)
import { LogIn, LogOut, Github, Chrome } from 'lucide-react'; 
import { Button } from "@/components/ui/button"; 
import Link from "next/link";

export function AuthControls() {
  const { data: session, status } = useSession();
  
  // Exibição de carregamento
  if (status === "loading") {
    return <Button variant="ghost" disabled>Carregando...</Button>;
  }

  // Se o usuário estiver LOGADO (Autenticado)
  if (session) {
    return (
      <div className="flex items-center space-x-2">
      
        {/* 1. MOSTRAR O BOTÃO DO DASHBOARD */}
        <Link href="/dashboard" passHref>
          <Button variant="outline" className="text-indigo-400 border-indigo-400 hover:bg-indigo-50">
            Painel
          </Button>
        </Link>
        
        {/* 2. BOTÃO DE SAIR */}
        <Button onClick={() => signOut()} className="flex items-center space-x-2 bg-red-500 hover:bg-red-600">
          <LogOut className="h-4 w-4" />
          Sair
        </Button>
      </div>
    );
  }

  // --- SE O USUÁRIO NÃO ESTIVER LOGADO (Múltiplas Opções) ---
  return (
    // 💡 ENVOLVEMOS os botões em uma div para que fiquem lado a lado
    <div className="flex items-center space-x-2"> 
        
        {/* NOVO: Botão de Login com Google */}
        <Button 
            onClick={() => signIn("google", { callbackUrl: '/dashboard' })} 
            // Usamos um estilo diferente (outline) para o Google, para que o GitHub se destaque
            variant="outline"
            className="flex items-center space-x-2 text-zinc-700 border-zinc-300 hover:bg-zinc-100"
        >
            <Chrome className="h-4 w-4" /> {/* Ícone do Google */}
            Google
        </Button>

        {/* Botão de Login com GitHub (Seu provedor original) */}
        <Button 
            onClick={() => signIn("github", { callbackUrl: '/dashboard' })} 
            className="flex items-center space-x-2 bg-zinc-900 hover:bg-zinc-800"
        >
            <Github className="h-4 w-4" /> {/* Ícone do GitHub */}
            GitHub
        </Button>
    </div>
  );
}