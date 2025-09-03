import axios from "axios";
import { useState, useEffect } from "react";
import { AnomaliesResponse } from "../types";

const api = import.meta.env.VITE_API_GET_ANOMALIES;
export const useGetAnomalies = () => {
  const [anomalies, setAnomalies] = useState<AnomaliesResponse>([]);
  const [error, setError] = useState<string | null>(null);
  const [anomaliesLoading, setAnomaliesLoading] = useState(true);
  const fetchAnomalies = async () => {
    try {
      setAnomaliesLoading(true);
      setError(null);
      const response = await axios.post<AnomaliesResponse>(api);
      setAnomalies(response.data);
    } catch (err) {
      console.error("Error fetching anomalies:", err);
      setError("Failed to fetch anomalies");
    } finally {
      setAnomaliesLoading(false);
    }
  };

  useEffect(() => {
    fetchAnomalies();
  }, []);

  return {
    anomalies,
    error,
    refetch: fetchAnomalies,
    anomaliesLoading,
  };
};
