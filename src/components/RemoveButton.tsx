import { FC } from "react";
import { MdClear, MdOutlineDonutLarge } from "react-icons/md";
import TodoData from "../domain/Todo";
import useRemoveTodo from "../hooks/useRemoveTodo";

const RemoveButton: FC<{ todo: TodoData }> = ({ todo }) => {
    const mutation = useRemoveTodo(todo);

    return (
        <button aria-label="remove" className="todo-button" onClick={() => mutation.mutate()}>
            {mutation.isLoading && <MdOutlineDonutLarge className="animate-spin" />}
            {!mutation.isLoading && <MdClear />}
        </button>
    );
};

export default RemoveButton;
