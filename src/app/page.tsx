'use client';
import React from "react";
import PrimaryButton from "./componentes/primary-button";
import Task from "./componentes/task";
import ListItem from "./componentes/listItem";
import Form from "./componentes/form";


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
        <ListItem /> {/* Añade el componente List */}
      </div>

      <div className="form">
        <Form /> {/* Añade el componente Form */}
      </div>

    </div>

  </>

}
