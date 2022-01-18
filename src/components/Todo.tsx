import { FC, useState } from "react";
import { MdClear, MdDone, MdOutlineDonutLarge, MdOutlinePlayArrow, MdPause, MdRemoveDone } from "react-icons/md";
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
        <div className="flex gap-2 mb-2">
            <span className="flex-grow p-2 bg-white rounded-md">{todo.name}</span>
            {todo.status === Status.TODO && (
                <button className="todo-button" onClick={() => update.mutate({ ...todo, status: Status.IN_PROGRESS })}>
                    {isLoading && <MdOutlineDonutLarge className="animate-spin" />}
                    {!isLoading && <MdOutlinePlayArrow />}
                </button>
            )}
            {todo.status === Status.IN_PROGRESS && (
                <button className="todo-button" onClick={() => update.mutate({ ...todo, status: Status.DONE })}>
                    {isLoading && <MdOutlineDonutLarge className="animate-spin" />}
                    {!isLoading && <MdDone />}
                </button>
            )}
            {todo.status === Status.IN_PROGRESS && (
                <button className="todo-button" onClick={() => update.mutate({ ...todo, status: Status.TODO })}>
                    {isLoading && <MdOutlineDonutLarge className="animate-spin" />}
                    {!isLoading && <MdPause />}
                </button>
            )}
            {todo.status === Status.DONE && (
                <button className="todo-button" onClick={() => update.mutate({ ...todo, status: Status.IN_PROGRESS })}>
                    {isLoading && <MdOutlineDonutLarge className="animate-spin" />}
                    {!isLoading && <MdRemoveDone />}
                </button>
            )}
            {(todo.status === Status.DONE || todo.status === Status.TODO) && (
                <button className="todo-button" onClick={() => remove.mutate(todo)}>
                    {isLoading && <MdOutlineDonutLarge className="animate-spin" />}
                    {!isLoading && <MdClear />}
                </button>
            )}
        </div>
    );
};

export default Todo;
