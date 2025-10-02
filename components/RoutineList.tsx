// FIX: Implemented the RoutineList component to resolve module errors.
import React, { useState } from 'react';
import { RoutineTask, RoutineType } from '../types';
import useLocalStorage from '../hooks/useLocalStorage';
import { getRoutineSuggestions } from '../services/geminiService';
import Button from './common/Button';
import Spinner from './common/Spinner';
import { PlusIcon, TrashIcon, SparklesIcon, CheckIcon, SunIcon, BookOpenIcon, RepeatIcon } from './icons';

interface RoutineListProps {
  routineType: RoutineType;
}

const RoutineList: React.FC<RoutineListProps> = ({ routineType }) => {
  const [items, setItems] = useLocalStorage<RoutineTask[]>(`routine-${routineType.toLowerCase()}`, []);
  const [newItemText, setNewItemText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const addItem = () => {
    if (newItemText.trim() === '') return;
    const newItem: RoutineTask = {
      id: Date.now().toString(),
      text: newItemText,
      completed: false,
    };
    setItems([newItem, ...items]);
    setNewItemText('');
  };

  const toggleItem = (id: string) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const deleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleGetSuggestions = async () => {
    setIsLoading(true);
    const suggestions = await getRoutineSuggestions(routineType);
    if (suggestions.length > 0) {
      const newItems = suggestions.map((text) => ({
        id: `${Date.now()}-${Math.random()}`,
        text,
        completed: false,
      }));
      setItems([...newItems, ...items]);
    }
    setIsLoading(false);
  };
  
  const getIcon = () => {
      switch (routineType) {
          case 'Morning': return <SunIcon className="w-6 h-6 mr-2" />;
          case 'Daily': return <CheckIcon className="w-6 h-6 mr-2" />;
          case 'Weekly': return <RepeatIcon className="w-6 h-6 mr-2" />;
          case 'Night': return <BookOpenIcon className="w-6 h-6 mr-2" />;
          default: return null;
      }
  }

  return (
    <div className="bg-off-white p-6 rounded-xl shadow-md">
      <div className="flex items-center mb-4">
        {getIcon()}
        <h3 className="text-xl font-bold text-gray-700">{routineType} Routine</h3>
      </div>
      <div className="space-y-3 mb-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center bg-white p-3 rounded-lg shadow-sm"
          >
            <button
              onClick={() => toggleItem(item.id)}
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 flex-shrink-0 transition-colors ${
                item.completed ? 'bg-sage-green border-sage-green' : 'border-light-sky-blue'
              }`}
            >
              {item.completed && <CheckIcon className="w-4 h-4 text-white" />}
            </button>
            <span className={`flex-grow ${item.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
              {item.text}
            </span>
            <button
              onClick={() => deleteItem(item.id)}
              className="ml-3 text-gray-400 hover:text-dusty-rose"
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
      <div className="space-y-2">
         <div className="flex gap-2">
            <input
                type="text"
                value={newItemText}
                onChange={(e) => setNewItemText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addItem()}
                placeholder="Add a new task..."
                className="w-full p-2 border border-light-sky-blue rounded-md focus:ring-2 focus:ring-sage-green focus:border-sage-green outline-none transition bg-white"
            />
            <Button onClick={addItem} size="icon" aria-label="Add task">
                <PlusIcon className="w-5 h-5" />
            </Button>
        </div>
        <Button onClick={handleGetSuggestions} disabled={isLoading} variant="secondary" className="w-full">
            {isLoading ? <Spinner /> : <SparklesIcon className="w-5 h-5 mr-2" />}
            Suggest Tasks
        </Button>
      </div>
    </div>
  );
};

export default RoutineList;