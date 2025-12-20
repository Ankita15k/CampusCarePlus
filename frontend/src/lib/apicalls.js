import { getAuthHeaders } from "../utils/getAuthtoken";
import adminAxios from "./adminAxios";


export const getAllissues = async () => {
  try {
    const data = await adminAxios.get("/admin/allissues", {
      headers: await getAuthHeaders(),
    });

    // console.log(data.data);
    return data.data
  } catch (error) {
    console.log(error);
  }
};
