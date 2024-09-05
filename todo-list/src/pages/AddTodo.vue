<script setup lang="ts">
import { ref } from "vue";
import { useTodoStore } from "../store/todo";

const loading = ref(false);
const title = ref("");
const rules = [
  (value: string) => {
    if (value) return true;
    return "You must enter a first name.";
  },
];

const todoStore = useTodoStore();

async function postTodo() {
  if (!title.value) {
    alert("Title cannot be empty");
    return;
  }
  loading.value = true;
  await todoStore.postTodo({ title: title.value, completed: false });
  loading.value = false;
  title.value = "";
}
</script>

<template>
  <div>
    <h1>Add a Todo</h1>
    <span v-if="loading">loading....</span>

    <v-sheet class="mx-auto" width="300">
      <v-form :rules="rules" @submit.prevent="postTodo">
        <v-text-field
          v-model="title"
          :rules="rules"
          label="Title"
        ></v-text-field>
        <v-btn class="mt-2" type="submit" block>Submit</v-btn>
      </v-form>
    </v-sheet>
  </div>
</template>

<style scoped></style>
