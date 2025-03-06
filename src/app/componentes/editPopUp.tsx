import React, { useState } from "react";
import { TaskProps } from "./task";

interface EditPopUpProps {
    isVisible: boolean;
    task: TaskProps | null;
    updateTask: (id: number, updatedTask: TaskProps) => void;
    setIsVisible: (visible: boolean) => void;
}

export default function EditPopUp({ isVisible, task, updateTask, setIsVisible }: EditPopUpProps) {
    const [taskName, setTaskName] = useState(task ? task.todo : "");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Evitar el envío del formulario

        if (task) {
            try {
                const response = await fetch(`/api/todos/${task.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id: task.id,
                        todo: taskName,
                        completed: task.completed,
                        userId: task.userId,
                    }),
                });

                console.log('Respuesta del servidor:', response);

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error('Error en la respuesta del servidor:', errorText);
                    throw new Error(`Error al editar la tarea: ${errorText}`);
                }

                const updatedTask = await response.json();
                console.log('Tarea editada:', updatedTask);

                // Actualizar la tarea en el estado
                updateTask(task.id, updatedTask);

                // Ocultar el PopUp
                setIsVisible(false);
            } catch (error) {
                console.error('Error:', error);
            }
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