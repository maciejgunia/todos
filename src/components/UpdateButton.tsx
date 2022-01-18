import { FC } from "react";
import { MdOutlineDonutLarge } from "react-icons/md";
import { useMutation, useQueryClient } from "react-query";
import { updateTodo } from "../api";
import Status from "../domain/Status";
import TodoData from "../domain/Todo";

const UpdateButton: FC<{ todo: TodoData; label: string; status: Status }> = ({ children, todo, label, status }) => {
    const queryClient = useQueryClient();
    const mutation = useMutation(updateTodo, { onSuccess: async () => queryClient.invalidateQueries("todos") });

    return (
        <button aria-label={label} className="todo-button" onClick={() => mutation.mutate({ ...todo, status })}>
            {mutation.isLoading && <MdOutlineDonutLarge className="animate-spin" />}
            {!mutation.isLoading && children}
        </button>
    );
};

export default UpdateButton;
