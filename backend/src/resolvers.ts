import { mapTaskToDTO, TaskModel } from './models/Task';

export const resolvers = {
  Query: {
    tasks: async () => {
      const tasks = await TaskModel.find();
      return tasks.map(mapTaskToDTO);
    },
    task: async (_: any, { id }: { id: string }) => {
      const task = await TaskModel.findById(id);
      return task ? mapTaskToDTO(task) : null;
    },
    tasksByCompleted: async (_: any, { completed }: { completed: boolean }) => {
      const tasks = await TaskModel.find({ completed });
      return tasks.map(mapTaskToDTO);
    },
    tasksToday: async () => {
      // Получаем начало и конец текущего дня
      const today = new Date();
      const startOfDay = new Date(today);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(today);
      endOfDay.setHours(23, 59, 59, 999);

      // Ищем задачи с датой в пределах сегодняшнего дня
      const tasks = await TaskModel.find({
        date: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
      });

      return tasks.map(mapTaskToDTO);
    },
  },

  Mutation: {
    addTask: async (_: any, args: any) => {
      try {
        const newTask = new TaskModel({
          ...args,
          completed: false,
          date: args.date ? new Date(args.date) : undefined
        });
        await newTask.save();
        return newTask;
      } catch (error) {
        console.error('Error creating task:', error);
        throw error;
      }
    },
    editTask: async (_: any, { id, ...args }: { id: string }) => {
      try {
        const task = TaskModel.findByIdAndUpdate(id, args, { new: true });
        if (!task) {
          throw new Error('Task not found');
        }
        return task;
      } catch (error) {
        console.error('Error updating task:', error);
        throw error;
      }
    },
    toggleTask: async (_: any, { id }: { id: string }) => {
      try {
        const task = await TaskModel.findById(id);

        if (!task) {
          throw new Error('Task not found');
        }

        task.completed = !task.completed;
        await task.save();

        return task;
      } catch (error) {
        console.error('Error updating task:', error);
        throw error;
      }
    },

    deleteTask: async (_: any, { id }: { id: string }) => {
      try {
        const result = await TaskModel.findByIdAndDelete(id);
        return !!result;
      } catch (error) {
        console.error('Error deleting task:', error);
        throw error;
      }
    },
  },
};
