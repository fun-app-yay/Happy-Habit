import React from 'react';
import RoutineList from './RoutineList';
import TodoList from './TodoList';

const RoutineView: React.FC = () => {
  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-3xl font-bold text-slate-800 mb-6">My Routines</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <RoutineList routineType="Morning" />
          <RoutineList routineType="Daily" />
          <RoutineList routineType="Night" />
          <RoutineList routineType="Weekly" />
        </div>
      </div>
      <div>
        <TodoList />
      </div>
    </div>
  );
};

export default RoutineView;
