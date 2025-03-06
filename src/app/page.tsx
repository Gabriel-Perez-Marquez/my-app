'use client';
import React, { useState, useEffect } from "react";
import PrimaryButton from "./componentes/primary-button";
import { TaskProps } from "./componentes/task";
import ListItem from "./componentes/listItem";
import Form from "./componentes/form";
import PopUp from "./componentes/popUp";

export default function Home() {
  const [list, setList] = useState<TaskProps[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  const getTasks = async () => {
  try {
    const res = await fetch('/api/todos', {
      method: 'GET',
    });
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await res.json();
    setList(data);
    console.log('Data:', data);
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}

  useEffect(() => {
    getTasks();
  }, []); // array de dependencias está vacío para que se ejecute solo una vez

  const addTask = (task: TaskProps) => {
    setList([...list, task]);
  };

  const deleteTask = (id: number) => {
    setList(list.filter(task => task.id !== id));
    fetch(`/api/todos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
  };

  const editTask = (id: number, updatedTask: TaskProps) => {
    setList(list.map(task => (task.id === id ? updatedTask : task)));
  };

  return (
    <div className="container">
      <div className="title">
        <h1>TODO LIST</h1>
      </div>

      <div className="buttons">
        <PrimaryButton handleClick={() => setIsVisible(true)}>
          Add Task 
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle" id="add-button" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
            </svg>
          </span>
        </PrimaryButton>
      </div>

      <div className="tasks">
        <ListItem list={list} deleteTask={deleteTask} editTask={editTask} /> {/* Añade el componente List */}
      </div>

      <div className="popUp">
        <PopUp isVisible={isVisible} form={<Form save={addTask} setIsVisible={setIsVisible} />} />
      </div>

    </div>
  );
}