import { TaskForm, useTaskStore } from '@/entities/task';

export const AddTask = ({ onClose }: { onClose: () => void }) => {
  const addTask = useTaskStore((s) => s.addTask);

  return (
    <TaskForm 
      onSubmit={(task) => addTask(task)} 
      onClose={onClose}
      submitLabel={'Добавить'}
    />
  );
};
