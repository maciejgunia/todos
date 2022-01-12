import { FC, useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { TokenContext } from "../App";

const Todos: FC = () => {
    const queryClient = useQueryClient();
    const token = useContext(TokenContext);
    const fetchHello = async () => {
        const response = await fetch("/.netlify/functions/todos", { headers: [["Authorization", `Bearer ${token}`]] });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    };

    const removeTodo = async (id: any) => {
        const response = await fetch(`/.netlify/functions/todos/${id}`, {
            headers: [["Authorization", `Bearer ${token}`]],
            method: "DELETE"
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return Promise.resolve();
    };

    const mutation = useMutation(removeTodo, {
        onSuccess: () => {
            queryClient.invalidateQueries("todos");
        }
    });

    const createTodo = async (name: string) => {
        const response = await fetch(`/.netlify/functions/todos`, {
            headers: [["Authorization", `Bearer ${token}`]],
            method: "POST",
            body: JSON.stringify({ name })
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return Promise.resolve();
    };

    const createMutation = useMutation(createTodo, {
        onSuccess: () => {
            queryClient.invalidateQueries("todos");
        }
    });

    const { data, isSuccess, isLoading } = useQuery<any[]>("todos", fetchHello);

    return (
        <>
            <form
                action=""
                onSubmit={(event) => {
                    event.preventDefault();
                    createMutation.mutate(new FormData(event.target as HTMLFormElement).get("todo") as string);
                    (event.target as HTMLFormElement).reset();
                }}
            >
                <input name="todo" type="text" />
                <button type="submit">Add new</button>
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
