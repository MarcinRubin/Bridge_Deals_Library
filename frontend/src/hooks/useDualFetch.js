import { useEffect, useState } from "react";
import client from "./axiosClient";

export default function useDualFetch(url1, url2) {
  const [data, setData] = useState(null);
  const [data2, setData2] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await client.get(url1);
        const response2 = await client.get(url2);
        setData(response.data);
        setData2(response2.data.directories);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return [data, setData, data2, setData2, error, loading];
}
