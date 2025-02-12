import React, { useState } from "react";
import { TaskProps } from "./task";

interface EditPopUpProps {
    isVisible: boolean;
    task: TaskProps | null;
    updateTask: (id: number, updatedTask: TaskProps) => void;
    setIsVisible: (visible: boolean) => void;
}

export default function EditPopUp({ isVisible, task, updateTask, setIsVisible }: EditPopUpProps) {
    const [taskName, setTaskName] = useState(task ? task.children : "");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (task) {
            updateTask(task.id, { ...task, children: taskName });
            setIsVisible(false);
        }
    };

    return (
        <div className={isVisible ? "visible" : "hidden"}>
            <form onSubmit={handleSubmit}>
                <label htmlFor="task">Edit Task</label>
                <input
                    type="text"
                    id="task"
                    name="task"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    required
                />
                <button type="submit">Update Task</button>
            </form>
        </div>
    );
}