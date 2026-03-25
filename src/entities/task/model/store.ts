import { create } from 'zustand';
import type { Task } from './types';

type TaskStore = {
    tasks: Task[];
    addTask: (title: string) => void;
    toggleTask: (id: string) => void;
    deleteTask: (id: string) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
    tasks: [],

    addTask: (title) =>
        set((state) => ({
            tasks: [
                ...state.tasks,
                {
                    id: Date.now().toString(),
                    title,
                    completed: false,
                    priority: 4
                }
            ]
        })),
    toggleTask: (id) => 
        set((state) => ({
            tasks: state.tasks.map((t) =>
                t.id === id ? { ...t, completed: !t.completed} : t) 
        })),

    deleteTask: (id) =>
        set((state) => ({
            tasks: state.tasks.filter((t) => t.id !== id)
        }))
}));