import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth'; // Importe suas opções de autenticação
import prisma from '@/lib/prisma';       // Assumindo que seu cliente Prisma está em '@/lib/prisma'

// Handler para o método PUT (usado para atualizar recursos)
export async function PUT(request: Request) {
    const session = await getServerSession(authOptions);

    // 1. Verificação de Autenticação (Segurança!)
    if (!session || !session.user || !session.user.email) {
        // Se o usuário não estiver logado, nega a operação
        return new NextResponse("Não autorizado: Usuário não logado.", { status: 401 });
    }

    const body = await request.json();
    const { newName } = body;
    const userEmail = session.user.email; // Usamos o email da sessão, que é seguro

    // 2. Verificação de dados de entrada
    if (!newName || typeof newName !== 'string' || newName.trim().length < 2) {
        return new NextResponse("Nome inválido. O nome deve ter pelo menos 2 caracteres.", { status: 400 });
    }

    try {
        // 3. Prisma: Atualize o nome no banco de dados
        const updatedUser = await prisma.user.update({
            where: { email: userEmail }, // Busca o usuário pelo email seguro da sessão
            data: { name: newName.trim() }, // Salva o novo nome
        });

        // 4. Resposta de sucesso
        return NextResponse.json({ 
            message: "Nome atualizado com sucesso!", 
            name: updatedUser.name 
        });

    } catch (error) {
        // Se houver um erro de banco de dados (ex: conexão), ele será capturado aqui.
        console.error("Erro ao atualizar o nome:", error);
        return new NextResponse("Erro interno do servidor ao salvar o nome.", { status: 500 });
    }
}

// Opcional: Se tentar acessar com outro método (GET, POST, DELETE), o sistema nega
export async function GET() {
    return new NextResponse("Método não permitido.", { status: 405 });
}