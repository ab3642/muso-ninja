<script setup>
import { ref } from "vue";
import useSignup from "@/composables/useSignup";

const password = ref("");
const email = ref("");
const displayName = ref("");

const { error, signup, isPending } = useSignup();

const handleSubmit = async () => {
  const res = await signup(email.value, password.value, displayName.value);

  if (!error.value) {
    console.log("succesfully signed up");
  }

  password.value = "";
  email.value = "";
  displayName.value = "";
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <h3>Sign up</h3>
    <input type="text" placeholder="Display Name" v-model="displayName" />
    <input type="email" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <div v-if="error" class="error">{{ error }}</div>
    <button v-if="!isPending">Sign Up</button>
    <button v-if="isPending" disabled>Loading</button>
  </form>
</template>

<style scoped></style>
