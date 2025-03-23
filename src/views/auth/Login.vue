<script setup>
import { ref } from "vue";
import useLogin from "@/composables/useLogin";

const { error, login } = useLogin();

const email = ref("");
const password = ref("");

const handleSubmit = async () => {
  const res = await login(email.value, password.value);

  if (!error.value) {
    console.log("user logged in");
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <h3>Login</h3>
    <input type="email" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <div v-if="error" class="error">{{ error }}</div>
    <button>Log in</button>
  </form>
</template>

<style lang="scss" scoped></style>
