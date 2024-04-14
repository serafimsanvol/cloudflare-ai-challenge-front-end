import { useEffect, useState } from "react";

export const useFetch = (url: string, options: RequestInit) => {
  const [response, setResponse] = useState({
    data: null,
    error: null,
    loading: false,
  });
  useEffect(() => {
    fetch(url, options)
      .then((res) => res.json())
      .then((data) => setResponse({ data, error: null, loading: false }))
      .catch((error) => setResponse({ data: null, error, loading: false }));
  }, [url, options]);

  return response;
};
