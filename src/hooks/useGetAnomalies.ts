import axios from "axios";
import { useState, useEffect } from "react";
import { AnomaliesResponse } from "../types";

const api = import.meta.env.VITE_API_GET_ANOMALIES;
export const useGetAnomalies = () => {
  const [anomalies, setAnomalies] = useState<AnomaliesResponse>([]);
  const [error, setError] = useState<string | null>(null);
  const fetchAnomalies = async () => {
    try {
      setError(null);
      const response = await axios.post<AnomaliesResponse>(api);
      setAnomalies(response.data);
    } catch (err) {
      console.error("Error fetching anomalies:", err);
      setError("Failed to fetch anomalies");
      // Fallback to empty array or you can import the static array as fallback
    }
  };

  useEffect(() => {
    fetchAnomalies();
  }, []);

  return {
    anomalies,
    error,
    refetch: fetchAnomalies,
  };
};
