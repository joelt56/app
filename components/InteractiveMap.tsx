
import React, { useState, useCallback } from 'react';
import { generateMapInfo } from '../services/geminiService';
import { LoadingSpinner } from './LoadingSpinner';
import { MapIcon } from './icons/MapIcon';

// A simple SVG Map of Nicaragua. For a real app, a more detailed SVG or library would be better.
const NicaraguaMapSVG: React.FC<{ onRegionClick: (region: string) => void; selectedRegion: string | null }> = ({ onRegionClick, selectedRegion }) => {
    const regions = [
        { id: 'Chinandega', d: 'M 50 20 L 60 10 L 80 30 L 70 40 Z' },
        { id: 'León', d: 'M 70 40 L 80 30 L 100 50 L 90 60 Z' },
        { id: 'Managua', d: 'M 90 60 L 100 50 L 120 70 L 110 80 Z' },
        { id: 'Masaya', d: 'M 110 80 L 120 70 L 125 75 L 115 85 Z' },
        { id: 'Granada', d: 'M 115 85 L 125 75 L 135 90 L 125 100 Z' },
        { id: 'Rivas', d: 'M 125 100 L 135 90 L 130 110 L 120 115 Z' },
        { id: 'Carazo', d: 'M 110 80 L 115 85 L 120 115 L 105 100 Z' },
        { id: 'Estelí', d: 'M 80 30 L 95 20 L 110 40 L 100 50 Z' },
        { id: 'Madriz', d: 'M 80 15 L 95 5 L 110 20 L 95 20 Z' },
        { id: 'Nueva Segovia', d: 'M 95 5 L 115 -5 L 130 10 L 110 20 Z' },
        { id: 'Jinotega', d: 'M 110 40 L 140 30 L 150 60 L 120 70 Z' },
        { id: 'Matagalpa', d: 'M 120 70 L 150 60 L 160 90 L 135 90 Z' },
        { id: 'Boaco', d: 'M 135 90 L 160 90 L 170 110 L 140 120 Z' },
        { id: 'Chontales', d: 'M 140 120 L 170 110 L 180 130 L 150 140 Z' },
        { id: 'Río San Juan', d: 'M 150 140 L 180 130 L 200 160 L 160 170 Z' },
        { id: 'RAAN', d: 'M 140 30 L 200 10 L 220 70 L 150 60 Z' },
        { id: 'RAAS', d: 'M 150 60 L 220 70 L 230 140 L 180 130 Z' },
    ];
    return (
        <svg viewBox="0 0 250 180" className="w-full h-auto drop-shadow-lg">
            {regions.map(region => (
                <path
                    key={region.id}
                    d={region.d}
                    onClick={() => onRegionClick(region.id)}
                    className={`cursor-pointer transition-all duration-300 stroke-nica-dark-blue stroke-2 ${
                        selectedRegion === region.id ? 'fill-nica-gold' : 'fill-nica-blue/60 hover:fill-nica-blue/90'
                    }`}
                />
            ))}
        </svg>
    );
};

export const InteractiveMap: React.FC = () => {
    const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
    const [info, setInfo] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleRegionClick = useCallback(async (region: string) => {
        if (region === selectedRegion) return;
        setSelectedRegion(region);
        setIsLoading(true);
        setInfo('');
        const generatedInfo = await generateMapInfo(region);
        setInfo(generatedInfo);
        setIsLoading(false);
    }, [selectedRegion]);

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in">
            <div className="bg-nica-white rounded-2xl shadow-lg p-6 sm:p-8 border-t-4 border-nica-blue">
                 <div className="flex items-center mb-4">
                    <MapIcon className="w-10 h-10 text-nica-blue mr-4" />
                    <h2 className="text-3xl font-bold text-nica-dark-blue font-serif">Mapa Cultural Interactivo</h2>
                </div>
                <p className="text-gray-600 mb-6">
                    Nicaragua es un mosaico de culturas. Haz clic en un departamento para descubrir sus tesoros escondidos, sus sabores y sus tradiciones.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 bg-gray-200/50 p-4 rounded-lg">
                        <NicaraguaMapSVG onRegionClick={handleRegionClick} selectedRegion={selectedRegion} />
                    </div>
                    <div className="md:col-span-1 bg-nica-light-gray p-6 rounded-lg h-96 overflow-y-auto">
                        <h3 className="text-2xl font-bold text-nica-dark-blue font-serif mb-4">
                            {selectedRegion || 'Selecciona una región'}
                        </h3>
                        {isLoading && <LoadingSpinner message="Descubriendo secretos..."/>}
                        {info && <p className="text-gray-700 leading-relaxed">{info}</p>}
                        {!selectedRegion && !isLoading && (
                            <div className="text-center text-gray-500 pt-10">
                                <MapIcon className="w-16 h-16 mx-auto opacity-30" />
                                <p className="mt-2">La información cultural aparecerá aquí.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
