'use client';
import "./index.css";
import React, { useState } from 'react';
import PrimaryButton from "./primary-button";

interface ListItem {
  name: string;
  done: boolean;
}

enum Filter {
  All,
  Done,
  NotDone
}

const inMemoryList = [
  {
    name: "Do the laundry",
    done: true
  },
  {
    name: "Buy groceries",
    done: false
  }
];


export function List() {
  const [list] = useState<ListItem[]>(inMemoryList);
  const [filter, setFilter] = useState<Filter>(Filter.NotDone);
  switch (filter) {
    case Filter.All:
      return <>
        <FilterSelect setFilter={setFilter} />
        {list.map(listItem => <ListItemComp key={listItem.name} name={listItem.name}/>)}
        </>;
    case Filter.Done:
      return <>
        <FilterSelect setFilter={setFilter} />
        {list.filter(listItem => listItem.done === true).map(listItem => <ListItemComp key={listItem.name} name={listItem.name}/>)}
        </>;
    case Filter.NotDone:
      return <>
        <FilterSelect setFilter={setFilter} />
        {list.filter(listItem => listItem.done === false).map(listItem => <ListItemComp key={listItem.name} name={listItem.name}/>)}
      </>;
    default:
      throw new Error("Invalid filter");
  }
}

interface ListItemCompProps {
  name: string;
}

function ListItemComp(props: ListItemCompProps) {
  return <div>
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