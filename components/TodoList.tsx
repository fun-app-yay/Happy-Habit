import React, { useState, useMemo } from 'react';
import { AdHocTask } from '../types';
import useLocalStorage from '../hooks/useLocalStorage';
import Button from './common/Button';
import { PlusIcon, TrashIcon, CheckIcon, ClipboardListIcon } from './icons';

const TodoList: React.FC = () => {
  const [tasks, setTasks] = useLocalStorage<AdHocTask[]>('adhoc-tasks', []);
  const [newTaskText, setNewTaskText] = useState('');
  
  // Get today's date in YYYY-MM-DD format
  const getToday = () => new Date().toISOString().split('T')[0];
  const [newDueDate, setNewDueDate] = useState(getToday());

  const addTask = () => {
    if (newTaskText.trim() === '' || newDueDate.trim() === '') return;
    const newTask: AdHocTask = {
      id: Date.now().toString(),
      text: newTaskText,
      completed: false,
      dueDate: newDueDate,
    };
    setTasks([...tasks, newTask]);
    setNewTaskText('');
    setNewDueDate(getToday());
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };
  
  const sortedTasks = useMemo(() => {
    return [...tasks].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  }, [tasks]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    // Adjust for timezone offset to prevent date from shifting
    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() + userTimezoneOffset).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };
  
  const isOverdue = (dueDate: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today to the start of the day
    return new Date(dueDate) < today;
  }

  return (
    <div className="bg-off-white p-6 rounded-xl shadow-md">
      <div className="flex items-center mb-4">
        <ClipboardListIcon className="w-6 h-6 mr-3 text-dusty-blue" />
        <h3 className="text-xl font-bold text-gray-700">My To-do List</h3>
      </div>
      <div className="space-y-3 mb-4 min-h-[5rem]">
        {sortedTasks.length > 0 ? sortedTasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center bg-white p-3 rounded-lg shadow-sm"
          >
            <button
              onClick={() => toggleTask(task.id)}
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 flex-shrink-0 transition-colors ${
                task.completed ? 'bg-sage-green border-sage-green' : 'border-light-sky-blue'
              }`}
            >
              {task.completed && <CheckIcon className="w-4 h-4 text-white" />}
            </button>
            <span className={`flex-grow ${task.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
              {task.text}
            </span>
            <span className={`text-sm font-medium ml-4 whitespace-nowrap ${!task.completed && isOverdue(task.dueDate) ? 'text-dusty-rose' : 'text-gray-500'}`}>
                {formatDate(task.dueDate)}
            </span>
            <button
              onClick={() => deleteTask(task.id)}
              className="ml-3 text-gray-400 hover:text-dusty-rose"
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
        )) : (
            <div className="text-center py-6">
                <p className="text-dusty-blue">No tasks yet. Add one below!</p>
            </div>
        )}
      </div>
      <div className="space-y-2">
         <div className="flex flex-col sm:flex-row gap-2">
            <input
                type="text"
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTask()}
                placeholder="Add a new to-do..."
                className="w-full p-2 border border-light-sky-blue rounded-md focus:ring-2 focus:ring-sage-green focus:border-sage-green outline-none transition bg-white"
            />
            <input
                type="date"
                value={newDueDate}
                onChange={(e) => setNewDueDate(e.target.value)}
                 className="sm:w-auto p-2 border border-light-sky-blue rounded-md focus:ring-2 focus:ring-sage-green focus:border-sage-green outline-none transition bg-white"
            />
            <Button onClick={addTask} className="sm:w-auto" aria-label="Add task">
                <PlusIcon className="w-5 h-5" />
            </Button>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
