import { projectFirestore } from "@/firebase/config";
import { doc, getDoc } from "firebase/firestore";

const getCollectionById = async (type, id) => {
  const docRef = doc(projectFirestore, type, id);
  const docSnap = await getDoc(docRef);

  let result;

  if (docSnap.exists()) {
    result = docSnap.data();
  } else {
    console.log("No such document");
  }
  return result;
};

export default getCollectionById;
