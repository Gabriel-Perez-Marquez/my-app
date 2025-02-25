'use client';
import React, { useState } from 'react';
import PrimaryButton from "./primary-button";
import { TaskProps } from './task';
import SecondaryButton from './Secondary-button';
import EditPopUp from './editPopUp';
import { pool } from '../db/pool';

enum Filter {
    All,
    Done,
    NotDone
}

interface ListProps {
    list: TaskProps[];
    deleteTask: (id: number) => void;
    editTask: (id: number, updatedTask: TaskProps) => void;
}

export default function List(props: ListProps) {
    const [filter, setFilter] = useState<Filter>(Filter.All);
    const [isEditVisible, setIsEditVisible] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState<TaskProps | null>(null);

    const handleEdit = (id: number) => {
        const task = props.list.find(task => task.id === id);
        if (task) {
            setTaskToEdit(task);
            setIsEditVisible(true);
        }
    };

    const toggleComplete = async (id: number) => {
        const task = props.list.find(task => task.id === id);
        if (task) {
            props.editTask(id, { ...task, completed: !task.completed });
        }
        const response = await fetch(`/api/todos/completeTodo`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                todo: task?.todo,
                completed: task?.completed,
                userId: task?.userId,
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error en la respuesta del servidor:', errorText);
            throw new Error(`Error al editar la tarea: ${errorText}`);
        }

    };

    return (
        <>
            <FilterSelect setFilter={setFilter} />
            {props.list.filter(listItem => {
                if (filter === Filter.All) return true;
                if (filter === Filter.Done) return listItem.completed;
                if (filter === Filter.NotDone) return !listItem.completed;
            }).map(listItem => (
                <ListItemComp
                    key={listItem.id}
                    name={listItem.todo}
                    completed={listItem.completed}
                    onDelete={() => props.deleteTask(listItem.id)}
                    onEdit={() => handleEdit(listItem.id)}
                    toggleComplete={() => toggleComplete(listItem.id)}
                />
            ))}
            <EditPopUp
                isVisible={isEditVisible}
                task={taskToEdit}
                updateTask={props.editTask}
                setIsVisible={setIsEditVisible}
            />
        </>
    );
}

interface ListItemCompProps {
    name: string;
    completed: boolean;
    onDelete: () => void;
    onEdit: () => void;
    toggleComplete: () => void;
}

function ListItemComp(props: ListItemCompProps) {
    return (
        <div className={`task ${props.completed ? 'completed' : ''}`}>
            <span>TAREA {props.name}</span>
            <span>
                <SecondaryButton handleClick={props.onEdit}>
                    <svg id='edit' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                    </svg>
                </SecondaryButton>
                <SecondaryButton handleClick={props.onDelete}>
                    <svg id='delete' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                    </svg>
                </SecondaryButton>
                <SecondaryButton handleClick={props.toggleComplete}>
                    {props.completed ? 'Incomplete' : 'Complete'}
                </SecondaryButton>
            </span>
        </div>
    );
}

interface FilterSelectProps {
    setFilter: (filter: Filter) => void;
}

function FilterSelect(props: FilterSelectProps) {
    return (
        <div className='filterButtons'>
            <PrimaryButton handleClick={() => props.setFilter(Filter.All)}>All</PrimaryButton>
            <PrimaryButton handleClick={() => props.setFilter(Filter.Done)}>Done</PrimaryButton>
            <PrimaryButton handleClick={() => props.setFilter(Filter.NotDone)}>Not Done</PrimaryButton>
        </div>
    );
}