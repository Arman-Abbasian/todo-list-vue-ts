import axios from "axios";
import { defineStore } from "pinia";
import Swal from "sweetalert2";
import { Todo } from "../types/todo";

interface TodoState {
  todos: Todo[] | null;
}

export const useTodoStore = defineStore("todo", {
  state: (): TodoState => {
    return {
      todos: null,
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
    async postTodo(body: Omit<Todo, "id">) {
      try {
        const { data } = await axios.post("http://localhost:4000/todos", body);
        console.log(data.data);
        this.todos?.push(data.data);
        console.log(this.todos);
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "some error in adding the todo",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    },
  },
});
