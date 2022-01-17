import { FC, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { createTodo } from "../api";
import { MdOutlineDonutLarge, MdPlaylistAdd } from "react-icons/md";

const TodoForm: FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const queryClient = useQueryClient();
    const [todo, setTodo] = useState<string>("");
    const create = useMutation(createTodo, {
        onMutate: () => {
            setIsLoading(true);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries("todos");
            setTodo("");
        },
        onSettled: () => {
            setIsLoading(false);
        }
    });

    return (
        <form
            className="flex"
            onSubmit={(event) => {
                event.preventDefault();
                create.mutate(todo);
            }}
        >
            <input
                className="rounded-md border focus:border-gray-800 py-1 px-2 mr-2 flex-grow outline-none"
                name="todo"
                type="text"
                value={todo}
                onChange={(event) => setTodo(`${event.target.value}`)}
            />
            <button className="todo-button" disabled={todo.length === 0} type="submit">
                {!isLoading && <MdPlaylistAdd />}
                {isLoading && <MdOutlineDonutLarge className="animate-spin" />}
            </button>
        </form>
    );
};

export default TodoForm;