import { useState } from 'react';
import { AddButton } from '@/features/add-task/ui/AddButton/AddButton';
import { TaskList } from '@/widgets/task-list/ui/TaskList';
import { AddTask } from '@/features/add-task/ui/AddTask';

export const TasksPage = () => {
  const [openForm, setOpenForm] = useState<boolean>(false);

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 16 }}>
      <h1>Входящие</h1>
      <TaskList />
      {openForm ? (
        <AddTask onClose={() => setOpenForm(false)} />
      ) : (
        <AddButton onClick={() => setOpenForm(true)} />
      )}
    </div>
  );
};
