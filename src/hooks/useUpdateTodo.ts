import { useMutation, useQueryClient } from "react-query";
import { updateTodo } from "../api";
import Status from "../domain/Status";
import TodoData from "../domain/Todo";

const useUpdateTodo = (todo: TodoData, status: Status) => {
    const queryClient = useQueryClient();

    return useMutation(() => updateTodo({ ...todo, status }), {
        onMutate: () => {
            const prevTodos = queryClient.getQueryData("todos");

            queryClient.setQueryData("todos", (old: TodoData[] | undefined) =>
                typeof old !== "undefined" ? old.map((t) => (t._id === todo._id ? { ...t, status } : t)) : []
            );

            return () => queryClient.setQueryData("todos", prevTodos);
        },
        onError: async (error, _, rollback) => {
            if (rollback) rollback();
            console.error(error);
        }
    });
};

export default useUpdateTodo;
