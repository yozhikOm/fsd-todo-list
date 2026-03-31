import { useState } from 'react';
import { AddButton, AddTask } from '@/features/add-task';
import { TaskList } from '@/widgets/task-list/ui/TaskList';

export const TasksPage = () => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 16 }}>
      <h1>Входящие</h1>
      <TaskList
        editingTaskId={editingTaskId}
        setEditingTaskId={(id) => {
          setIsAddOpen(false); // закрыли add
          setEditingTaskId(id);
        }}
      />
      {isAddOpen ? (
        <AddTask onClose={() => setIsAddOpen(false)} />
      ) : (
        <AddButton
          onClick={() => {
            setEditingTaskId(null); // закрыли edit
            setIsAddOpen(true);
          }}
        />
      )}
    </div>
  );
};
