//lidando com os dados dos pins

import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { authOptions } from "@/lib/auth";   
import prisma from "@/lib/prisma";

//GET : busca todos os pins para exibir no mapa
export async function GET(request: Request){
    try{
        const { searchParams } = new URL(request.url);
        const cidade = searchParams.get('cidade') || 'Sorocaba';
        
        const pins = await prisma.pinAcessibilidade.findMany({
            where: {
                cidade: {
                    equals:cidade,
                }
            },
            orderBy:{
                createdAt: 'desc'
            },
        });

        return NextResponse.json(pins, {status:200});

    } catch (error) {
        console.error("erro ao buscar pins:", error);
        return NextResponse.json({message: "Erro interno ao buscar"}, {status: 500});
    }
}

//POST : cria novo pin no Neon !requer autenticação!

export async function POST(request: Request){
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
        return NextResponse.json({message: "Não autorizado"}, {status: 401});
    }

    try{
        const {
            latitude,
            longitude,
            descricao,
            tipoAcessibilidade,
            cidade
        } = await request.json();

        if (!latitude || !longitude || !descricao || !cidade) {
            return NextResponse.json({ message: "Dados incompletos." }, { status: 400 });
        }

        //salvando no banco
        const novoPin = await prisma.pinAcessibilidade.create({
            data: {
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
                descricao,
                tipoAcessibilidade: tipoAcessibilidade || 'Geral',
                cidade,
                usuarioId: session.user.id, //vincula o pin ao usuario logado
            },
        });

        return NextResponse.json(novoPin, { status: 201});
    } catch(error){
        console.error("Erro ao criar pin:", error);
        return NextResponse.json({ message: "Erro interno do servidor." }, { status: 500 });
    }
}