<script setup>
import { ref, onMounted } from "vue";
import getCollection from "@/composables/getCollection";
import ListView from "@/components/ListView.vue";

const playlists = ref(null);

onMounted(async () => {
  playlists.value = await getCollection("playlist");
});
</script>

<template>
  <div>
    <ListView :playlists="playlists" />
  </div>
</template>
