<script setup lang="ts"></script>

<template>
  <div id="container">
    <router-link :to="{ name: 'home' }">Home</router-link>
    <router-link :to="{ name: 'todos' }">Todos</router-link>
    <router-link :to="{ name: 'addTodo' }">Add Todo</router-link>
  </div>
</template>

<style scoped>
#container {
  display: flex;
  align-items: center;
  gap: "10px";
}
</style>
