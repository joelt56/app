
import React from 'react';
import { View } from '../types';
import { BookOpenIcon } from './icons/BookOpenIcon';
import { MapIcon } from './icons/MapIcon';
import { CalendarIcon } from './icons/CalendarIcon';
import { QuizIcon } from './icons/QuizIcon';

interface HomeProps {
  setActiveView: (view: View) => void;
}

const FeatureCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  bgImage: string;
}> = ({ title, description, icon, onClick, bgImage }) => (
  <div
    onClick={onClick}
    className="relative rounded-xl overflow-hidden shadow-lg cursor-pointer group transform hover:-translate-y-2 transition-transform duration-300"
  >
    <img src={bgImage} alt={title} className="w-full h-64 object-cover" />
    <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-70 transition-all duration-300 flex flex-col justify-end p-6">
      <div className="bg-nica-blue/80 p-2 rounded-full w-12 h-12 flex items-center justify-center mb-4 border-2 border-nica-gold">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-nica-white font-serif">{title}</h3>
      <p className="text-nica-light-gray mt-1">{description}</p>
    </div>
  </div>
);

export const Home: React.FC<HomeProps> = ({ setActiveView }) => {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in">
      <div className="text-center bg-nica-white p-8 rounded-2xl shadow-md mb-8 border-b-4 border-nica-blue">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-nica-dark-blue font-serif">¡Bienvenido a NicaCultura!</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          Explora la riqueza de Nicaragua a través de sus historias, lugares, fiestas y desafíos. Una aventura educativa para redescubrir nuestras raíces.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        <FeatureCard
          title="Relatos y Leyendas"
          description="Sumérgete en los mitos que han formado nuestra identidad."
          icon={<BookOpenIcon className="w-7 h-7 text-nica-gold" />}
          onClick={() => setActiveView(View.Stories)}
          bgImage="https://picsum.photos/seed/story/600/400"
        />
        <FeatureCard
          title="Mapa Interactivo"
          description="Viaja por los departamentos y descubre sus tesoros culturales."
          icon={<MapIcon className="w-7 h-7 text-nica-gold" />}
          onClick={() => setActiveView(View.Map)}
          bgImage="https://picsum.photos/seed/map/600/400"
        />
        <FeatureCard
          title="Calendario Festivo"
          description="Conoce las celebraciones que llenan de color y vida a nuestro país."
          icon={<CalendarIcon className="w-7 h-7 text-nica-gold" />}
          onClick={() => setActiveView(View.Calendar)}
          bgImage="https://picsum.photos/seed/festival/600/400"
        />
        <FeatureCard
          title="Reto Cultural"
          description="Pon a prueba tu conocimiento y aprende jugando."
          icon={<QuizIcon className="w-7 h-7 text-nica-gold" />}
          onClick={() => setActiveView(View.Quiz)}
          bgImage="https://picsum.photos/seed/quiz/600/400"
        />
      </div>
    </div>
  );
};
