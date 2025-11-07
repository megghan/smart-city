import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
        return NextResponse.json({ message: "Não autorizado. Faça o login para votar." }, { status: 401 });
    }

    try {
        const { pinId, valor } = await request.json(); // valor deve ser um número entre 1 e 5

        if (!pinId || typeof valor !== 'number' || valor < 1 || valor > 5) {
            return NextResponse.json({ message: "Dados de votação inválidos (Valor deve ser 1-5)." }, { status: 400 });
        }
        
        const userId = session.user.id;

        // 1. Tentar salvar ou atualizar o voto
        await prisma.rating.upsert({ // upsert tenta atualizar; se não existe, cria.
            where: {
                // A chave única que definimos no schema: @@unique([pinId, userId])
                pinId_userId: { pinId, userId }, 
            },
            update: { 
                nota: valor 
            },
            create: {
                pinId,
                userId,
                nota: valor,
            },
        });

        // 2. Recalcular a nota média do Pin (usando o Aggregation do Prisma)
        const aggregation = await prisma.rating.aggregate({
            _sum: { nota: true },
            _count: true,
            where: { pinId: pinId },
        });

        const somaNotas = aggregation._sum.nota || 0;
        const totalVotos = aggregation._count;
        const novaMedia = totalVotos > 0 ? somaNotas / totalVotos : 0;
        
        // 3. Atualizar o Pin com a nova média e contagem
        const updatedPin = await prisma.pinAcessibilidade.update({
            where: { id: pinId },
            data: {
                nota_media: parseFloat(novaMedia.toFixed(2)), // Arredonda para 2 casas
                contagem_ratings: totalVotos,
            },
        });

        return NextResponse.json({ 
            message: "Voto registrado com sucesso!",
            nota_media: updatedPin.nota_media
        }, { status: 200 });

    } catch (error) {
        console.error("Erro ao registrar voto:", error);
        return NextResponse.json({ message: "Erro interno ao processar o voto." }, { status: 500 });
    }
}