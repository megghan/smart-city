'use client';

import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';


//Define o caminho para o ícones
const ICONE_PERSONALIZADO = L.icon({
    iconUrl: '/marker.png',
    iconSize: [38,38],
    iconAnchor: [19,38],
    popupAnchor:[0,-40]
});

// Tipagem simples para o pin (para o TypeScript)
interface Pin {
    id: string;
    latitude: number;
    longitude: number;
    descricao: string;
    tipoAcessibilidade: string;
}


//pegando as coordenadas de sorocaba. No futuro tirar o hardcode das coordenadas
//   vai permitir que o usuario escolha a cidade!


const POSICAO_INICIAL: L.LatLngExpression = [-23.5015, -47.4519]; // Sorocaba, SP
const ZOOM_INICIAL = 13;


//usamos o hook do leaflet para detectar o clique
function MapClickHandler({onPinCreated}: {onPinCreated: () => void}){
    const map = useMapEvents({
        click: async (e) => {
            const{lat,lng} = e.latlng;

            const descricao = prompt("Digite a descrição do local de acessibilidade");

            if(!descricao) return;

            const pinData = {
                latitude: lat.toString(), // A API espera string
            longitude: lng.toString(),
            descricao: descricao,
            tipoAcessibilidade: 'Geral', 
            cidade: 'Sorocaba', 
            };

            try{
                const response = await fetch("/api/pins", {method: "POST",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(pinData),
                });

                if(response.ok){
                    alert('Pin adicionado com sucesso! Recarregando mapa...');
                    onPinCreated(); // chama o callback do pai ~mapLoader
                } else if(response.status === 401){
                    alert('Você precisa estar logado para adicionar pins.');
                } else {
                    alert('Erro ao salvar o pin. Detalhes: ' + await response.text());
                }
            } catch (error){
                console.error("erro na comunicação com a API:", error);
            }
        },
    });

    return null;
}


export function MapaDaCidade({pins, onPinCreated }: { pins: Pin[], onPinCreated: () => void }){
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

                <MapClickHandler onPinCreated={onPinCreated} />

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
                            {pin.descricao} <br/>
                            Tipo: {pin.tipoAcessibilidade}
                        </Popup>
                    </Marker>
                ))}

            </MapContainer>
        </div>
    )
}