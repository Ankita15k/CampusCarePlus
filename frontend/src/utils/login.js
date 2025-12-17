import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

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

    return userCredential.user;
  } catch (error) {
    console.error("Login failed:", error);
    throw error; 
  }
};

export default login;
