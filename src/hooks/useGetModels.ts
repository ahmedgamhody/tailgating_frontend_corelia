import axios from "axios";
import { useState, useEffect } from "react";
import { ModelConfig, ModelsResponse } from "../types";

const api = import.meta.env.VITE_API_GET_MODELS;
export const useGetModels = () => {
  const [models, setModels] = useState<ModelConfig[]>([]);
  const [modelsLoading, setModelsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchModels = async () => {
    try {
      setModelsLoading(true);
      setError(null);
      const response = await axios.post<ModelsResponse>(api);
      setModels(response.data);
    } catch (err) {
      console.error("Error fetching models:", err);
      setError("Failed to fetch models");
      // Fallback to empty array or you can import the static array as fallback
      setModels([]);
    } finally {
      setModelsLoading(false);
    }
  };

  useEffect(() => {
    fetchModels();
  }, []);

  return {
    models,
    modelsLoading,
    error,
    refetch: fetchModels,
  };
};
