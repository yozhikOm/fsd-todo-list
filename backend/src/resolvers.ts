import { isSameDay } from 'date-fns';
import { tasks } from './db';
import { Task } from './types';

export const resolvers = {
  Query: {
    tasks: () => tasks,
    task: (_: any, { id }: { id: string }) =>
      tasks.find((task: Task) => task.id === id),
    tasksByCompleted: (_: any, { completed }: { completed: boolean }) =>
      tasks.filter((task) => task.completed == completed),
    tasksToday: () =>
      tasks.filter((task) => {
        if (!task.date) return;

        const taskDate = new Date(task.date);
        const today = new Date();

        if (isSameDay(taskDate, today)) {
          return task;
        }
      }),
  },

  Mutation: {
    addTask: (_: any, args: any) => {
      const newTask: Task = {
        id: Date.now().toString(),
        completed: false,
        ...args,
      };
      tasks.push(newTask);
      return newTask;
    },
    editTask: (_: any, { id, ...args }: { id: string }) => {
      const task = tasks.find(t => t.id === id);
      if(!task) throw new Error('Task not found');
      Object.assign(task, args);
      return task;
    },
    toggleTask: (_: any, { id }: { id: string }) => {
      const task = tasks.find((t) => t.id === id);
      if (!task) throw new Error('Task not found');

      task.completed = !task.completed;
      return task;
    },

    deleteTask: (_: any, { id }: { id: string }) => {
      const index = tasks.findIndex((task) => task.id === id);
      if (index === -1) throw new Error('Task not found');
      tasks.splice(index, 1);
      return true;
    },
  },
};
