import { PlotsConditionsType } from "../types";

export const buildPayload = (
  plotsConditions: PlotsConditionsType,
  moreInstancesInput: number | ""
) => {
  return {
    plots_flags: {
      plots: plotsConditions.plots,
      source_name: plotsConditions.source_name,
      timestamp: plotsConditions.timestamp,
      frame_rate: plotsConditions.frame_rate,
      classes_counts: plotsConditions.classes_counts,
      classes_summations: plotsConditions.classesSummations,
      labels: plotsConditions.labels,
      boxes: plotsConditions.boxes,
      masks: plotsConditions.masks,
      keypoints: plotsConditions.keypoints,
      tracking_lines: plotsConditions.trackingLines,
      objects_durations: plotsConditions.objectsDurations,
    },
    more_instances: moreInstancesInput === "" ? 0 : moreInstancesInput,
  };
};
