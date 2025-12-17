import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";



const logout = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    console.error("Logout failed:", error);
    return false;
  }
};

export default logout;
