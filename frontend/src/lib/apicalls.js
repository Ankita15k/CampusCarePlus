import { getAuthHeaders } from "../utils/getAuthtoken";
import adminAxios from "./adminAxios";
import { axiosInstance } from "./axios";

export const getAllissues = async () => {
  try {
    const data = await adminAxios.get("/admin/allissues", {
      headers: await getAuthHeaders(),
    });

    //  console.log(data.data.issues)
    return data.data.issues;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getIssueDetailByAdmin = async (id) => {
  try {
    const issueDetail = await adminAxios.get(`admin/issues/${id}`, {
      headers: await getAuthHeaders(),
    });

    // console.log(issueDetail.data)
    return issueDetail.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getIssueDetailByUSer = async (id) => {
  const issueDetail = await axiosInstance.get(`/issues/${id}`);

  console.log(issueDetail.data);
  return issueDetail.data;
};
