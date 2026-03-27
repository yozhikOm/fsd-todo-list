export type PriorityType = 1 | 2 | 3 | 4;

export type Task = {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    priority: PriorityType;
    date?: string; // ISO дата
    duration?: number;
}