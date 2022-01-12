import { FC, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { removeTodo, createTodo, fetchHello } from "../api";

const Todos: FC = () => {
    const [todo, setTodo] = useState<string>("");
    const queryClient = useQueryClient();
    const mutation = useMutation(removeTodo, {
        onSuccess: () => {
            queryClient.invalidateQueries("todos");
        }
    });
    const createMutation = useMutation(createTodo, {
        onSuccess: () => {
            setTodo("");
            queryClient.invalidateQueries("todos");
        }
    });
    const { data, isSuccess, isLoading } = useQuery<any>("todos", fetchHello);

    return (
        <>
            <form
                action=""
                onSubmit={(event) => {
                    event.preventDefault();
                    createMutation.mutate(todo);
                }}
            >
                <input name="todo" type="text" value={todo} onChange={(event) => setTodo(`${event.target.value}`)} />
                <button disabled={todo.length === 0} type="submit">
                    Add new
                </button>
            </form>
            {isLoading && <div>Loading</div>}
            {isSuccess &&
                data?.map((todo: any) => (
                    <div key={todo._id}>
                        {todo.name} <button onClick={() => mutation.mutate(todo._id)}>Remove</button>
                    </div>
                ))}
        </>
    );
};

export default Todos;
