import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { apiConfig } from "./apis";

const accessToken = "GZb8!vH2!mX7^sP5#tL4@pW8!nJ3^zR6";
const fetchApiData = async (endpointKey, params) => {
    const api = apiConfig[endpointKey];
    const response = await axios({
      method: api.method,
      url: api.url(params),
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  };
  
export const useApiQuery = (endpointKey, params ) => {
    return useQuery({
      queryKey: [endpointKey, params],
      queryFn: () => fetchApiData(endpointKey, params),
      enabled: !!accessToken, 
      refetchOnWindowFocus: false,  
      refetchOnMount: false,         
    });
  };
  