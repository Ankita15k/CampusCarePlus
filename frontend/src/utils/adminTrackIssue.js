import { axiosInstance } from "../lib/axios";
import { getAuthHeaders } from "./getAuthtoken";

const adminTrackIssue = async (reportId) => {
  const res = await axiosInstance.get(`/admin/issues/${reportId}`,{
    headers:await getAuthHeaders()
  });
  console.log(res.data)
  return res.data;
};

export default adminTrackIssue;
