
import React, { useState } from 'react';
import { View } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './components/Home';
import { Stories } from './components/Stories';
import { InteractiveMap } from './components/InteractiveMap';
import { FestivitiesCalendar } from './components/FestivitiesCalendar';
import { QuizGame } from './components/QuizGame';
import { CollaborativeLibrary } from './components/CollaborativeLibrary';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>(View.Home);

  const renderActiveView = () => {
    switch (activeView) {
      case View.Home:
        return <Home setActiveView={setActiveView} />;
      case View.Stories:
        return <Stories />;
      case View.Map:
        return <InteractiveMap />;
      case View.Calendar:
        return <FestivitiesCalendar />;
      case View.Quiz:
        return <QuizGame />;
      case View.Library:
        return <CollaborativeLibrary />;
      default:
        return <Home setActiveView={setActiveView} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-nica-light-gray">
      <Header setActiveView={setActiveView} activeView={activeView} />
      <main className="flex-grow">
        {renderActiveView()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
