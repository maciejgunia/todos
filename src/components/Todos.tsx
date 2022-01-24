import { FC, useContext } from "react";
import { useQuery } from "react-query";
import { fetchTodos } from "../api";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import Status from "../domain/Status";
import Message from "./Message";
import { AuthContext } from "../providers/AppProvider";

const Todos: FC = () => {
    const { data, isSuccess, isLoading } = useQuery<any>("todos", fetchTodos);
    const { isLoggedIn, isAuthLoading } = useContext(AuthContext);

    return (
        <>
            {isAuthLoading && <Message text="Checking authentication status..." />}
            {!isAuthLoading && !isLoggedIn && <Message text="You have to be logged in to use the app!" />}
            {isLoggedIn && (
                <div className="max-w-lg m-auto p-4">
                    <TodoForm />
                    <div className="mt-4">
                        {isLoading && <div>Loading todos...</div>}
                        {isSuccess && (
                            <>
                                <TodoList data={data} status={Status.TODO} />
                                <TodoList data={data} status={Status.IN_PROGRESS} />
                                <TodoList data={data} status={Status.DONE} />
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Todos;
