import { TaskForm, useTaskStore, type Task } from '@/entities/task';

export const EditTask = ({
  task,
  onClose,
}: {
  task: Task;
  onClose: () => void;
}) => {
  const updateTask = useTaskStore((s) => s.updateTask);
  
  return (
    <TaskForm 
      task={task}
      onSubmit={(task) => updateTask(task)}
      onClose={onClose}
      submitLabel='Сохранить'
    />
  );
};
