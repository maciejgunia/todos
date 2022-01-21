import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { createTodo } from "../api";
import TodoData from "../domain/Todo";

const useCreateTodo = () => {
    const [todo, setTodo] = useState<string>("");
    const queryClient = useQueryClient();

    return {
        todo,
        setTodo,
        mutation: useMutation(createTodo, {
            onSuccess: async ({ data }) => {
                queryClient.setQueryData("todos", (old: TodoData[] | undefined) =>
                    typeof old === "undefined" ? [data] : [...old, data]
                );
                setTodo("");
            }
        })
    };
};

export default useCreateTodo;
