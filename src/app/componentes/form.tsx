'use client';
import React, { useState } from 'react';
import { TaskProps } from './task';

interface FormProps {
    save: (task: TaskProps) => void;
    setIsVisible: (visible: boolean) => void;
}

export default function Form(props: FormProps) {
    const [task, setTask] = useState('');
    const [description, setDescription] = useState('');
    const [completed, setCompleted] = useState(false);
    const [userId, setUserId] = useState(1); 

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Evitar el envío del formulario

        // Guardar la tarea
        props.save({
            id: Math.random(),
            children: task,
            completed: completed,
            userId: userId
        });

        // Limpiar el formulario
        setTask('');
        setDescription('');
        setCompleted(false);

        // Ocultar el PopUp
        props.setIsVisible(false);
    };

    return (
        <div className='form'>
            <form onSubmit={handleSubmit}>
                <label htmlFor="task">Task</label>
                <input
                    type="text"
                    id="task"
                    name="task"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    required
                />
                <label htmlFor="completed">Completed</label>
                <input
                    type="checkbox"
                    id="completed"
                    name="completed"
                    checked={completed}
                    onChange={(e) => setCompleted(e.target.checked)}
                />
                <label htmlFor="userId">User ID</label>
                <input
                    type="number"
                    id="userId"
                    name="userId"
                    value={userId}
                    onChange={(e) => setUserId(Number(e.target.value))}
                    required
                />
                <button type="submit">Add Task</button>
            </form>
        </div>
    );
}