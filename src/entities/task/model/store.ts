import { create } from 'zustand';
import type { Task } from './types';

type TaskStore = {
    tasks: Task[];
    addTask: (title: string) => void;
    toggleTask: (id: string) => void;
    deleteTask: (id: string) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
    tasks: [
        {
            id: "1",
            title: "Помыть посуду",
            completed: false,
            priority: 2,
            date: "2026-03-20", // просрочено
        },
        {
            id: "2",
            title: "Получасовая прогулка",
            completed: false,
            priority: 3,
            date: "2026-03-25",
        },
    ],

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