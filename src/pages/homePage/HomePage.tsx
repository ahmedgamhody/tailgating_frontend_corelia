/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useRef, useState } from "react";
import SourceSkeleton from "../../ui/skeletons/SourceSkeleton";
import { Grid2x2, Grid3x3, Table2 } from "lucide-react";
import { useAppSelector } from "../../store/hooks";
import { IFrameData, IWSResponse } from "../../interfaces";
import FrameItem from "./Frame";
import { PlotsConditionsType } from "../../types";
import { buildPayload } from "../../utils/buildPayload";
// import { addLicensePlates } from "../../store/license plates/licensePlatesSlice";

export default function HomePage({
  plotsConditions,
  moreInstancesInput,
}: {
  plotsConditions?: PlotsConditionsType;
  moreInstancesInput?: number | "";
}) {
  const [itemsPerRow, setItemsPerRow] = useState(3);
  const [frames, setFrames] = useState<IFrameData[]>([]);
  const [isFirstItemExpanded, setIsFirstItemExpanded] = useState(false);
  const { selectedChannel } = useAppSelector((state) => state.channels);
  // const dispatch = useAppDispatch();
  const getGridColsClass = () => {
    switch (itemsPerRow) {
      case 2:
        return "grid-cols-2";
      case 3:
      default:
        return "grid-cols-3";
    }
  };
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (selectedChannel) {
      socketRef.current = new WebSocket(
        `${import.meta.env.VITE_API_URL_SOCKET}?channel_name=${selectedChannel}`
      );

      socketRef.current.onopen = () => {
        const payload = buildPayload(plotsConditions!, moreInstancesInput!);
        socketRef.current?.send(JSON.stringify({ ...payload }));
      };

      socketRef.current.onmessage = (event: MessageEvent<any>) => {
        const res: IWSResponse[] = JSON.parse(event.data);
        console.log("socket response", res);
        const allFrameData = res.flatMap((entry) => entry.data);
        setFrames(allFrameData);
      };

      socketRef.current.onclose = () => {
        setFrames([]);
      };
    }

    return () => {
      socketRef.current?.close();
      setFrames([]);
    };
  }, [selectedChannel]);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Scrollable Main Content */}
      <main className="flex-1 overflow-y-auto p-5">
        <div
          className={`grid gap-4 ${getGridColsClass()}`}
          style={{ gridAutoRows: "minmax(120px, auto)" }}
        >
          {frames.length === 0
            ? Array.from({ length: 8 }).map((_, index) => (
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

      {/* Sticky Footer at Bottom */}
      <footer className="bg-gray-300 text-black p-3 flex flex-col gap-5">
        <div className="flex justify-center">
          <div className="flex items-center  gap-2">
            <Grid2x2
              className="cursor-pointer"
              onClick={() => {
                setItemsPerRow(2);
                setIsFirstItemExpanded(false);
              }}
            />
            <Grid3x3
              className="cursor-pointer"
              onClick={() => {
                setItemsPerRow(3);
                setIsFirstItemExpanded(false);
              }}
            />
            <Table2
              className="rotate-180 cursor-pointer"
              onClick={() => {
                setIsFirstItemExpanded(!isFirstItemExpanded);
                setItemsPerRow(3);
              }}
            />
          </div>
        </div>
      </footer>
    </div>
  );
}
