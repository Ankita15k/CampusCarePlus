import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebase";

/**
 * Sends password reset email using Firebase Auth
 * @param {string} email
 * @returns {string} success message
 */
const forgotPassword = async (email) => {
  if (!email) {
    throw new Error("Email is required");
  }

  try {
    await sendPasswordResetEmail(auth, email);
    return "Password reset link sent to your email";
  } catch (error) {
    console.error("Password reset failed:", error);
    throw error; // Rethrow the error for further handling
  }
};

export default forgotPassword;
