
import React, { useState, useEffect } from 'react';
import { generateFestivities } from '../services/geminiService';
import { Festivity } from '../types';
import { LoadingSpinner } from './LoadingSpinner';
import { CalendarIcon } from './icons/CalendarIcon';

const FestivityCard: React.FC<{ festivity: Festivity }> = ({ festivity }) => (
    <div className="bg-nica-white rounded-lg shadow-md p-6 border-l-4 border-nica-gold hover:shadow-xl transition-shadow duration-300">
        <h3 className="text-xl font-bold text-nica-dark-blue font-serif">{festivity.name}</h3>
        <p className="text-sm font-semibold text-nica-blue my-2">{festivity.date}</p>
        <p className="text-gray-600">{festivity.description}</p>
    </div>
);

export const FestivitiesCalendar: React.FC = () => {
    const [festivities, setFestivities] = useState<Festivity[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    
    useEffect(() => {
        const fetchFestivities = async () => {
            setIsLoading(true);
            const data = await generateFestivities();
            setFestivities(data);
            setIsLoading(false);
        };
        fetchFestivities();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in">
            <div className="bg-nica-white rounded-2xl shadow-lg p-6 sm:p-8 border-t-4 border-nica-blue">
                <div className="flex items-center mb-4">
                    <CalendarIcon className="w-10 h-10 text-nica-blue mr-4" />
                    <h2 className="text-3xl font-bold text-nica-dark-blue font-serif">Calendario Festivo</h2>
                </div>
                <p className="text-gray-600 mb-8">
                    Descubre algunas de las celebraciones más emblemáticas que llenan de alegría y tradición a Nicaragua a lo largo del año.
                </p>

                {isLoading ? (
                    <LoadingSpinner message="Cargando festividades..." />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {festivities.length > 0 ? (
                            festivities.map((festivity, index) => (
                                <FestivityCard key={index} festivity={festivity} />
                            ))
                        ) : (
                            <p className="text-center text-gray-500 md:col-span-2">No se pudieron cargar las festividades.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
