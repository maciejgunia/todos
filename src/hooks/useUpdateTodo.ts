import { useMutation, useQueryClient } from "react-query";
import { updateTodo } from "../api";
import Status from "../domain/Status";
import TodoData from "../domain/Todo";

const useUpdateTodo = (todo: TodoData, status: Status) => {
    const queryClient = useQueryClient();

    return useMutation(() => updateTodo({ ...todo, status }), {
        onSuccess: async () => {
            queryClient.setQueryData("todos", (old: TodoData[] | undefined) =>
                typeof old !== "undefined" ? old.map((t) => (t._id === todo._id ? { ...t, status } : t)) : []
            );
        }
    });
};

export default useUpdateTodo;
