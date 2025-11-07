import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

//fução delete
export async function DELETE(
    request: Request,
    { params }: {params: {pinId: string}}
) {
    const pinId = params.pinId;

    try {
        //verificação de seguranca
        const session = await getServerSession(authOptions);

        if(!session || !session.user || !session.user.id) {
            return NextResponse.json(
                {message: "Não autorizado. Faça o login!"},
                {status: 401}
            );
        }

        const userId = session.user.id; // id do usuario logado
        const pinToDelete = await prisma.pinAcessibilidade.findUnique({
      where: {
        id: pinId,
      },
    });

    if (!pinToDelete) {
      return NextResponse.json(
        { message: 'Pin não encontrado.' },
        { status: 404 }
      );
    }

    // O CAMPO DE CHAVE ESTRANGEIRA NO SCHEMA É 'usuarioId'
    if (pinToDelete.usuarioId !== userId) {
      return NextResponse.json(
        { message: 'Você não tem permissão para excluir este Pin. Não é o autor.' },
        { status: 403 }
      );
    }

    // 3. EXCLUSÃO AUTORIZADA: Se tudo estiver OK, exclua o Pin
    await prisma.pinAcessibilidade.delete({
      where: {
        id: pinId,
      },
    });

    // 4. Resposta de sucesso
    return NextResponse.json(
      { message: 'Pin excluído com sucesso.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro ao tentar excluir o Pin:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor ao excluir o Pin.' },
      { status: 500 }
    );
  }
}

export async function PATCH(
    request: Request,
    { params }: { params: { pinId: string } }
) {
    const pinId = params.pinId;

    try {
        const session = await getServerSession(authOptions);
        
        // 1. Verificação de Autenticação
        if (!session || !session.user || !session.user.id) {
            return NextResponse.json({ message: 'Não autorizado. Faça o login.' }, { status: 401 });
        }
        const userId = session.user.id;
        const body = await request.json();
        
        // Extração dos campos que o usuário pode ter enviado para edição
        const { descricao, tipoAcessibilidade, cidade, nome_local, endereco } = body;
        
        // Construção dinâmica do objeto de atualização
        const dataToUpdate: Record<string, any> = {};
        if (descricao !== undefined) dataToUpdate.descricao = descricao;
        if (tipoAcessibilidade !== undefined) dataToUpdate.tipoAcessibilidade = tipoAcessibilidade;
        if (cidade !== undefined) dataToUpdate.cidade = cidade;
        if (nome_local !== undefined) dataToUpdate.nome_local = nome_local;
        if (endereco !== undefined) dataToUpdate.endereco = endereco;


        // 2. VERIFICAR AUTORIA (Garantir que o autor é o mesmo)
        const pinToUpdate = await prisma.pinAcessibilidade.findUnique({
            where: { id: pinId },
            select: { usuarioId: true }, 
        });

        if (!pinToUpdate) {
            return NextResponse.json({ message: 'Pin não encontrado.' }, { status: 404 });
        }
        if (pinToUpdate.usuarioId !== userId) {
            return NextResponse.json(
                { message: 'Você não tem permissão para editar este Pin.' },
                { status: 403 }
            );
        }
        
        // 3. EXECUTAR A EDIÇÃO
        const updatedPin = await prisma.pinAcessibilidade.update({
            where: { id: pinId },
            data: dataToUpdate,
        });

        // 4. Resposta de sucesso
        return NextResponse.json(updatedPin, { status: 200 }); 
    } catch (error) {
        console.error('Erro ao tentar editar o Pin:', error);
        return NextResponse.json(
            { message: 'Erro interno do servidor ao editar o Pin.' },
            { status: 500 }
        );
    }
}