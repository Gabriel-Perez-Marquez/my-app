'use client';
import React from "react";
import PrimaryButton from "./componentes/primary-button";
import Task from "./componentes/task";


export default function Home() {
  return <>
  
  <div className="container">
    <div className="title">
      <h1>TODO LIST</h1>
    </div>

    <div className="buttons">
      <PrimaryButton handleClick={() => alert("Create")} >Add Task</PrimaryButton>
      
      
      
    </div>

    <div className="tasks">
      <Task id={1} userId={1} completed={false}>Task 1</Task>
      <Task id={2} userId={1} completed={false}>Task 2</Task>
      <Task id={3} userId={1} completed={false}>Task 3</Task>
    </div>
  </div>
  
  </>
  
}
