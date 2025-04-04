import { ref } from "vue";
import { projectFirestore } from "@/firebase/config";
import { doc, deleteDoc } from "firebase/firestore";

const useDocuments = () => {
  const error = ref(null);
  const isPending = ref(false);

  const deletePlaylist = async (collection, id) => {
    isPending.value = true;
    error.value = null;

    try {
      await deleteDoc(doc(projectFirestore, collection, id));
      isPending.value = false;
      error.value = null;
    } catch (err) {
      console.log(err.message);
      error.value = err.message;
      isPending.value = false;
    }
  };

  return { isPending, error, deletePlaylist };
};

export default useDocuments;
