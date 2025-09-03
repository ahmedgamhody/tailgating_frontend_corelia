/* eslint-disable @typescript-eslint/no-explicit-any */
import toast from "react-hot-toast";
import axiosInstance from "./axiosInstance";
import {
  VehicleDetailsFormData,
  VehiclesDetailsFormData,
} from "../validation/VehicleDetailsValidation";
import { extractLicensePlateOcrResponse, Vehicle, Vehicles } from "../types";
import axios from "axios";

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const detail = error.response?.data?.detail;
    let message = "Something went wrong";

    if (Array.isArray(detail)) {
      message = detail.map((err: any) => err.msg).join(" | ");
    } else if (typeof detail === "string") {
      message = detail;
    }

    toast.error(message);
    return Promise.reject(error);
  }
);

export const pauseChannel = async (channel_name: string) => {
  const response = await axiosInstance.post(
    "/pause_channel",
    {
      channel_name,
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  toast.success("Channel paused successfully");

  return response;
};

export const resumeChannel = async (channel_name: string) => {
  const response = await axiosInstance.post(
    "/resume_channel",
    {
      channel_name,
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  toast.success("Channel resumed successfully");

  return response;
};

export const endChannel = async (channel_name: string) => {
  console.log("channel_name:", channel_name);
  const response = await axiosInstance.post(
    "/end_channel",
    {
      channel_name,
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  toast.success("Channel removed successfully");

  return response;
};

export const getAnomalyBatch = async ({
  before,
  after,
  channel_name,
  source_name,
  anomaly_ts,
}: {
  before: number;
  after: number;
  channel_name: string;
  source_name: string;
  anomaly_ts: string;
}) => {
  console.log("getAnomalyBatch called with:", {
    before,
    after,
    channel_name,
    source_name,
    anomaly_ts,
  });

  const formData = new URLSearchParams();
  formData.append("before", before.toString());
  formData.append("after", after.toString());
  formData.append("channel_name", channel_name);
  formData.append("source_name", source_name);

  const response = await axiosInstance.post(
    `/get_anomaly_batch?anomaly_ts=${encodeURIComponent(anomaly_ts)}`,
    formData,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  console.log("Fetched anomalies:", response.data);

  return response.data;
};

export const extractLicensePlateOcr = async (file: File) => {
  const api = import.meta.env.VITE_OCR_API;
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post<extractLicensePlateOcrResponse>(
    api,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  toast.success("License plate OCR extracted successfully");
  return response.data;
};
export const getVehicleDetails = async ({
  registration,
  make,
  primary_colour,
}: VehicleDetailsFormData) => {
  const api = import.meta.env.VITE_OCR_API_GET_VEHICLE_DETAILS;
  const response = await axios.get<Vehicle>(`${api}/by-details`, {
    params: {
      registration,
      make,
      primary_colour,
    },
  });

  return response.data;
};

export const getVehiclesDetails = async ({
  partial_registration,
  make,
  primary_colour,
  model,
  fuel_type,
  limit,
}: VehiclesDetailsFormData) => {
  const api = import.meta.env.VITE_OCR_API_GET_VEHICLE_DETAILS;
  const response = await axios.get<Vehicles>(`${api}/by-partial-registration`, {
    params: {
      partial_registration,
      ...(make ? { make } : {}),
      ...(primary_colour ? { primary_colour } : {}),
      ...(model ? { model } : {}),
      ...(fuel_type ? { fuel_type } : {}),
      limit: limit || 10,
    },
  });
  return response.data;
};
