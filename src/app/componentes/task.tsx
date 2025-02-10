import React from "react";

interface TaskProps {
    id: number;
    children: string;
    completed: boolean;
    userId: number;


}

export default function Task(props: TaskProps) {
    return (
        <div className="task">
            <div className="task-title">
                <h2>{props.children}</h2>
            </div>
        </div>
    );
}