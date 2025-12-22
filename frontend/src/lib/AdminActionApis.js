import { getAuthHeaders } from "../utils/getAuthtoken";
import adminAxios from "./adminAxios";


export const markAsResolved = async (id, remark) => {
  if (!remark) {
    return false;
  }

  const resolvedData = await adminAxios.put(
    `/admin/issues/resolve/${id}`,
    { remark: remark },
    { headers: await getAuthHeaders() }
  );

  return resolvedData.data;
};

export const markInProgress = async (id, remark) => {
  if (!remark) {
    return false;
  }

  const resolvedData = await adminAxios.put(
    `/admin/issues/progress/${id}`,
    { remark: remark },
    { headers: await getAuthHeaders() }
  );

  return resolvedData.data;
};

export const markAsrejected = async (id, remark) => {
  if (!remark) {
    return false;
  }

  const resolvedData = await adminAxios.put(
    `/admin/issues/reject/${id}`,
    { remark: remark },
    { headers: await getAuthHeaders() }
  );

  return resolvedData.data;
};
