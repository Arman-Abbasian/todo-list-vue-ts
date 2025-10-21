<script setup lang="ts">
import { Field, ErrorMessage } from 'vee-validate'
import { defineProps } from 'vue'

const props = defineProps<{
  name: string
  type?: string
  label?: string
  placeholder?: string
}>()
</script>

<template>
  <Field name="name" type="type" place />
  <ErrorMessage name="name" />
</template>
<style scoped></style>
