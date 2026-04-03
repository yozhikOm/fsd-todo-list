import { Task } from './types';

export let tasks: Task[] = [
  {
    id: '1',
    title: 'Помыть посуду',
    description: 'Загрузить посудомойку',
    completed: false,
    priority: 2,
    date: '2026-03-20',
  },
  {
    id: '2',
    title: 'Получасовая прогулка',
    description: 'Погулять немного',
    completed: false,
    priority: 3,
    date: '2026-03-25',
  },
  {
    id: '3',
    title: 'Купить хлеб',
    description: 'Сходить в пекарню',
    completed: true,
    priority: 3,
    date: '2026-04-01',
  },
];
