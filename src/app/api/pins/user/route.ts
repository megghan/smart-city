import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";   
import prisma from "@/lib/prisma";

// GET: Busca SOMENTE os pins criados pelo usuário logado
export async function GET(request: Request){
    // 1. Verificação de Autenticação
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
        return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
    }
    
    const userId = session.user.id;

    try{
        // 2. BUSCA COM FILTRO (A CHAVE DA SOLUÇÃO)
        const userPins = await prisma.pinAcessibilidade.findMany({
            where: {
                usuarioId: userId, // 👈 ESTE FILTRO GARANTE QUE SÓ APARECE OS DELE
            },
            orderBy: {
                createdAt: 'desc'
            },
        });

        return NextResponse.json(userPins, { status: 200 });

    } catch (error) {
        console.error("Erro ao buscar pins do usuário:", error);
        return NextResponse.json({message: "Erro interno ao buscar"}, {status: 500});
    }
}