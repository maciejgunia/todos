import { useMutation, useQueryClient } from "react-query";
import { removeTodo } from "../api";
import TodoData from "../domain/Todo";

const useRemoveTodo = (todo: TodoData) => {
    const queryClient = useQueryClient();

    return useMutation(() => removeTodo(todo), {
        onMutate: () => {
            const prevTodos = queryClient.getQueryData("todos");

            queryClient.setQueryData("todos", (old: TodoData[] | undefined) =>
                typeof old !== "undefined" ? old.filter((t) => t._id !== todo._id) : []
            );

            return () => queryClient.setQueryData("todos", prevTodos);
        },
        onError: async (error, _, rollback) => {
            if (rollback) rollback();
            console.error(error);
        }
    });
};

export default useRemoveTodo;
