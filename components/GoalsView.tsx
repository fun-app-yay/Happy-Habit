// FIX: Implemented the GoalsView component to resolve module errors.
import React, { useState, useMemo } from 'react';
import { Goal, GoalCategory, GoalTimeframe } from '../types';
import useLocalStorage from '../hooks/useLocalStorage';
import { getGoalSuggestions } from '../services/geminiService';
import { categories } from '../utils/categories';
import Button from './common/Button';
import Spinner from './common/Spinner';
import ProgressCircle from './common/ProgressCircle';
import { PlusIcon, TrashIcon, SparklesIcon, TrophyIcon } from './icons';

const GoalsView: React.FC = () => {
  const [goals, setGoals] = useLocalStorage<Goal[]>('goals', []);
  const [newGoalText, setNewGoalText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<GoalCategory>('Health');
  const [selectedTimeframe, setSelectedTimeframe] = useState<GoalTimeframe>('Daily');
  const [isLoading, setIsLoading] = useState<GoalCategory | null>(null);

  const addGoal = () => {
    if (newGoalText.trim() === '') return;
    const newGoal: Goal = {
      id: Date.now().toString(),
      text: newGoalText,
      category: selectedCategory,
      timeframe: selectedTimeframe,
      progress: 0,
      completed: false,
    };
    setGoals([newGoal, ...goals]);
    setNewGoalText('');
  };

  const deleteGoal = (id: string) => {
    setGoals(goals.filter((goal) => goal.id !== id));
  };
  
  const updateGoalProgress = (id: string, progress: number) => {
      setGoals(goals.map(g => g.id === id ? {...g, progress, completed: progress === 100} : g));
  }

  const handleGetSuggestions = async (category: GoalCategory) => {
    setIsLoading(category);
    const suggestions = await getGoalSuggestions(category);
    if (suggestions.length > 0) {
      const newGoals = suggestions.map((text) => ({
        id: `${Date.now()}-${Math.random()}`,
        text,
        category,
        timeframe: selectedTimeframe, // Default to current selection
        progress: 0,
        completed: false,
      }));
      setGoals([...newGoals, ...goals]);
    }
    setIsLoading(null);
  };
  
  const goalsByCategory = useMemo(() => {
    return categories.map(category => {
        const categoryGoals = goals.filter(goal => goal.category === category.name);
        const totalProgress = categoryGoals.reduce((sum, goal) => sum + goal.progress, 0);
        const averageProgress = categoryGoals.length > 0 ? Math.round(totalProgress / categoryGoals.length) : 0;
        
        return {
            ...category,
            goals: categoryGoals,
            averageProgress,
        };
    });
  }, [goals]);
  
  const progressByTimeframe = useMemo(() => {
    const timeframes: GoalTimeframe[] = ['Daily', 'Weekly', 'Monthly'];
    return timeframes.map(timeframe => {
        const timeframeGoals = goals.filter(goal => goal.timeframe === timeframe);
        if (timeframeGoals.length === 0) {
            return { timeframe, progress: 0 };
        }
        const totalProgress = timeframeGoals.reduce((sum, goal) => sum + goal.progress, 0);
        return {
            timeframe,
            progress: Math.round(totalProgress / timeframeGoals.length),
        };
    });
  }, [goals]);


  return (
    <div className="space-y-8">
       <div className="flex items-center">
        <TrophyIcon className="w-10 h-10 text-pale-gold mr-4" />
        <div>
            <h2 className="text-3xl font-bold text-gray-700">My Goals</h2>
            <p className="text-dusty-blue">Set, track, and achieve your aspirations.</p>
        </div>
      </div>
      
      <div className="bg-off-white p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Progress Overview</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {progressByTimeframe.map(({ timeframe, progress }) => (
                <div key={timeframe} className="flex flex-col items-center">
                    <h4 className="text-lg font-medium text-gray-600 mb-3">{timeframe}</h4>
                    <ProgressCircle progress={progress} size={120} strokeWidth={10} />
                </div>
            ))}
        </div>
      </div>
      
      <div className="bg-off-white p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Add a New Goal</h3>
        <div className="space-y-4">
            <input
                type="text"
                value={newGoalText}
                onChange={(e) => setNewGoalText(e.target.value)}
                placeholder="e.g., Meditate for 10 minutes daily"
                className="w-full p-3 border border-light-sky-blue rounded-md focus:ring-2 focus:ring-sage-green focus:border-sage-green outline-none transition bg-white"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <select
                    value={selectedTimeframe}
                    onChange={(e) => setSelectedTimeframe(e.target.value as GoalTimeframe)}
                    className="w-full p-3 border border-light-sky-blue rounded-md focus:ring-2 focus:ring-sage-green focus:border-sage-green outline-none transition bg-white"
                >
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                </select>
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value as GoalCategory)}
                    className="w-full p-3 border border-light-sky-blue rounded-md focus:ring-2 focus:ring-sage-green focus:border-sage-green outline-none transition bg-white"
                >
                    {categories.map(cat => <option key={cat.name} value={cat.name}>{cat.name}</option>)}
                </select>
            </div>
            <div className="flex justify-end">
                <Button onClick={addGoal}>
                    <PlusIcon className="w-5 h-5 mr-2" />
                    Add Goal
                </Button>
            </div>
        </div>
      </div>
      
      <div className="space-y-6">
        {goalsByCategory.map(({ name, Icon, color, bgColor, goals: categoryGoals, averageProgress }) => (
          <div key={name}>
             <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                    <Icon className={`w-6 h-6 mr-3 ${color}`} />
                    <h3 className="text-2xl font-bold text-gray-700">{name}</h3>
                </div>
                 <Button onClick={() => handleGetSuggestions(name)} disabled={isLoading === name} variant="secondary" size="small">
                    {isLoading === name ? <Spinner /> : <SparklesIcon className="w-4 h-4 mr-1" />}
                    Suggest
                </Button>
            </div>
            <div className="mb-4">
                <div className="flex justify-between items-center mb-1 text-sm">
                    <span className="font-medium text-dusty-blue">Overall Progress</span>
                    <span className={`font-bold ${color}`}>{averageProgress}%</span>
                </div>
                <div className="w-full bg-light-sky-blue rounded-full h-2.5">
                    <div 
                        className={`${bgColor} h-2.5 rounded-full transition-all duration-500 ease-out`} 
                        style={{ width: `${averageProgress}%` }}>
                    </div>
                </div>
            </div>
            {categoryGoals.length === 0 ? (
                <div className="text-center py-6 bg-off-white/50 rounded-xl border border-dashed border-light-sky-blue">
                    <p className="text-dusty-blue">No goals set for {name} yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryGoals.map((goal) => (
                    <div key={goal.id} className="bg-off-white p-5 rounded-xl shadow-md flex flex-col justify-between">
                        <div>
                            <p className={`text-gray-700 mb-4 flex-grow ${goal.completed ? 'line-through' : ''}`}>{goal.text}</p>
                            <span className="text-xs font-semibold bg-light-sky-blue text-dusty-blue px-2 py-1 rounded-full">{goal.timeframe}</span>
                        </div>
                        <div className="flex items-end justify-between mt-4">
                            <div className="w-full mr-4">
                               <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    step="10"
                                    value={goal.progress}
                                    onChange={(e) => updateGoalProgress(goal.id, parseInt(e.target.value, 10))}
                                    className="w-full h-2 bg-light-sky-blue rounded-lg appearance-none cursor-pointer"
                                />
                            </div>
                            <div className="relative">
                                <ProgressCircle progress={goal.progress} size={50} strokeWidth={5} />
                                <button onClick={() => deleteGoal(goal.id)} className="absolute -top-2 -right-2 bg-white rounded-full p-0.5 text-dusty-blue/60 hover:text-dusty-rose transition-colors">
                                    <TrashIcon className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoalsView;