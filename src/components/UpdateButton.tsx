import { FC } from "react";
import { MdOutlineDonutLarge } from "react-icons/md";
import Status from "../domain/Status";
import TodoData from "../domain/Todo";
import useUpdateTodo from "../hooks/useUpdateTodo";

const UpdateButton: FC<{ todo: TodoData; label: string; status: Status }> = ({ children, todo, label, status }) => {
    const mutation = useUpdateTodo(todo, status);

    return (
        <button aria-label={label} className="todo-button" onClick={() => mutation.mutate()}>
            {mutation.isLoading && <MdOutlineDonutLarge className="animate-spin" />}
            {!mutation.isLoading && children}
        </button>
    );
};

export default UpdateButton;
