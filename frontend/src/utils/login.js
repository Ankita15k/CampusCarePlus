import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { getAuthHeaders } from "./getAuthtoken";

const login = async (email, password) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
  console.log(await getAuthHeaders())
    return userCredential.user;
  } catch (error) {
    console.error("Login failed:", error);
    throw error; 
  }
};

export default login;
