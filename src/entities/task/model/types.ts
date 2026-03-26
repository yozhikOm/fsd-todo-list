export type Task = {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    priority: 1 | 2 | 3 | 4;
    date?: string; // ISO дата
    duration?: number;
}