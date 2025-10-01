import React, { useState } from 'react';
import { JournalEntry } from '../types';
import useLocalStorage from '../hooks/useLocalStorage';
import { getJournalPrompt } from '../services/geminiService';
import Button from './common/Button';
import Spinner from './common/Spinner';
import { PlusIcon, TrashIcon, SparklesIcon, HeartNotebookIcon } from './icons';

const JournalView: React.FC = () => {
  const [entries, setEntries] = useLocalStorage<JournalEntry[]>('journal-entries', []);
  const [newEntryText, setNewEntryText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState<string>('');
  
  const addEntry = () => {
    if (newEntryText.trim() === '') return;
    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      text: newEntryText,
      date: new Date().toISOString(),
    };
    setEntries([newEntry, ...entries]);
    setNewEntryText('');
    setPrompt('');
  };
  
  const deleteEntry = (id: string) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };
  
  const handleGetPrompt = async () => {
    setIsLoading(true);
    const newPrompt = await getJournalPrompt();
    setPrompt(newPrompt);
    setNewEntryText(''); // Clear text area for the new prompt
    setIsLoading(false);
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <HeartNotebookIcon className="w-10 h-10 text-dusty-rose mr-4" />
        <div>
            <h2 className="text-3xl font-bold text-gray-700">My Journal</h2>
            <p className="text-dusty-blue">A space for your thoughts, reflections, and feelings.</p>
        </div>
      </div>
      
      <div className="bg-off-white p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">New Entry</h3>
        
        {prompt && (
            <div className="mb-4 p-3 bg-pale-gold/20 border border-pale-gold/50 rounded-lg">
                <p className="font-semibold text-yellow-800">{prompt}</p>
            </div>
        )}

        <textarea
          value={newEntryText}
          onChange={(e) => setNewEntryText(e.target.value)}
          placeholder="What's on your mind today?"
          rows={5}
          className="w-full p-3 border border-light-sky-blue rounded-md focus:ring-2 focus:ring-sage-green focus:border-sage-green outline-none transition bg-white"
        />
        <div className="mt-4 flex flex-col sm:flex-row gap-2 justify-end">
            <Button onClick={handleGetPrompt} disabled={isLoading} variant="secondary">
                {isLoading ? <Spinner /> : <SparklesIcon className="w-5 h-5 mr-2" />}
                Get a Prompt
            </Button>
            <Button onClick={addEntry} variant="primary">
                <PlusIcon className="w-5 h-5 mr-2" />
                Save Entry
            </Button>
        </div>
      </div>
      
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-700">Past Entries</h3>
        {entries.length === 0 ? (
          <div className="text-center py-10 bg-off-white rounded-xl shadow-md">
            <p className="text-dusty-blue">You haven't written any entries yet.</p>
            <p className="text-dusty-blue/70 text-sm mt-1">Start by writing what's on your mind or get a prompt!</p>
          </div>
        ) : (
            entries.map((entry) => (
                <div key={entry.id} className="bg-off-white p-6 rounded-xl shadow-md transition-shadow hover:shadow-lg">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm text-dusty-blue mb-2">{formatDate(entry.date)}</p>
                            <p className="text-gray-700 whitespace-pre-wrap">{entry.text}</p>
                        </div>
                        <button onClick={() => deleteEntry(entry.id)} className="text-dusty-blue/60 hover:text-dusty-rose transition-colors ml-4 flex-shrink-0">
                            <TrashIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            ))
        )}
      </div>
    </div>
  );
};

export default JournalView;