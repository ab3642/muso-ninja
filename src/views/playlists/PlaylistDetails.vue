<script setup>
import getCollectionById from "@/composables/getCollectionById";
import { ref, defineProps, onMounted } from "vue";

const playlist = ref(null);

const props = defineProps(["id"]);

const { result, error } = getCollectionById("playlist", props.id);
</script>

<template>
  <div v-if="!result">Loading...</div>
  <div v-if="result">
    <h2>Playlist Details. ID -{{ result.title }}</h2>
  </div>
</template>

<style lang="scss" scoped></style>
