<script setup lang="ts">
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
const schema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(8),
})
</script>

<template>
  <div>Sign up</div>
</template>
<style scoped></style>
