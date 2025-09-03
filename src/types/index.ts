/* eslint-disable @typescript-eslint/no-explicit-any */

export type TLoading = "idle" | "pending" | "succeeded" | "failed";
export type FieldType = {
  name?: string;
  confidence?: number;
  overlapping?: number;
  augment?: boolean;
  realTimeMode?: boolean;
  tracking?: boolean;
  withReId?: boolean;
};

export type TModalType = {
  name: string;
  weight: string;
};

export type PlotsConditionsType = {
  plots: boolean;

  source_name: boolean;
  timestamp: boolean;
  frame_rate: boolean;

  trackingIds: boolean;
  trackingLines: boolean;
  labels: boolean;
  boxes: boolean;
  masks: boolean;
  keypoints: boolean;

  classes_counts: boolean;
  classesSummations: boolean;
  objectsDurations: boolean;
  heatMap: boolean;
  blur: boolean;
};

export type PlotsConditionsProps = {
  plotsConditions: PlotsConditionsType;
  setPlotsConditions: React.Dispatch<React.SetStateAction<PlotsConditionsType>>;
  moreInstancesInput: number | "";
  setMoreInstancesInput: React.Dispatch<React.SetStateAction<number | "">>;
  setItemsPerRow?: React.Dispatch<React.SetStateAction<number>>;
  isFirstItemExpanded?: boolean;
  setIsFirstItemExpanded?: React.Dispatch<React.SetStateAction<boolean>>;
  selectedChannel?: string;
  setSelectedChannel?: React.Dispatch<React.SetStateAction<string>>;
  selectedSource?: string;
  setSelectedSource?: React.Dispatch<React.SetStateAction<string>>;
};

type TaskType = "segment" | "pose" | "detect";
export type WeightType = "nano" | "small" | "medium" | "large" | "x-large";

type Classes = Record<string, string>;

export interface ModelConfig {
  model: string;
  task: TaskType;
  weights: WeightType[];
  classes: Classes;
}

export type ModelsResponse = ModelConfig[];

export type ChannelsAndSourcesConfig = {
  channel: string;
  sources: string[];
};
export type ChannelsAndSourcesResponse = ChannelsAndSourcesConfig[];
export type AnomaliesResponseConfig = {
  timestamp: string;
  channel_name: string;
  source_name: string;
};
export type AnomaliesResponse = AnomaliesResponseConfig[];

export type anomaliesMessage = {
  ocr_result: string;
  mot_result: any[];
};
export type Vehicle = {
  registration: string;
  first_used_date: string | null;
  registration_date: string | null;
  manufacture_date: string | null;
  primary_colour: string | null;
  secondary_colour: string | null;
  engine_size: number | null;
  model: string | null;
  make: string | null;
  fuel_type: string | null;
  last_mot_test_date: string | null;
  last_update_timestamp: string | null;
  last_update_date: string | null;
  data_source: string | null;
  modification: string | null;
};

export type Vehicles = Vehicle[];
export type extractLicensePlateOcrResponse = {
  plate: string;
};
