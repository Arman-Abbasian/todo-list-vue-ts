<script setup lang="ts">
import { computed, ref } from "vue";
import { useTodoStore } from "../store/todo";
import { useRouter } from "vue-router";
import { Todo } from "../types/todo";

const router = useRouter();
const loading = ref(false);

const todoStore = useTodoStore();
const todos = computed(() => todoStore.todos);

async function fetchTodos() {
  loading.value = true;
  await todoStore.getTodos();
  loading.value = false;
}
fetchTodos();

async function deleteTodo(id: string) {
  loading.value = true;
  await todoStore.removeTodo(id);
  await todoStore.getTodos();
  loading.value = false;
}

const changeCompleted = async (todo: Todo) => {
  loading.value = true;
  await todoStore.putTodo({
    id: todo.id as string,
    body: {
      title: todo.title,
      completed: !todo.completed as boolean,
    },
  });
  loading.value = false;
};

function editPage(id: string) {
  router.push({ name: `editTodo`, params: { id } });
}
</script>

<template>
  <div>
    <h1>Todos</h1>
    <span v-if="loading">loading....</span>
    <v-list theme="dark">
      <v-list-item
        v-for="todo in todos"
        :key="todo.id"
        @click="editPage(todo.id)"
      >
        <template v-slot:prepend>
          <button v-if="todo.completed" @click.stop="changeCompleted(todo)">
            done
          </button>
          <button v-else @click="changeCompleted(todo)">not done</button>
        </template>

        <v-list-item-title>{{ todo.title }}</v-list-item-title>

        <v-list-item-subtitle>
          Notify me about {{ todo.title }}
        </v-list-item-subtitle>
        <button @click.stop="deleteTodo(todo.id)">delete</button>
      </v-list-item>
    </v-list>
  </div>
</template>

<style scoped></style>
