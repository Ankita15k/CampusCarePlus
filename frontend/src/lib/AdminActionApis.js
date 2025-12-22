import { getAuthHeaders } from "../utils/getAuthtoken"
import adminAxios from "./adminAxios"
import {toast} from 'react-hot-toast';

export const markAsResolved = async(id,remark)=>{

  if(!remark){
    return false
  }

try {
    const resolvedData = await adminAxios.put(`/admin/issues/resolve/${id}`,{remark:remark},{headers:await getAuthHeaders()})

  
 return resolvedData.data;
} catch (error) {
  console.log(error)
  toast.error(error.response.data.message)
  return false
}
}

export const markInProgress = async(id,remark)=>{

  if(!remark){
    return false
  }

try {
    const resolvedData = await adminAxios.put(`/admin/issues/progress/${id}`,{remark:remark},{headers:await getAuthHeaders()})

  
 return resolvedData.data;
} catch (error) {
  console.log(error)
  toast.error(error.response.data.message)
  return false
}
}

export const markAsrejected = async(id,remark)=>{

  if(!remark){
    return false
  }

try {
    const resolvedData = await adminAxios.put(`/admin/issues/reject/${id}`,{remark:remark},{headers:await getAuthHeaders()})

  
 return resolvedData.data;
} catch (error) {
  console.log(error)
  toast.error(error.response.data.message)
  return false
}
}
