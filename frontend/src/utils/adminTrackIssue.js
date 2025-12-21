import { axiosInstance } from "../lib/axios";

const adminTrackIssue = async (reportId) => {
  const res = await axiosInstance.get(`/admin/issue/${reportId}`);
  return res.data;
};

export default adminTrackIssue;
