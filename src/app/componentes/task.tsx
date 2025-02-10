import React, { useState } from "react";

export interface TaskProps {
    id: number;
    children: string;
    completed: boolean;
    userId: number;


}

export default function Task(props: TaskProps) {
    const[done, setDone] = useState(true);
    const changeDone = () => setDone(!done);
    return (
        <div className="task">
            <div className="task-title">
                <h2>{props.children}</h2>
                <button></button>
            </div>
        </div>
    );
}

