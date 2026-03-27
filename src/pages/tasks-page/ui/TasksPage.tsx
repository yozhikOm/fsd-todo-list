import { useState } from 'react';
import { AddTaskForm } from '@/features/add-task/ui/AddTaskForm/AddTaskForm';
import { AddButton } from '@/features/add-task/ui/AddButton/AddButton';
import { TaskList } from '@/widgets/task-list/ui/TaskList';

export const TasksPage = () => {
  const [openForm, setOpenForm] = useState<boolean>(false);

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 16 }}>
      <h1>Входящие</h1>
      <TaskList />
      {openForm ? (
        <AddTaskForm onClose={() => setOpenForm(false)}/>
      ) : (
        <AddButton onClick={() => setOpenForm(true)} />
      )}
    </div>
  );
};
