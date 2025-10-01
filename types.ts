// FIX: Created type definitions to resolve module and type errors across the application.

export type RoutineType = 'Morning' | 'Daily' | 'Night';

export interface RoutineTask {
  id: string;
  text: string;
  completed: boolean;
}

export type GoalCategory = 
  | 'Health'
  | 'Mindfulness'
  | 'Finance'
  | 'Career'
  | 'Travel'
  | 'Family & Friends'
  | 'Beauty'
  | 'Self-Growth';

export type GoalTimeframe = 'Daily' | 'Weekly' | 'Monthly';

export interface Goal {
  id: string;
  text: string;
  category: GoalCategory;
  timeframe: GoalTimeframe;
  progress: number;
  completed: boolean;
}

export interface JournalEntry {
  id: string;
  text: string;
  date: string; // ISO string
}

export interface AdHocTask {
  id: string;
  text: string;
  completed: boolean;
  dueDate: string; // YYYY-MM-DD
}
