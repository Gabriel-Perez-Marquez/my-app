'use client';
import React, { useState } from "react";
import PrimaryButton from "./componentes/primary-button";
import { TaskProps } from "./componentes/task";
import ListItem from "./componentes/listItem";
import Form from "./componentes/form";
import PopUp from "./componentes/popUp";

export default function Home() {
  const [list, setList] = useState<TaskProps[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  const addTask = (task: TaskProps) => {
    setList([...list, task]);
  };

  const deleteTask = (id: number) => {
    setList(list.filter(task => task.id !== id));
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
        <PrimaryButton handleClick={() => setIsVisible(true)}>Add Task</PrimaryButton>
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