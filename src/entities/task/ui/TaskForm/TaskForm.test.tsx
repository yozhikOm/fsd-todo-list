import { render, screen, fireEvent } from '@testing-library/react';
import { TaskForm } from './TaskForm';
import type { Task } from '@/entities/task';

// 🔧 мок PrioritySelect (чтобы не тащить его логику)
vi.mock('../PrioritySelect/PrioritySelect', () => ({
  PrioritySelect: ({ onChange }: any) => (
    <div data-testid='priority-select'>
      <button onClick={() => onChange(1)}>set-priority-1</button>
    </div>
  ),
}));

describe('TaskForm', () => {
  const setup = (props = {}) => {
    const onSubmit = vi.fn();
    const onClose = vi.fn();

    render(
      <TaskForm
        onSubmit={onSubmit}
        onClose={onClose}
        {...props}
      />
    );

    return { onSubmit, onClose };
  };

  test('рендерит форму', () => {
    setup();

    expect(screen.getByPlaceholderText('Название задачи')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Описание')).toBeInTheDocument();
  });

  test('изменяет значения инпутов', () => {
    setup();

    const titleInput = screen.getByPlaceholderText('Название задачи');

    fireEvent.change(titleInput, {
      target: { value: 'Новая задача' },
    });

    expect(titleInput).toHaveValue('Новая задача');
  });

  test('вызывает onSubmit при сабмите', () => {
    const { onSubmit, onClose } = setup();

    fireEvent.change(screen.getByPlaceholderText('Название задачи'), {
      target: { value: 'Task 1' },
    });

    fireEvent.submit(screen.getByRole('form'));

    expect(onSubmit).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });

  test('не сабмитит если title пустой', () => {
    const { onSubmit } = setup();

    fireEvent.submit(screen.getByRole('form'));

    expect(onSubmit).not.toHaveBeenCalled();
  });

  test('кнопка отмены вызывает onClose', () => {
    const { onClose } = setup();

    fireEvent.click(screen.getByText('Отмена'));

    expect(onClose).toHaveBeenCalled();
  });

  test('заполняет форму при переданном task (edit mode)', () => {
    const task: Task = {
      id: '1',
      title: 'Edit me',
      description: 'desc',
      completed: false,
      priority: 2,
      date: '2024-01-01',
    };

    setup({ task });

    expect(screen.getByDisplayValue('Edit me')).toBeInTheDocument();
    expect(screen.getByDisplayValue('desc')).toBeInTheDocument();
  });

  test('открывает PrioritySelect', () => {
    setup();

    fireEvent.click(screen.getByText('Приоритет'));

    expect(screen.getByTestId('priority-select')).toBeInTheDocument();
  });

  test('меняет приоритет через PrioritySelect', () => {
    setup();

    fireEvent.click(screen.getByText('Приоритет'));

    fireEvent.click(screen.getByText('set-priority-1'));

    // Проверяем косвенно — по классу флага
    const flag = screen.getByTestId('priority-flag');
    expect(flag.className).toContain('flag1');
  });
});
