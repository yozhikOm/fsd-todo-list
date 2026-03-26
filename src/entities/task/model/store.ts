import { create } from 'zustand';
import type { Task } from './types';

type TaskStore = {
    tasks: Task[];
    addTask: (task: Task) => void;
    toggleTask: (id: string) => void;
    deleteTask: (id: string) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
    tasks: [
        {
            id: "1",
            title: "Помыть посуду",
            description: "some descr",
            completed: false,
            priority: 2,
            date: "2026-03-20", // просрочено
        },
        {
            id: "2",
            title: "Получасовая прогулка",
            description: "some descr",
            completed: false,
            priority: 3,
            date: "2026-03-25",
        },
    ],

    addTask: (task) =>
        set((state) => ({
            tasks: [
                ...state.tasks,
                task
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