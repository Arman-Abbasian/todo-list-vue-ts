import { createRouter, createWebHistory } from "vue-router";
import Todos from "./pages/Todos.vue";
import Todo from "./pages/Todo.vue";
import AddTodo from "./pages/AddTodo.vue";
import EditTodo from "./pages/EditTodo.vue";
import Home from "./pages/Home.vue";

const routes = [
  { name: "home", path: "/", component: Home },
  { name: "todos", path: "/todos", component: Todos },
  { name: "todo", path: "/todo/:id", component: Todo },
  { name: "addTodo", path: "/addTodo", component: AddTodo },
  { name: "editTodo", path: "/editTodo/:id", component: EditTodo },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
