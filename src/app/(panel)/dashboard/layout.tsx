
import { Sidebar } from "./_components/sidebar"; 
import { AuthProvider } from "./../../../components/AuthProvider"; // Provider da sessão

export default function DashboardLayout({
  children, // O conteúdo da sua página (o mapa)
}: {
  children: React.ReactNode;
}) {
  return (
    // 1. Usa h-screen e flex/grid para ocupar a altura total da tela
    <AuthProvider>
      <div className="flex flex-col h-screen">
        
        
        <div className="flex flex-1 overflow-hidden">                  

          {/* O MAPA: Ocupa o restante do espaço (flex-1) e rola */}
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>

          <Sidebar />

        </div>
      </div>
    </AuthProvider>
  );
}