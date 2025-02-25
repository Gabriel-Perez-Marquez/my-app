
export interface TaskProps {
    id: number;
    todo: string;
    completed: boolean;
    userId: number;
}

export default function Task(props: TaskProps) {
    return (
        <div className="task">
            <div className="task-title">
                <h2>{props.todo}</h2>
                <button></button>
            </div>
        </div>
    );
}

