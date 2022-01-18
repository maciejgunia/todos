import { axios } from "./lib/axios";
import Status from "./domain/Status";
import TodoData from "./domain/Todo";

export const fetchTodos = async () => (await axios.get("/.netlify/functions/todos")).data;
export const removeTodo = async ({ _id }: { _id: string }) => axios.delete(`/.netlify/functions/todos/${_id}`);
export const createTodo = async (name: string) =>
    axios.post("/.netlify/functions/todos", { name, status: Status.TODO });
export const updateTodo = async ({ _id, name, status }: TodoData) =>
    axios.put(`/.netlify/functions/todos/${_id}`, { name, status });
