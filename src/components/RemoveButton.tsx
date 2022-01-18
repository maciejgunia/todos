import { FC } from "react";
import { MdClear, MdOutlineDonutLarge } from "react-icons/md";
import { useMutation, useQueryClient } from "react-query";
import { removeTodo } from "../api";
import TodoData from "../domain/Todo";

const RemoveButton: FC<{ todo: TodoData }> = ({ todo }) => {
    const queryClient = useQueryClient();
    const mutation = useMutation(removeTodo, { onSuccess: async () => queryClient.invalidateQueries("todos") });

    return (
        <button aria-label="remove" className="todo-button" onClick={() => mutation.mutate(todo)}>
            {mutation.isLoading && <MdOutlineDonutLarge className="animate-spin" />}
            {!mutation.isLoading && <MdClear />}
        </button>
    );
};

export default RemoveButton;
