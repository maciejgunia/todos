import { FC } from "react";
import Status from "../domain/Status";
import TodoData from "../domain/Todo";
import Todo from "./Todo";

const TITLE_MAP = {
    [Status.TODO]: "Not started",
    [Status.IN_PROGRESS]: "In progress",
    [Status.DONE]: "Done"
};

const TodoList: FC<{ data: TodoData[]; status: Status }> = ({ data, status }) => {
    const todos = data?.filter((t: TodoData) => t.status === status);

    return (
        <>
            {todos.length > 0 && (
                <div className="mb-4">
                    <h3 className="text-xl mb-2">{TITLE_MAP[status]}</h3>
                    {todos.map((todo: any) => (
                        <Todo key={todo._id} todo={todo}></Todo>
                    ))}
                </div>
            )}
        </>
    );
};

export default TodoList;
