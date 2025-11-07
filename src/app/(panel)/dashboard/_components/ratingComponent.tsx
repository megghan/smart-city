'use client';

import { Star } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils'; // Função utilitária para classes Tailwind

interface RatingComponentProps {
    pinId: string;
    initialRating: number; // A nota média atual do Pin (para exibição)
    onRatingSubmit: (pinId: string, value: number) => void;
}

export function RatingComponent({ pinId, initialRating, onRatingSubmit }: RatingComponentProps) {
    
    // Estado para o valor que o usuário está passando o mouse (hover)
    const [hoverRating, setHoverRating] = useState(0); 
    
    // Estado para o valor que o usuário SELECIONOU (o voto real)
    const [selectedRating, setSelectedRating] = useState(0); 
    
    // Define a nota inicial se ainda não votou, ou a nota que o usuário já deu
    // Por enquanto, usaremos 0 até implementarmos o GET do voto do usuário.

    const finalRating = selectedRating > 0 ? selectedRating : initialRating;

    const handleStarClick = (value: number) => {
        //Define o voto selecionado
        setSelectedRating(value);
        
        // Chama a função de submissão (que fará o POST para a API)
        // Por enquanto, apenas o console.log no mapa.tsx vai ser chamado.
        onRatingSubmit(pinId, value); 
    };

    return (
        <div className="flex space-x-0.5 cursor-pointer">
            {[1, 2, 3, 4, 5].map((value) => (
                <Star
                    key={value}
                    // Quando não houver hover, usamos a nota atual do Pin ou a selecionada
                    className={cn(
                        "w-5 h-5 transition-colors duration-100",
                        // Condição para a estrela estar PREECHIDA
                        (value <= (hoverRating || finalRating)) 
                            ? "fill-yellow-500 text-yellow-500" // Cor preenchida
                            : "fill-gray-300 text-gray-300"    // Cor vazia
                    )}
                    onMouseEnter={() => setHoverRating(value)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => handleStarClick(value)}
                />
            ))}
        </div>
    );
}