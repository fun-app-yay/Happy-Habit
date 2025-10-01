// FIX: Implemented the main App component with navigation to resolve module errors and provide a basic application structure.
import React, { useState } from 'react';
import RoutineView from './components/RoutineView';
import GoalsView from './components/GoalsView';
import JournalView from './components/JournalView';
import { SunIcon, TrophyIcon, NoteIcon } from './components/icons';

type View = 'routines' | 'goals' | 'journal';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('routines');

  const renderView = () => {
    switch (activeView) {
      case 'routines':
        return <RoutineView />;
      case 'goals':
        return <GoalsView />;
      case 'journal':
        return <JournalView />;
      default:
        return <RoutineView />;
    }
  };

  const navItems = [
    { id: 'routines', label: 'Routines', Icon: SunIcon },
    { id: 'goals', label: 'Goals', Icon: TrophyIcon },
    { id: 'journal', label: 'Journal', Icon: NoteIcon },
  ];

  return (
    <div className="bg-cream min-h-screen font-sans text-gray-800">
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-20">
            <h1 className="text-2xl font-bold text-sage-green mr-8 hidden sm:block">Mindful Path</h1>
            <div className="flex space-x-2 sm:space-x-4 bg-off-white p-2 rounded-full">
              {navItems.map(({ id, label, Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveView(id as View)}
                  className={`flex items-center justify-center px-4 py-2 rounded-full text-sm sm:text-base font-medium transition-colors duration-200 ${
                    activeView === id
                      ? 'bg-sage-green text-white shadow'
                      : 'text-dusty-blue hover:bg-light-sky-blue'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-2" />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </nav>
      </header>
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        {renderView()}
      </main>
      <footer className="text-center py-4 text-dusty-blue/60 text-sm">
        <p>Built with mindfulness and Gemini AI.</p>
      </footer>
    </div>
  );
};

export default App;
