'use client'; 

import { signIn, signOut, useSession } from "next-auth/react";
import { LogIn, LogOut } from 'lucide-react'; // Assumindo Lucide Icons
import { Button } from "@/components/ui/button"; // Assumindo que você usa Shadcn/UI ou similar
import Link from "next/link";

export function AuthControls() {
  const { data: session, status } = useSession();
  
  // Exibição de carregamento
  if (status === "loading") {
    // Você pode colocar um spinner ou placeholder aqui.
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

  // Se o usuário NÃO estiver LOGADO
  return (
    <Button 
      // Chama o método signIn e especifica o provedor (GitHub, que configuramos)
      onClick={() => signIn("github", { callbackUrl: '/dashboard' })} 
      className="flex items-center space-x-2"
    >
      <LogIn className="h-4 w-4" />
      Fazer Login
    </Button>
  );
}