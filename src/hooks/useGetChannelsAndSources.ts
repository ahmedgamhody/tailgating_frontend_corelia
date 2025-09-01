import axios from "axios";
import { useState, useEffect } from "react";
import { ChannelsAndSourcesResponse } from "../types";

const api = import.meta.env.VITE_API_GET_CHANNELS_AND_SOURCES;
export const useGetChannelsAndSources = () => {
  const [channels, setChannels] = useState<ChannelsAndSourcesResponse>([]);
  const [error, setError] = useState<string | null>(null);
  const fetchChannels = async () => {
    try {
      setError(null);
      const response = await axios.post<ChannelsAndSourcesResponse>(api);
      setChannels(response.data);
    } catch (err) {
      console.error("Error fetching channels and sources:", err);
      setError("Failed to fetch channels and sources");
      // Fallback to empty array or you can import the static array as fallback
    }
  };

  useEffect(() => {
    fetchChannels();
  }, []);

  return {
    channels,
    error,
    refetch: fetchChannels,
  };
};
