'use client';
import React, { useState } from 'react';
import { addTask } from "./listItem";
import Task from './task';


export default function Form() {
    return (
        <div className='form'>
            <form>
                <label htmlFor="task">Task</label>
                <input type="text" id="task" name="task" />
                <label htmlFor="description">Description</label>
                <input type="text" id="description" name="description" />
                <label htmlFor="completed">Completed</label>
                <input type="checkbox" id="completed" name="completed" />
                <button type="submit">Add Task</button>
            </form>
        </div>
    )
}



