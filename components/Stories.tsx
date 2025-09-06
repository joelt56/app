
import React, { useState, useCallback } from 'react';
import { generateNicaraguanFolktale } from '../services/geminiService';
import { LoadingSpinner } from './LoadingSpinner';
import { BookOpenIcon } from './icons/BookOpenIcon';

export const Stories: React.FC = () => {
  const [story, setStory] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const fetchStory = useCallback(async () => {
    setIsLoading(true);
    setError('');
    setStory('');
    try {
      const generatedStory = await generateNicaraguanFolktale();
      setStory(generatedStory);
    } catch (err) {
      setError('Hubo un error al generar el relato. Inténtalo de nuevo.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in">
       <div className="bg-nica-white rounded-2xl shadow-lg p-6 sm:p-8 border-t-4 border-nica-blue">
        <div className="flex items-center mb-6">
          <BookOpenIcon className="w-10 h-10 text-nica-blue mr-4" />
          <h2 className="text-3xl font-bold text-nica-dark-blue font-serif">Relatos y Leyendas de Nicaragua</h2>
        </div>
        
        <p className="text-gray-600 mb-6">
          Cada rincón de Nicaragua guarda una historia. Presiona el botón para que la magia de nuestras leyendas cobre vida y te cuente un secreto del pasado.
        </p>

        <div className="text-center mb-8">
            <button
                onClick={fetchStory}
                disabled={isLoading}
                className="bg-nica-blue hover:bg-nica-dark-blue text-white font-bold py-3 px-6 rounded-lg shadow-md transition-transform duration-200 transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                {isLoading ? 'Generando...' : 'Generar un Nuevo Relato'}
            </button>
        </div>

        {isLoading && <LoadingSpinner message="Tejiendo una nueva historia..." />}
        {error && <p className="text-center text-red-500 bg-red-100 p-4 rounded-lg">{error}</p>}
        {story && (
            <div className="bg-nica-light-gray p-6 rounded-lg animate-fade-in prose max-w-none">
                {story.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 text-lg text-gray-800 leading-relaxed">{paragraph}</p>
                ))}
            </div>
        )}
       </div>
    </div>
  );
};
