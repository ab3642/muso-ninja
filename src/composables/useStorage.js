import { ref } from "vue";
import { projectStorage } from "@/firebase/config";
import {
  getDownloadURL,
  ref as reference,
  uploadBytes,
} from "firebase/storage";
import getUser from "./getUser";

const { user } = getUser();

const useStorage = () => {
  const error = ref(null);
  const url = ref(null);
  const filePath = ref(null);

  const uploadImage = async (file) => {
    filePath.value = `covers/${user.value.uid}/${file.name}`;

    const storageRef = reference(projectStorage, filePath.value);

    try {
      const res = await uploadBytes(storageRef, file);

      url.value = await getDownloadURL(res.ref);
    } catch (err) {
      console.log(err.message);
      error.value = err.message;
    }
  };

  return { url, filePath, error, uploadImage };
};

export default useStorage;
