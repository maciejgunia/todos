import { FC } from "react";
import { useQuery } from "react-query";
import { fetchTodos } from "../api";
import TodoForm from "./TodoForm";
import Todo from "./Todo";

const Todos: FC = () => {
    const { data, isSuccess, isLoading } = useQuery<any>("todos", fetchTodos);

    return (
        <div className="max-w-lg m-auto p-4">
            <TodoForm />
            {isLoading && <div>Loading todos...</div>}
            {isSuccess && (
                <div className="mt-4">
                    {data?.map((todo: any) => (
                        <Todo key={todo._id} todo={todo}></Todo>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Todos;
