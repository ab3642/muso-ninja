import { watchEffect } from "vue";
import { projectFirestore } from "../firebase/config";
import { collection, getDocs, onSnapshot } from "firebase/firestore";

const getCollection = async (type) => {
  const querySnapshot = await getDocs(collection(projectFirestore, type));
  const results = [];
  const unsub = querySnapshot.forEach((doc) => {
    results.push({ ...doc.data(), id: doc.id });
  });

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub());
  });
  return results;
};

export default getCollection;
