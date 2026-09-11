'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet'
import L from 'leaflet'

// Coordenadas fijas en Santiago del Estero Capital
const SGO_CENTER = { lat: -27.7833, lng: -64.2667 }

// 🎯 Marcador personalizado con animación de pulso / titileo
const customIcon = (color: string) =>
    L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
      <div style="position: relative; width: 24px; height: 24px; display: flex; items-center: center; justify-content: center;">
        <!-- Anillo animado que titila / se expande -->
        <span style="
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background-color: ${color};
          opacity: 0.75;
          animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        "></span>
        <!-- Punto central fijo con sombra -->
        <span style="
          position: relative;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background-color: ${color};
          border: 2.5px solid white;
          box-shadow: 0 0 10px ${color};
        "></span>
      </div>
    `,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
    })

// Re-evalúa los límites reales del DOM apenas se monta
function MapController() {
    const map = useMap()
    useEffect(() => {
        const timer = setTimeout(() => {
            map.invalidateSize()
        }, 200)
        return () => clearTimeout(timer)
    }, [map])
    return null
}

interface ProfessionalMapProps {
    professionals: Array<{
        id: string
        name: string
        specialty: string
        lat: number
        lng: number
        type: string
    }>
}

export default function MapReal({ professionals }: ProfessionalMapProps) {
    const [userCoords, setUserCoords] = useState(SGO_CENTER)

    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    setUserCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude })
                },
                () => setUserCoords(SGO_CENTER)
            )
        }
    }, [])

    return (
        <div className="w-full h-full relative z-0 flex-1">
            <MapContainer
                center={[userCoords.lat, userCoords.lng]}
                zoom={13}
                zoomControl={false}
                scrollWheelZoom={true}
                style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
            >
                <MapController />

                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Circle
                    center={[userCoords.lat, userCoords.lng]}
                    radius={2000}
                    pathOptions={{
                        fillColor: '#064e3b',
                        fillOpacity: 0.12,
                        color: '#064e3b',
                        weight: 1.5,
                    }}
                />

                {professionals.map((prof) => (
                    <Marker
                        key={prof.id}
                        position={[prof.lat, prof.lng]}
                        icon={
                            prof.type === 'psychologist'
                                ? customIcon('#064e3b')
                                : prof.type === 'therapist'
                                    ? customIcon('#7e22ce')
                                    : prof.type === 'coach'
                                        ? customIcon('#d97706')
                                        : customIcon('#2563eb')
                        }
                    >
                        <Popup>
                            <div className="text-xs font-sans p-1">
                                <strong className="block text-slate-900 font-bold">{prof.name}</strong>
                                <span className="text-slate-500">{prof.specialty}</span>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    )
}