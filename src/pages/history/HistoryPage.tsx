import { useState } from "react";
import { PlotsConditionsType } from "../../types";
import { getGridColsClass } from "../../utils/getGridColsClass";
import SourceSkeleton from "../../ui/skeletons/SourceSkeleton";
import FrameItem from "../homePage/Frame";
import { IFrameData } from "../../interfaces";

export default function HistoryPage({
  plotsConditions,
  moreInstancesInput,
  itemsPerRow,
  isFirstItemExpanded,
}: {
  plotsConditions?: PlotsConditionsType;
  moreInstancesInput?: number | "";
  itemsPerRow: number;
  isFirstItemExpanded: boolean;
}) {
  const [frames, setFrames] = useState<IFrameData[]>([]);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Scrollable Main Content */}
      <main className="flex-1 overflow-y-auto p-5">
        <div
          className={`grid gap-4 ${getGridColsClass(itemsPerRow)}`}
          style={{ gridAutoRows: "minmax(120px, auto)" }}
        >
          {frames.length === 0
            ? Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className={
                    isFirstItemExpanded && index === 0
                      ? "col-span-2 row-span-2 h-[200%] bg-gray-100 rounded-lg"
                      : ""
                  }
                >
                  <SourceSkeleton />
                </div>
              ))
            : frames.map((frame, index) => (
                <div
                  key={index}
                  className={
                    isFirstItemExpanded && index === 0
                      ? "col-span-2 row-span-2 h-[200%] bg-gray-100 rounded-lg"
                      : isFirstItemExpanded &&
                        index === 1 &&
                        frames.length === 2
                      ? "col-start-3 row-start-1"
                      : ""
                  }
                >
                  <FrameItem frame={frame} />
                </div>
              ))}
        </div>
      </main>
    </div>
  );
}
