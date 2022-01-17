import { FC, useState } from "react";
import { MdClear, MdOutlineDonutLarge } from "react-icons/md";
import { useMutation, useQueryClient } from "react-query";
import { removeTodo } from "../api";

const Todo: FC<{ todo: any }> = ({ todo }) => {
    const [isLoading, setIsLoading] = useState(false);
    const queryClient = useQueryClient();
    const remove = useMutation(removeTodo, {
        onMutate: () => {
            setIsLoading(true);
        },
        onSuccess: async () => queryClient.invalidateQueries("todos"),
        onSettled: () => {
            setIsLoading(false);
        }
    });

    return (
        <div className="flex my-2">
            <span className="flex-grow p-2 bg-white mr-2 rounded-md">{todo.name} </span>
            <button className="todo-button" onClick={() => remove.mutate(todo._id)}>
                {isLoading && <MdOutlineDonutLarge className="animate-spin" />}
                {!isLoading && <MdClear />}
            </button>
        </div>
    );
};

export default Todo;
