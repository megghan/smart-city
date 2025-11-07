// src/components/Sidebar.tsx

'use client';

import { useSession, signOut } from "next-auth/react"; // 💡 Importar signOut
import Link from "next/link";
import { LogOut, Map } from "lucide-react"; 
import { Button } from "@/components/ui/button"; 

export function Sidebar() {
    const { data: session } = useSession();

    // 💡 Função para sair
    const handleLogout = () => {
        // Redireciona para a página inicial ('/') após o logout
        signOut({ callbackUrl: '/' }); 
    };

    return (
        <aside className="w-64 bg-gray-50 border-r p-4 flex flex-col space-y-4">
            
            <Link href="/dashboard"
            className="font-bold text-4xl">Conecta<span className="text-blue-600">+</span></Link>
            <hr/>
            {/* SAUDAÇÃO PERSONALIZADA */}
            <h2 className="text-xl font-semibold text-gray-800">
                Olá, {session?.user?.name?.split(' ')[0] || 'Visitante'}!
            </h2>
            
            
            <nav className="flex flex-col space-y-2">
                <Link href="/dashboard/profile" className="text-blue-600 hover:text-blue-800">
                    Perfil
                </Link>

                <Link href="/dashboard/listaDePins" className="text-blue-600 hover:text-blue-800">Meus locais</Link>
            </nav>

            {/* 💡 BOTÃO DE LOGOUT AQUI */}
            {session && ( // Só mostra se houver sessão
                <div className="mt-auto pt-4 border-t">
                    <button 
                        onClick={handleLogout} 
                        className="w-full py-2 bg-zinc-800 text-white font-bold rounded-md hover:bg-red-600 transition-colors"
                    >
                        Sair (Logout)
                        
                    </button>
                </div>
            )}
        </aside>
    );
}