import axios from "axios";
import { defineStore } from "pinia";
import Swal from "sweetalert2";
import { Todo } from "../types/todo";

interface TodoState {
  todos: Todo[] | null;
  todo: Todo | null;
}

export const useTodoStore = defineStore("todo", {
  state: (): TodoState => {
    return {
      todos: null,
      todo: null,
    };
  },
  actions: {
    async getTodos() {
      try {
        const response = await axios.get("http://localhost:4000/todos");
        this.todos = response.data;
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "There is a problem, please try again",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    },
    async getTodo(id: string) {
      try {
        const response = await axios.get(`http://localhost:4000/todos/${id}`);
        this.todo = response.data;
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "There is a problem, please try again",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    },
    async postTodo(body: Omit<Todo, "id">) {
      try {
        await axios.post("http://localhost:4000/todos", body);
        Swal.fire({
          title: "Success",
          text: "todo added successfully",
          icon: "success",
          confirmButtonText: "Ok",
        });
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "some error in adding the todo",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    },
    async putTodo({ id, body }: { id: string; body: Omit<Todo, "id"> }) {
      try {
        await axios.put(`http://localhost:4000/todos/${id}`, body);
        Swal.fire({
          title: "Success",
          text: "todo edited successfully",
          icon: "success",
          confirmButtonText: "Ok",
        });
      } catch (error: any) {
        Swal.fire({
          title: error.message,
          text: "some error in editing the todo",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    },
  },
});
