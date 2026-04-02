import { useTaskStore } from '@/entities/task';
import { TaskItem } from './TaskItem';
import { useTasks } from '@/entities/task/api/useTasks';

type Props = {
  editingTaskId: string | null;
  setEditingTaskId: (id: string | null) => void;
};

export const TaskList = ({ editingTaskId, setEditingTaskId }: Props) => {
  //const tasks = useTaskStore((s) => s.tasks);
  const { data, loading } = useTasks();  
  
  if (loading || !data) return <div>Loading...</div>;  

  return (
    <div>
      {data.tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          isEditing={editingTaskId === task.id}
          onEdit={() => setEditingTaskId(task.id)}
          onCloseEdit={() => setEditingTaskId(null)}
        />
      ))}
    </div>
  );
};
