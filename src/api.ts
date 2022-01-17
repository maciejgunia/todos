import { instance } from "./App";

export const fetchTodos = async () => (await instance.get("/.netlify/functions/todos")).data;
export const removeTodo = async (id: any) => instance.delete(`/.netlify/functions/todos/${id}`);
export const createTodo = async (name: string) => instance.post("/.netlify/functions/todos", { name });
