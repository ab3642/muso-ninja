<script setup>
import { RouterLink } from "vue-router";
import useLogout from "@/composables/useLogout";
import getUser from "@/composables/getUser";
import { useRouter } from "vue-router";

const { user } = getUser();

const { logout } = useLogout();
const router = useRouter();

const handleSubmit = async () => {
  await logout();

  console.log("succesfully logged out");
  router.push({ name: "login" });
};
</script>

<template>
  <div class="navbar">
    <nav>
      <h1><RouterLink :to="{ name: 'home' }">Muso Ninjas</RouterLink></h1>
      <div class="links">
        <div v-if="user">
          <RouterLink class="btn" :to="{ name: 'createplaylist' }"
            >Create Playlist</RouterLink
          >
          <button @click="handleSubmit">Logout</button>
        </div>
        <div v-if="!user">
          <RouterLink class="btn" :to="{ name: 'signup' }">Signup</RouterLink>
          <RouterLink class="btn" :to="{ name: 'login' }">Login</RouterLink>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.navbar {
  padding: 16px 10px;
  margin-bottom: 60px;
  background: white;
}

nav {
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;

  h1 {
    margin-left: 20px;
  }

  .links {
    margin-left: auto;

    a,
    button {
      margin-left: 16px;
      font-size: 14px;
    }
  }
}
</style>
