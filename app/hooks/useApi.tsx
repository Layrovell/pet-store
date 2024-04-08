import { useState } from 'react';

const useApi = (apiFunc: any) => {
  const [data, setData] = useState<any>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const request = async (...args: any) => {
    setLoading(true);

    try {
      const response = await apiFunc(...args);
      if (!response.ok) {
        setError(true);
        return response;
      }
      setData(response.data);
      return response;
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return {
    request,
    data,
    error,
    loading,
  };
};

export default useApi;
