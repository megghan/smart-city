'use client';

import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useState } from "react";
import { CreatePinDialog } from "./createPinDialog";
import { PinPopupCard } from './pinPopupCard'; 

//Define o caminho para o ícones
const ICONE_PERSONALIZADO = L.icon({
    iconUrl: '/marker.png',
    iconSize: [38,38],
    iconAnchor: [19,38],
    popupAnchor:[0,-40]
});

// Tipagem simples para o pin (para o TypeScript)
export interface Pin {
    id: string;
    latitude: number;
    longitude: number;
    descricao: string;
    tipoAcessibilidade: string;
    nome_local: string;
    nota_media: number;
    contagem_ratings: number;
    cidade: string;
}


//pegando as coordenadas de sorocaba. No futuro tirar o hardcode das coordenadas
//   vai permitir que o usuario escolha a cidade!


const POSICAO_INICIAL: L.LatLngExpression = [-23.5015, -47.4519]; // Sorocaba, SP
const ZOOM_INICIAL = 13;


//usamos o hook do leaflet para detectar o clique
function MapClickHandler({ 
    onMapClick 
}: { 
    onMapClick: (coords: { lat: number; lng: number }) => void // Novo prop
}) {
    useMapEvents({
        click: (e) => {
            const { lat, lng } = e.latlng;
            onMapClick({ lat, lng }); // Apenas chama a função do componente pai
        },
    });
    return null;
}

export function MapaDaCidade({pins, onPinCreated }: { pins: Pin[], onPinCreated: () => void }){
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [pinCoords, setPinCoords] = useState<{ lat: number; lng: number } | null>(null);
    
    const handleMapClick = (coords: { lat: number; lng: number }) => {
        setPinCoords(coords);
        setIsCreateDialogOpen(true); // Abre o Dialog
    };
    // =============================
    const handleRatingSubmit = async (pinId: string, valor: number) => {
        
        // 1. Enviar o voto para a API
        try {
            const response = await fetch("/api/ratings", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ pinId, valor }),
            });

            if (response.ok) {
                // Se o voto foi salvo com sucesso, recarrega o mapa para mostrar a nova nota
                alert('Voto registrado com sucesso! Atualizando nota...');
                onPinCreated(); 
            } else if (response.status === 401) {
                alert('Você precisa estar logado para votar.');
            } else {
                const data = await response.json();
                alert('Erro ao registrar voto: ' + (data.message || response.statusText));
            }
        } catch (error) {
            console.error("Erro na comunicação com a API de rating:", error);
            alert("Erro de rede ao tentar votar.");
        }
    };
        //=================

    return(
        
        <div style={{height: '100%', width: '100%'}}>
            <MapContainer
                center ={POSICAO_INICIAL}
                zoom = {ZOOM_INICIAL}
                scrollWheelZoom={false}
                style={{height: '100%', width: '100%'}}>
                    <TileLayer
                    // Atribuição: É obrigatório dar crédito ao OpenStreetMap
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    // URL: Este é o servidor que fornece as imagens do mapa
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MapClickHandler onMapClick={handleMapClick} />

                <Marker 
                    position={POSICAO_INICIAL as [number, number]}
                    icon={ICONE_PERSONALIZADO}
                    >
                    <Popup>
                        Conecta+ <br /> Sorocaba, seu ponto inicial!
                    </Popup>
                </Marker>

                {pins.map((pin) =>(
                    <Marker
                        key={pin.id}
                        position={[pin.latitude, pin.longitude]}
                        icon={ICONE_PERSONALIZADO}
                    >
                        <Popup>
                            <PinPopupCard 
                            pin={pin} 
                            onRatingSubmit={handleRatingSubmit}
            />
                        </Popup>
                    </Marker>
                ))}

            </MapContainer>
            <CreatePinDialog
            coords={pinCoords}
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
            onPinCreated={() => {
                onPinCreated(); // Recarrega os pins
                setPinCoords(null);
            }}
        />
        </div>
    )
}