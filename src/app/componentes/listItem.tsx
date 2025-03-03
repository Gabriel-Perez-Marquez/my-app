'use client';
import React, { useState } from 'react';
import Task, { TaskProps } from './task';
import SecondaryButton from './Secondary-button';
import EditPopUp from './editPopUp';

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
                id: id,
                todo: task?.todo,
                completed: task?.completed,
                userId: task?.userId,
            }),
        });



        if (!response.ok) {
            const errorText = await response.text();
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
                <Task
                    key={listItem.id}
                    todo={listItem.todo}
                    completed={listItem.completed}
                    onDelete={() => props.deleteTask(listItem.id)}
                    onEdit={() => handleEdit(listItem.id)}
                    toggleComplete={() => toggleComplete(listItem.id)} 
                    id={listItem.id} 
                    userId={listItem.userId}/>
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


interface FilterSelectProps {
    setFilter: (filter: Filter) => void;
}

function FilterSelect(props: FilterSelectProps) {
    return (
        <div className='filterButtons'>
            <SecondaryButton handleClick={() => props.setFilter(Filter.All)}>All</SecondaryButton>
            <SecondaryButton handleClick={() => props.setFilter(Filter.Done)}>Done</SecondaryButton>
            <SecondaryButton handleClick={() => props.setFilter(Filter.NotDone)}>Not Done</SecondaryButton>
        </div>
    );
}