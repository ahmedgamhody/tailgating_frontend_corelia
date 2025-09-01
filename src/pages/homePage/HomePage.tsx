/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import SourceSkeleton from "../../ui/skeletons/SourceSkeleton";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { IFrameData, IWSResponse } from "../../interfaces";
import FrameItem from "./Frame";
import { PlotsConditionsType } from "../../types";
import { buildPayload } from "../../utils/buildPayload";
import { getGridColsClass } from "../../utils/getGridColsClass";
import { addAnomalies } from "../../store/license plates/anomaliesSlice";

export default function HomePage({
  plotsConditions,
  moreInstancesInput,
  isFirstItemExpanded,

  itemsPerRow,
}: {
  plotsConditions?: PlotsConditionsType;
  moreInstancesInput?: number | "";
  isFirstItemExpanded: boolean;
  itemsPerRow: number;
}) {
  const [frames, setFrames] = useState<IFrameData[]>([]);
  const { selectedChannel } = useAppSelector((state) => state.channels);
  const dispatch = useAppDispatch();
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
        const anomalies = res.flatMap((entry) =>
          entry.data.map((frame) => frame.anomalies)
        );
        dispatch(addAnomalies(anomalies));
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

  useEffect(() => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      const payload = buildPayload(plotsConditions!, moreInstancesInput!);
      socketRef.current.send(JSON.stringify({ ...payload }));
    }
  }, [plotsConditions, moreInstancesInput]);

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
