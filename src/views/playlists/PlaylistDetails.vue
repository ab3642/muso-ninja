<script setup>
import getCollectionById from "@/composables/getCollectionById";
import { ref, defineProps, onMounted } from "vue";

const playlist = ref(null);

const props = defineProps(["id"]);

onMounted(async () => {
  playlist.value = await getCollectionById("playlist", props.id);
});
</script>

<template>
  <h2>Playlist Details. ID - {{ playlist.title }}</h2>
</template>

<style lang="scss" scoped></style>
