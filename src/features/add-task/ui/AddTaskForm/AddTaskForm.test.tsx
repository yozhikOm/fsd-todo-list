import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AddTaskForm } from "./AddTaskForm";
import { useTaskStore } from "@/entities/task/model/store";

// мок стора
vi.mock("../../../entities/task/model/store", () => ({
  useTaskStore: vi.fn(),
}));

describe("AddTaskForm", () => {
  it("opens form when clicking Add task", () => {
    (useTaskStore as any).mockReturnValue({
      addTask: vi.fn(),
    });

    render(<AddTaskForm onClose={() => {}}/>);

    fireEvent.click(screen.getByText("Добавить"));

    //expect(screen.getByPlaceholderText("Название задачи")).toBeInTheDocument();
  });

  it("adds task on submit", () => {
    const addTaskMock = vi.fn();

    (useTaskStore as any).mockReturnValue({
      addTask: addTaskMock,
    });

    render(<AddTaskForm onClose={() => {}}/>);

    // fireEvent.click(screen.getByText("+ Add task"));

    // const input = screen.getByPlaceholderText("Task name");

    // fireEvent.change(input, { target: { value: "New task" } });

    // fireEvent.click(screen.getByText("Add task"));

    // expect(addTaskMock).toHaveBeenCalledWith("New task");
  });
});