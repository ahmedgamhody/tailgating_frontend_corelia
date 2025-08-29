export type TLoading = "idle" | "pending" | "succeeded" | "failed";
export type FieldType = {
  name?: string;
  confidence: number;
  overlapping: number;
  augment: boolean;
  realTimeMode: boolean;
  tracking: boolean;
  withReId: boolean;
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
};
