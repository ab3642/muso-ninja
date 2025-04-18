import { projectFirestore } from "@/firebase/config";
import { doc, onSnapshot } from "firebase/firestore";
import { watchEffect, ref } from "vue";

const getCollectionById = (type, id) => {
  const playlist = ref(null);
  const error = ref(null);

  const unsub = onSnapshot(
    doc(projectFirestore, type, id),
    (doc) => {
      if (doc.data()) {
        playlist.value = { ...doc.data(), id: doc.id };
      }
    },
    (err) => {
      console.log(err.message);
      error.value = "problem fetching the document";
    }
  );

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub());
  });

  return { playlist, error };
};

export default getCollectionById;
