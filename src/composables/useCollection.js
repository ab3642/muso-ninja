import { ref } from "vue";
import { collection, addDoc } from "firebase/firestore";
import { projectFirestore } from "../firebase/config";

const useCollection = (playlist) => {
  const error = ref(null);
  const isPending = ref(false);

  // add a new document
  const setDoc = async (document) => {
    error.value = null;
    isPending.value = true;

    try {
      await addDoc(collection(projectFirestore, "playlist"), document);

      isPending.value = false;
    } catch (err) {
      console.log(err.message);
      error.value = "could not send the message";
      isPending.value = false;
    }
  };

  return { error, setDoc, isPending };
};

export default useCollection;
