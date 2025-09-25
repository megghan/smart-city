'use client';

import dynamic from "next/dynamic";
import { MapaDaCidade } from "./mapa";

const MapaDinamico = dynamic<React.ComponentProps<typeof MapaDaCidade>>(
    () => import("./mapa").then((mod) => mod.MapaDaCidade),
    {
        ssr: false, // Permitido porque este arquivo é 'use client'
        loading: () => <p>Carregando mapa...</p>
    }
);

export function MapaLoader() {
    return (
        // O componente que realmente será renderizado
        <MapaDinamico />
    );
}