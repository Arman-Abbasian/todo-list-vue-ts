<script setup lang="ts">
import { useRoute } from "vue-router";
import { useTodoStore } from "../store/todo";
import { ref } from "vue";

const loading = ref(false);

const route = useRoute();
const todoStore = useTodoStore();
const fetchTodo = async () => {
  loading.value = true;
  await todoStore.getTodo(route.params.id as string);
  loading.value = false;
};
fetchTodo();
</script>

<template>
  <span v-if="loading">loading...</span>
  <div v-else>
    <h1>{{ todoStore.todo?.title }}</h1>
    <p>{{ todoStore.todo?.completed }}</p>
  </div>
</template>

<style scoped></style>
