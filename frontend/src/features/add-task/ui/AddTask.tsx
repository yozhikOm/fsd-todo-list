import { TaskForm, type Task } from '@/entities/task';
import { useAddTask } from '@/entities/task/api/useAddTask';

export const AddTask = ({ onClose }: { onClose: () => void }) => {
  const [addTask] = useAddTask();

  const handleSubmit = (task: Task) => {
    addTask({
      variables: {
        title: task.title,
        description: task.description,
        priority: task.priority,
        date: task.date,
      }
    }).then(() => {
      onClose();
    });
  };

  return (
    <TaskForm 
      onSubmit={handleSubmit} 
      onClose={onClose}
      submitLabel={'Добавить'}
    />
  );
};
