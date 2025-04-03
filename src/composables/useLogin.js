import { ref } from "vue";
import { projectAuth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";

const error = ref(null);
const isPending = ref(false);

const login = async (email, password) => {
  isPending.value = true;
  error.value = null;

  try {
    const res = await signInWithEmailAndPassword(projectAuth, email, password);
    error.value = null;
    isPending.value = false;
    return res;
  } catch (err) {
    console.log(err);
    error.value = err.message;
    isPending.value = false;
  }
};

const useLogin = () => {
  return { error, login, isPending };
};

export default useLogin;
