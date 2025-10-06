'use client';

import dynamic from "next/dynamic";
import { MapaDaCidade } from "./mapa";
import { useEffect, useState, useCallback } from "react";

const MapaDinamico = dynamic<React.ComponentProps<typeof MapaDaCidade>>(
    () => import("./mapa").then((mod) => mod.MapaDaCidade),
    {
        ssr: false, // Permitido porque este arquivo é 'use client'
        loading: () => <p>Carregando mapa...</p>
    }
);

interface Pin {
    id: string;
    latitude: number;
    longitude: number;
    descricao: string;
    tipoAcessibilidade: string;
    cidade: string;
}

export function MapaLoader() {
    const [pins, setPins] = useState<Pin[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchPins = useCallback(async ()=>{
        setIsLoading(true);
        try {
            const response = await fetch('/api/pins?cidade=Sorocaba'); 
            if (response.ok) {
                const data = await response.json();
                setPins(data);
            } else {
                console.error("Erro ao buscar pins");
            }
        } catch (error) {
            console.error("Erro de rede:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPins();
    }, [fetchPins]);

    if (isLoading){
        return <div>Carregando mapa...</div>;
    }

    return (
        // O componente que realmente será renderizado

        <MapaDinamico pins={pins} onPinCreated={fetchPins} />
        
    );
}