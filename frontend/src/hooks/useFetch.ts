import { useEffect, useState } from "react";
import { SERVER_URL } from "../components/Routing/Routing";

interface ApiResponse {
  // Define the structure of your API response data here
}

interface FetchResult {
  data: ApiResponse | null;
  isLoading: boolean;
  error: any; // Change 'any' to a proper error type if available
  status: number | null;
}

export const useFetch = (
  url: string,
  method: string,
  body: Record<string, any> | null,
  ReqAuth: boolean
): FetchResult => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<Error | null>(null); // Change 'Error' to your error type if available
  const [status, setStatus] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(SERVER_URL + url, {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

        const responseData = await response.json();

        setStatus(response.status);
        setData(responseData);
      } catch (error: any) {
        setStatus(error.status)
        setFetchError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, method, body]);

  return { data, isLoading, error: fetchError, status };
};
