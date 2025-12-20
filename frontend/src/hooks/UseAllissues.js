import {useQuery} from '@tanstack/react-query';
import { getAllissues } from '../lib/apicalls';

const useAllIssues =()=>{
  const {data, isLoading}= useQuery({
    queryKey:["getAllIssues"],
    queryFn:getAllissues,
    retry:2
  })

  return {isLoading:isLoading , allIssues:data?.issues}
}

export default useAllIssues;