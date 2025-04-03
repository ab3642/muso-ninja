<script setup>
import { ref } from "vue";
import useLogin from "@/composables/useLogin";
import { useRouter } from "vue-router";

const { error, login, isPending } = useLogin();
const router = useRouter();

const email = ref("");
const password = ref("");

const handleSubmit = async () => {
  await login(email.value, password.value);

  if (!error.value) {
    console.log("user logged in");
    router.push({ name: "home" });
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <h3>Login</h3>
    <input type="email" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <div v-if="error" class="error">{{ error }}</div>
    <button v-if="!isPending">Log in</button>
    <button v-if="isPending" disabled>Loading</button>
  </form>
</template>

<style lang="scss" scoped></style>
