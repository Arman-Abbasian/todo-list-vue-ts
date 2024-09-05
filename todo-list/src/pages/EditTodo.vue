<script setup lang="ts">
import { ref } from "vue";
import { useTodoStore } from "../store/todo";
import { useRoute } from "vue-router";
import { Todo } from "../types/todo";

const todoStore = useTodoStore();

const loading = ref(false);
const todo = ref({ ...todoStore.todo });
const rules = [
  (value: string) => {
    if (value) return true;
    return "You must enter a first name.";
  },
];

const route = useRoute();
async function getTodo() {
  loading.value = true;
  await todoStore.getTodo(route.params.id as string);
  todo.value = { ...todoStore.todo };
  loading.value = false;
}
getTodo();

async function editTodo() {
  if (!todo.value.title) {
    alert("Title cannot be empty");
    return;
  }
  loading.value = true;
  await todoStore.putTodo({
    id: todo.value.id as string,
    body: {
      title: todo.value.title,
      completed: todo.value.completed as boolean,
    },
  });
  loading.value = false;
}
</script>

<template>
  <div>
    <h1>Edit a Todo</h1>
    <span v-if="loading">loading....</span>
    <span v-else-if="!todoStore.todo">not found todo</span>
    <v-sheet v-else class="mx-auto" width="300">
      <v-form :rules="rules" @submit.prevent="editTodo">
        <v-text-field
          v-model="todo.title"
          :rules="rules"
          label="Title"
        ></v-text-field>
        <v-btn class="mt-2" type="submit" block>Submit</v-btn>
      </v-form>
    </v-sheet>
  </div>
</template>

<style scoped></style>
