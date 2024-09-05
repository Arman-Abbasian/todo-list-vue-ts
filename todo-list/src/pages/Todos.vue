<script setup lang="ts">
import { computed, ref } from "vue";
import { useTodoStore } from "../store/todo";
import { useRouter } from "vue-router";

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
          <v-list-item-action start>
            <v-checkbox v-model="todo.completed"></v-checkbox>
          </v-list-item-action>
        </template>

        <v-list-item-title>{{ todo.title }}</v-list-item-title>

        <v-list-item-subtitle>
          Notify me about {{ todo.title }}
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>
  </div>
</template>

<style scoped></style>
