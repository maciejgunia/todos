import { instance } from "./App";
import Status from "./domain/Status";
import TodoData from "./domain/Todo";

export const fetchTodos = async () => (await instance.get("/.netlify/functions/todos")).data;
export const removeTodo = async ({ _id }: { _id: string }) => instance.delete(`/.netlify/functions/todos/${_id}`);
export const createTodo = async (name: string) =>
    instance.post("/.netlify/functions/todos", { name, status: Status.TODO });
export const updateTodo = async ({ _id, name, status }: TodoData) =>
    instance.put(`/.netlify/functions/todos/${_id}`, { name, status });
