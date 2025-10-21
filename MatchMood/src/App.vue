<script setup lang="ts"></script>

<template>
  <div class="h-screen overflow-auto bg-background">
    <router-view />
    <div>
      <router-link to="/">Page 1</router-link>
      <router-link to="/page2">Page 2</router-link>
    </div>
  </div>
</template>

<style scoped></style>
