
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function ProfilePage() {
    // Você pode usar o getServerSession aqui para buscar os dados do usuário
    const session = await getServerSession(authOptions);

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">
                Meu Perfil
            </h1>
            
            {/* Exibe os dados da sessão (Opcional) */}
            <p className="text-gray-700">
                **Nome:** {session?.user?.name}
            </p>
            <p className="text-gray-700">
                **Email:** {session?.user?.email}
            </p>
            <p className="text-gray-700 mt-4">
                Em construção: Aqui será o local para editar suas informações de usuário.
            </p>
        </div>
    );
}
