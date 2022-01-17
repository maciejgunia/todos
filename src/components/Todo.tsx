import { FC, useState } from "react";
import { MdClear, MdOutlineDonutLarge, MdOutlinePlayArrow } from "react-icons/md";
import { useMutation, useQueryClient } from "react-query";
import { removeTodo, updateTodo } from "../api";
import Status from "../domain/Status";

const Todo: FC<{ todo: any }> = ({ todo }) => {
    const [isLoading, setIsLoading] = useState(false);
    const queryClient = useQueryClient();
    const updateCallbacks = {
        onMutate: () => {
            setIsLoading(true);
        },
        onSuccess: async () => queryClient.invalidateQueries("todos"),
        onSettled: () => {
            setIsLoading(false);
        }
    };
    const remove = useMutation(removeTodo, updateCallbacks);
    const update = useMutation(updateTodo, updateCallbacks);

    return (
        <div className="flex my-2">
            <span className="flex-grow p-2 bg-white mr-2 rounded-md">
                {todo.name} / {todo.status}
            </span>
            <button className="todo-button mr-2" onClick={() => update.mutate({ ...todo, status: Status.IN_PROGRESS })}>
                {isLoading && <MdOutlineDonutLarge className="animate-spin" />}
                {!isLoading && <MdOutlinePlayArrow />}
            </button>
            <button className="todo-button" onClick={() => remove.mutate(todo)}>
                {isLoading && <MdOutlineDonutLarge className="animate-spin" />}
                {!isLoading && <MdClear />}
            </button>
        </div>
    );
};

export default Todo;
