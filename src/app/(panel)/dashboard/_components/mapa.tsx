'use client';

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';


//Define o caminho para o ícones
const ICONE_PERSONALIZADO = L.icon({
    iconUrl: '/marker.png',
    iconSize: [38,38],
    iconAnchor: [19,38],
    popupAnchor:[0,-40]
});

//pegando as coordenadas de sorocaba. No futuro tirar o hardcode das coordenadas
//   vai permitir que o usuario escolha a cidade!

const POSICAO_INICIAL: L.LatLngExpression = [-23.5015, -47.4519]; // Sorocaba, SP
const ZOOM_INICIAL = 13;

export function MapaDaCidade(){
    return(
        <div style={{height: '60vh', width: '100%'}}>
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

                <Marker 
                    position={POSICAO_INICIAL as [number, number]}
                    icon={ICONE_PERSONALIZADO}
                    >
                    <Popup>
                        Conecta+ <br /> Sorocaba, seu ponto inicial!
                    </Popup>
                </Marker>

            </MapContainer>
        </div>
    )
}