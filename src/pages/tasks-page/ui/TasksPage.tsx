import { useState } from 'react';
import { AddTaskForm } from '@/features/add-task/ui/AddTaskForm';
import { AddButton } from '@/features/add-task/ui/AddButton';
import { TaskList } from '@/widgets/task-list/ui/TaskList';

export const TasksPage = () => {
  const [openForm, setOpenForm] = useState<boolean>(false);

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 16 }}>
      <h1>Входящие</h1>
      <TaskList />
      {openForm ? (
        <AddTaskForm />
      ) : (
        <AddButton onClick={() => setOpenForm(true)} />
      )}
    </div>
  );
};
