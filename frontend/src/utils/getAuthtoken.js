import { auth } from "../firebase/firebase";



export const getAuthHeaders = async () => {
  const user = auth.currentUser;
  const token = await user.getIdToken();
  return {
    Authorization: `Bearer ${token}`,
  };
};