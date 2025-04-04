<script setup>
import getCollectionById from "@/composables/getCollectionById";
import { useRouter } from "vue-router";
import useDocuments from "@/composables/useDocument";
import useStorage from "@/composables/useStorage";
import getUser from "@/composables/getUser";
import { computed, defineProps } from "vue";

const props = defineProps(["id"]);
const { user } = getUser();
const router = useRouter();

const { playlist } = getCollectionById("playlist", props.id);
const { error, deletePlaylist } = useDocuments();
const { deleteImage } = useStorage();

const ownership = computed(() => {
  return (
    playlist.value && user.value && user.value.uid === playlist.value.userId
  );
});

const handleDelete = async () => {
  await deleteImage(playlist.value.filePath);
  await deletePlaylist("playlist", props.id);

  if (!error.value) {
    router.push({ name: "home" });
  }
};
</script>

<template>
  <div v-if="!playlist">Loading...</div>
  <div v-if="error" class="error">{{ error }}</div>
  <div v-else class="playlist-details">
    <div class="playlist-info">
      <div class="cover">
        <img :src="playlist.coverUrl" alt="" />
      </div>
      <h2>{{ playlist.title }}</h2>
      <p class="username">Created by {{ playlist.userName }}</p>
      <p class="description">{{ playlist.description }}</p>
      <button v-if="ownership" @click="handleDelete">Delete Playlist</button>
    </div>
    <!-- song list -->
    <div class="song-list">
      <p>song list here</p>
    </div>
  </div>
</template>

<style scoped>
.playlist-details {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 80px;
}
.cover {
  overflow: hidden;
  border-radius: 20px;
  position: relative;
  padding: 160px;
}
.cover img {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
  max-width: 200%;
  max-height: 200%;
}
.playlist-info {
  text-align: center;
}
.playlist-info h2 {
  text-transform: capitalize;
  font-size: 28px;
  margin-top: 20px;
}
.playlist-info p {
  margin-bottom: 20px;
}
.username {
  color: #999;
}
.description {
  text-align: left;
}
</style>
