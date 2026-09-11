'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet'
import L from 'leaflet'

// Coordenadas fijas en Santiago del Estero Capital
const SGO_CENTER = { lat: -27.7833, lng: -64.2667 }

const customIcon = (color: string) =>
    L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
      <div style="
        background-color: ${color};
        width: 22px;
        height: 22px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 0 12px ${color};
      "></div>
    `,
        iconSize: [22, 22],
        iconAnchor: [11, 11],
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
                zoomControl={false} // Desactivado para estética limpia en celular
                scrollWheelZoom={true}
                style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
            >
                <MapController />

                {/* Tiles libres y limpios de OpenStreetMap */}
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Radio de cobertura */}
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

                {/* Marcadores */}
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