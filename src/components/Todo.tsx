import { FC } from "react";
import Status from "../domain/Status";
import StartButton from "./StartButton";
import PauseButton from "./PauseButton";
import CompleteButton from "./CompleteButton";
import ReopenButton from "./ReopenButton";
import RemoveButton from "./RemoveButton";

const Todo: FC<{ todo: any }> = ({ todo }) => (
    <div className="flex gap-2 mb-2">
        <span className="flex-grow p-2 bg-white rounded-md">{todo.name}</span>
        {todo.status === Status.TODO && <StartButton todo={todo} />}
        {todo.status === Status.IN_PROGRESS && <CompleteButton todo={todo} />}
        {todo.status === Status.IN_PROGRESS && <PauseButton todo={todo} />}
        {(todo.status === Status.DONE || todo.status === Status.TODO) && <RemoveButton todo={todo} />}
        {todo.status === Status.DONE && <ReopenButton todo={todo} />}
    </div>
);

export default Todo;
