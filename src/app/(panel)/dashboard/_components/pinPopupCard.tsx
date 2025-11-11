
'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PinAcessibilidade } from '@prisma/client';
import { RatingComponent } from "./ratingComponent";

interface PinPopupCardProps {
    pin: PinAcessibilidade;
    onRatingSubmit: (pinId: string, value: number) => void;
}

export function PinPopupCard({ pin, onRatingSubmit }: PinPopupCardProps) {
    const notaFormatada = pin.nota_media ? pin.nota_media.toFixed(1) : 'S/N'; // S/N = Sem Nota

    return (
        // O Card do shadcn/ui para organizar a informação
        <Card className="w-[280px] shadow-lg border-2 border-primary/20">
            <CardHeader className="p-3 pb-0">
                <CardTitle className="text-lg leading-tight">
                    {pin.nome_local || "Local Não Nomeado"}
                </CardTitle>
                <CardDescription className="text-xs mb-0 p-0">
                    {pin.cidade} - Tipo: <Badge variant="secondary">{pin.tipoAcessibilidade}</Badge>
                    {pin.endereco && (
                    <p className="m-0 text-xs text-gray-500">
                        📍 Endereço: {pin.endereco}
                    </p>
                )}
                </CardDescription>
            </CardHeader>            
            <CardContent className="p-3 mt-0 pt-0 text-sm ">
                
                <p className="mb-2 line-clamp-6 mt-0.5 p-0">{pin.descricao}</p>
                
                
                <div className="flex items-center space-x-2 mt-0">
                    <RatingComponent 
                        initialRating={pin.nota_media}
                        pinId={pin.id}
                        onRatingSubmit={onRatingSubmit}
                    />
                    <span className="text-sm font-semibold text-primary">
                        {notaFormatada} ({pin.contagem_ratings} votos)
                    </span>
                </div>
                
            </CardContent>
            
            
        </Card>
    );
}