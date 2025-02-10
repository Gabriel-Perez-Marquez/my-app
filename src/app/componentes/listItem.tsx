'use client';
import React, { useState } from 'react';
import PrimaryButton from "./primary-button";
import { TaskProps } from './task';



enum Filter {
  All,
  Done,
  NotDone
}


let tasks: TaskProps[] = [
    {
        children: "Do the laundry",
        completed: true,
        id: 1,
        userId: 23
      },
      {
        id: 3,
        children: "string",
        completed: false,
        userId: 56
      }
];

export function addTask(task: TaskProps) {
    tasks.push(task);
}



export default function List() {
  const [list] = useState<TaskProps[]>(tasks);
  const [filter, setFilter] = useState<Filter>(Filter.NotDone);
  switch (filter) {
    case Filter.All:
      return <>
        <FilterSelect setFilter={setFilter} />
        {list.map(listItem => <ListItemComp key={listItem.id} name={listItem.children} />)}
      </>;
    case Filter.Done:
      return <>
        <FilterSelect setFilter={setFilter} />
        {list.filter(listItem => listItem.completed === true).map(listItem => <ListItemComp key={listItem.id} name={listItem.children} />)}
      </>;
    case Filter.NotDone:
      return <>
        <FilterSelect setFilter={setFilter} />
        {list.filter(listItem => listItem.completed === false).map(listItem => <ListItemComp key={listItem.id} name={listItem.children} />)}
      </>;
    default:
      throw new Error("Invalid filter");
  }
}

interface ListItemCompProps {
    name: string;
  }
  
  function ListItemComp(props: ListItemCompProps) {
    return <div className='task'>
      TAREA {props.name}
    </div>
  }
  
  interface FilterSelectProps {
    setFilter: (filter: Filter) => void;
  }
  
  function FilterSelect(props: FilterSelectProps) {
    return <div>
      <PrimaryButton handleClick={() => props.setFilter(Filter.All)}>All</PrimaryButton>
      <PrimaryButton handleClick={() => props.setFilter(Filter.Done)}>Done</PrimaryButton>
      <PrimaryButton handleClick={() => props.setFilter(Filter.NotDone)}>Not Done</PrimaryButton>
    </div>;
  }