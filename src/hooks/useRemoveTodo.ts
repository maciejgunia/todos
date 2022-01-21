import { useMutation, useQueryClient } from "react-query";
import { removeTodo } from "../api";
import TodoData from "../domain/Todo";

const useRemoveTodo = (todo: TodoData) => {
    const queryClient = useQueryClient();

    return useMutation(() => removeTodo(todo), {
        onSuccess: async () => {
            queryClient.setQueryData("todos", (old: TodoData[] | undefined) =>
                typeof old !== "undefined" ? old.filter((t) => t._id !== todo._id) : []
            );
        }
    });
};

export default useRemoveTodo;
