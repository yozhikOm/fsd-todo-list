import { useState } from "react";
import { useTaskStore } from "@/entities/task/model/store";

export const AddTaskForm = () => {
    const [value, setValue] = useState("");
    const addTask = useTaskStore((s) => s.addTask);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!value.trim()) return;

        addTask(value);
        setValue("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Новая задача..."
            />
            <button type="submit">Добавить</button>
        </form>
    )
};