import { useState } from "react";
import PlotsConditions from "./Plots/PlotsConditions";
import { PlotsConditionsType } from "../../types";
import SourceSkeleton from "../../ui/skeletons/SourceSkeleton";

export default function LiveStreaming() {
  const [loading] = useState(true);
  const [plotsConditions, setPlotsConditions] = useState<PlotsConditionsType>({
  plots: true,
  
  sourceName: true,
  dateTime: true,
  framesRate: true,
  
  classesCount: true,
  classesSummations: true,

  classes: true,
  trackingIds: true,
  objectsDurations: true,

  boxes: true,
  masks: true,
  keypoints: true,

  confidence: true,

  trackingLines: true,
  heatMap: true,
  blur: true,
  });
  // console.log("plotsConditions", plotsConditions);
  return (
    <div className="flex flex-col gap-4 p-3   ">
      <div className="bg-white p-3 rounded-md">
        <div className="flex flex-col md:flex-row gap-4 ">
          <div className="w-full md:w-1/2 h-auto">
            <img
              src="/public/Live-view 2.png"
              alt=""
              className="rounded-md  object-contain w-full h-80"
            />
          </div>
          <div className="w-full md:w-1/2 h-auto">
            <PlotsConditions
              plotsConditions={plotsConditions}
              setPlotsConditions={setPlotsConditions}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 mt-4 flex-wrap  justify-between">
          {loading &&
            Array.from({ length: 4 }, (_, index) => (
              <SourceSkeleton key={index} />
            ))}
        </div>
      </div>
    </div>
  );
}
