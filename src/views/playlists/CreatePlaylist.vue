<script setup>
import { ref } from "vue";
import useStorage from "@/composables/useStorage";
import { useRouter } from "vue-router";
import useCollection from "@/composables/useCollection";
import getUser from "@/composables/getUser";
import { timestamp } from "@/firebase/config";

const title = ref("");
const description = ref("");
const file = ref(null);
const fileError = ref(null);
const isPending = ref(false);
const router = useRouter();

const { url, filePath, uploadImage } = useStorage();
const { error, setDoc } = useCollection("playlists");
const { user } = getUser();

//allowed file types
const types = ["image/png", "image/jpeg"];

const handleChange = (e) => {
  const selected = e.target.files[0];

  if (selected && types.includes(selected.type)) {
    file.value = selected;
    fileError.value = null;
  } else {
    file.value = null;
    fileError.value = "Please select an image file (png or jpg)";
  }
};

const handleSubmit = async () => {
  if (file.value) {
    isPending.value = true;
    await uploadImage(file.value);
    const res = await setDoc({
      title: title.value,
      description: description.value,
      userId: user.value.uid,
      userName: user.value.displayName,
      coverUrl: url.value,
      filePath: filePath.value,
      songs: [],
      createdAt: timestamp,
    });
    isPending.value = false;
    if (!error.value) {
      router.push({ name: "playlistdetails", params: { id: res.id } });
    }
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <h4>Create New Playlist</h4>
    <input type="text" required placeholder="Playlist title" v-model="title" />
    <textarea
      required
      placeholder="Playlist description..."
      v-model="description"></textarea>
    <label>Upload playlist cover image</label>
    <input type="file" @change="handleChange" />
    <div class="error">{{ fileError }}</div>
    <div class="error">{{ error }}</div>

    <button v-if="!isPending">Create</button>
    <button v-else disabled>Saving...</button>
  </form>
</template>

<style scoped>
input[type="file"] {
  border: 0;
  padding: 0;
}

label {
  font-size: 12px;
  display: block;
  margin-top: 30px;
}

button {
  margin-top: 20px;
}
</style>
