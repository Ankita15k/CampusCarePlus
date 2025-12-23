import { axiosInstance } from "../lib/axios";

const submitIssue = async (form) => {
  if (!form) {
    return {
      success: false,
      message: "Form data is missing",
    };
  }

  const response = await axiosInstance.post("/submit", form);

  return {
    success: true,
    data: response.data,
  };
};

export default submitIssue;
