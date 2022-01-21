import { FC } from "react";
import { MdOutlineDonutLarge, MdPlaylistAdd } from "react-icons/md";
import useCreateTodo from "../hooks/useCreateTodo";

const TodoForm: FC = () => {
    const { todo, setTodo, mutation } = useCreateTodo();

    return (
        <form
            className="flex"
            onSubmit={(event) => {
                event.preventDefault();
                mutation.mutate(todo);
            }}
        >
            <input
                className="rounded-md border focus:border-gray-800 py-1 px-2 mr-2 flex-grow outline-none"
                type="text"
                aria-label="name"
                value={todo}
                onChange={(event) => setTodo(`${event.target.value}`)}
            />
            <button aria-label="create" className="todo-button" disabled={todo.length === 0} type="submit">
                {!mutation.isLoading && <MdPlaylistAdd />}
                {mutation.isLoading && <MdOutlineDonutLarge className="animate-spin" />}
            </button>
        </form>
    );
};

export default TodoForm;
