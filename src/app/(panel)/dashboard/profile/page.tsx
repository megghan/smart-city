
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import ProfileDisplay from "../_components/profileDisplay"; 

export default async function ProfilePage() {
    // Busca os dados da sessão no servidor
    const session = await getServerSession(authOptions);

    // Estrutura os dados para passar para o Client Component
    const userData = {
        name: session?.user?.name || "N/A",
        email: session?.user?.email || "N/A",
    };

    return (
        // Renderiza o Client Component, passando os dados
        <ProfileDisplay userData={userData} />
    );
}