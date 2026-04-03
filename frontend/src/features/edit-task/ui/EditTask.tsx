import { TaskForm, type Task } from '@/entities/task';
import { useEditTask } from '@/entities/task/api/useEditTask';

export const EditTask = ({
  task,
  onClose,
}: {
  task: Task;
  onClose: () => void;
}) => {
  const [editTask] = useEditTask();
  
  const handleSubmit = (task: Task) => {
    editTask({
      variables: {
        id: task.id,
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
      task={task}
      onSubmit={handleSubmit}
      onClose={onClose}
      submitLabel='Сохранить'
    />
  );
};
