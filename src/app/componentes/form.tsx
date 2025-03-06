'use client';
import React, { useState } from 'react';
import { TaskProps } from './task';
import { v4 as uuidv4 } from "uuid";

interface FormProps {
  save: (task: TaskProps) => void;
  setIsVisible: (visible: boolean) => void;
}

export default function Form(props: FormProps) {
  const [task, setTask] = useState('');
  const [completed, setCompleted] = useState(false);
  const [userId, setUserId] = useState(1);

  const handleSubmit = async () => {

    console.log('Enviando tarea:', { task, completed, userId });

    try {
      const response = await fetch('/api/todos/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
        },
        body: JSON.stringify({
          id: uuidv4(),
          todo: task,
          completed: completed,
          userId: userId,
        }),
      });

      console.log('Respuesta del servidor:', response);
      console.log('Estado de la respuesta:', response.status);
      console.log('Texto de la respuesta:', await response.text());

      if (!response.ok) {
        throw new Error('Error al crear la tarea');
      }

      const newTask = await response.json();
      console.log('Tarea creada:', newTask);

      // Guardar la tarea en el estado
      props.save(newTask);

      // Limpiar el formulario
      setTask('');
      setCompleted(false);

      // Ocultar el PopUp
      props.setIsVisible(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='form'>
      <form onSubmit={handleSubmit}>
        <label htmlFor='task'>Task</label>
        <input
          type='text'
          id='task'
          name='task'
          value={task}
          onChange={(e) => setTask(e.target.value)}
          required
        />
        <label>
          <input
            type='checkbox'
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
          Completed
        </label>
        <button type='submit'>Add Task</button>
      </form>
    </div>
  );  
}