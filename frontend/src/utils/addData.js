import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";



const addData = async (data) => {
  if ( !data) {
    throw new Error(" data is required");
  }

  try {
const reported_data =     await addDoc(collection(db, "issues"), {
      ...data,
      createdAt: serverTimestamp(),
    });
  console.log(reported_data)
    return true;
  } catch (error) {
    console.error("Error adding data:", error);
    throw error;
  }
};

export default addData;
