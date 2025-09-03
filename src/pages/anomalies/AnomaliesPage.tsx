/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { IFrameData } from "../../interfaces";
import { anomaliesMessage, PlotsConditionsType } from "../../types";
import {
  CircleChevronLeft,
  CircleChevronRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import SourceSkeleton from "../../ui/skeletons/SourceSkeleton";
import FrameItem from "../homePage/Frame";
import { getAnomalyBatch } from "../../utils/api";
import { useAppSelector } from "../../store/hooks";
import AnomaliesMotMessage from "../../components/Tailgating Anomalies/AnomaliesMotMessage";
import { useParams } from "react-router-dom";

export default function AnomaliesPage({
  plotsConditions,
  moreInstancesInput,
  selectedChannel,
  selectedSource,
}: {
  plotsConditions?: PlotsConditionsType;
  moreInstancesInput?: number | "";
  selectedSource: string;
  selectedChannel: string;
}) {
  const [frames, setFrames] = useState<IFrameData[]>([]);
  const [backwardSeconds, setBackwardSeconds] = useState<number>(15);
  const [forwardSeconds, setForwardSeconds] = useState<number>(15);
  const [message, setMessage] = useState<anomaliesMessage>({
    ocr_result: "",
    mot_result: [],
  });
  const { timestamp } = useParams();
  const [loading, setLoading] = useState(false);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const { anomalies } = useAppSelector((state) => state.anomaliesSlice);
  const [playbackSpeed, setPlaybackSpeed] = useState(65); // milliseconds between frames
  const [isMotResultCollapsed, setIsMotResultCollapsed] = useState(true);
  // const handleBackward = () => {
  //   console.log(`Moving backward ${backwardSeconds} seconds`);
  // };

  // const handleForward = () => {
  //   console.log(`Moving forward ${forwardSeconds} seconds`);
  // };
  console.log("anomalies", anomalies);
  useEffect(() => {
    if (!timestamp) {
      return;
    }

    const fetchAnomalies = async () => {
      setLoading(true);
      try {
        const anomalies = await getAnomalyBatch({
          before: backwardSeconds,
          after: forwardSeconds,
          channel_name: selectedChannel,
          source_name: selectedSource,
          anomaly_ts: timestamp,
        });
        setFrames(anomalies.batch);
        console.log("anomalies", anomalies);
        setMessage(anomalies.message[0]);
        console.log("anomalies.message", anomalies.message);

        setCurrentFrameIndex(0); // Reset to first frame when new data arrives
        setIsPlaying(true); // Auto start playback
      } catch (error) {
        console.error("Error fetching anomalies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnomalies();
  }, [
    backwardSeconds,
    forwardSeconds,
    selectedChannel,
    selectedSource,
    timestamp,
    // , handleBackward , handleForward
  ]);

  // Auto-play frames effect
  useEffect(() => {
    if (!isPlaying || frames.length === 0) return;

    const interval = setInterval(() => {
      setCurrentFrameIndex((prev) => {
        if (prev >= frames.length - 1) {
          setIsPlaying(false); // Stop when reaching the end
          return 0; // Reset to beginning
        }
        return prev + 1;
      });
    }, playbackSpeed);

    return () => clearInterval(interval);
  }, [isPlaying, frames.length, playbackSpeed]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setCurrentFrameIndex(0);
    setIsPlaying(false);
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
  };

  console.log({ moreInstancesInput, plotsConditions });

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Main Area with Scroll */}
        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-col items-center justify-start py-8 px-4 min-h-full">
            <div className="flex gap-8 mb-6">
              {/* Backward Control */}
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg border bg-white shadow-sm">
                <CircleChevronLeft
                  className={`*:text-blue-600 cursor-pointer hover:text-blue-800 ${
                    !selectedSource || !selectedChannel
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  size={24}
                  // onClick={handleBackward}
                />
                <input
                  type="number"
                  value={backwardSeconds}
                  onChange={(e) => setBackwardSeconds(Number(e.target.value))}
                  className="w-16 text-center border-0 outline-none font-semibold  disabled:opacity-50 disabled:cursor-not-allowed"
                  min="1"
                  placeholder="15"
                  title="Backward seconds"
                />
                <span className="text-sm text-gray-600">sec</span>
              </div>

              {/* Forward Control */}
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg border bg-white shadow-sm">
                <input
                  type="number"
                  value={forwardSeconds}
                  onChange={(e) => setForwardSeconds(Number(e.target.value))}
                  className="w-16 text-center border-0 outline-none font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  min="1"
                  placeholder="15"
                  title="Forward seconds"
                />
                <span className="text-sm text-gray-600">sec</span>
                <CircleChevronRight
                  className={`*:text-blue-600 cursor-pointer hover:text-blue-800 ${
                    !selectedSource || !selectedChannel
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  size={24}

                  // onClick={handleForward}
                />
              </div>
            </div>

            <div className="w-full max-w-4xl">
              {/* Video Player Area */}
              <div className="w-full aspect-video bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                {loading ? (
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-600">Loading anomaly batch...</p>
                  </div>
                ) : frames.length === 0 ? (
                  <SourceSkeleton />
                ) : (
                  <FrameItem frame={frames[currentFrameIndex]} />
                )}
              </div>

              {/* Anomaly Information Display */}
              {frames.length > 0 && !loading && (
                <div className="bg-white rounded-lg p-4 shadow-sm border mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Anomaly Details
                  </h3>

                  {/* OCR Result - License Plate */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-600 mb-2">
                      License Plate (OCR Result):
                    </h4>
                    <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                      <p className="text-lg font-mono text-blue-800">
                        {message.ocr_result || "No license plate detected"}
                      </p>
                    </div>
                  </div>

                  {/* MOT Result */}
                  <div className="mb-2">
                    <div
                      className="flex items-center justify-between cursor-pointer p-2 bg-gray-50 border border-gray-200 rounded-md hover:bg-gray-100 transition-colors"
                      onClick={() =>
                        setIsMotResultCollapsed(!isMotResultCollapsed)
                      }
                    >
                      <h4 className="text-sm font-medium text-gray-600">
                        MOT Result (
                        {message.mot_result ? message.mot_result.length : 0}{" "}
                        vehicles)
                      </h4>
                      {isMotResultCollapsed ? (
                        <ChevronDown size={16} className="text-gray-600" />
                      ) : (
                        <ChevronUp size={16} className="text-gray-600" />
                      )}
                    </div>

                    {!isMotResultCollapsed && (
                      <div className="mt-2 max-h-96 overflow-y-auto">
                        {message.mot_result && message.mot_result.length > 0 ? (
                          <div className="space-y-3">
                            {message.mot_result.map(
                              (vehicle: any, index: number) => (
                                <AnomaliesMotMessage
                                  key={index}
                                  vehicle={vehicle}
                                />
                              )
                            )}
                          </div>
                        ) : (
                          <div className="bg-gray-50 border border-gray-200 rounded-md p-4 text-center">
                            <p className="text-gray-500">
                              No MOT data available
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Video Controls */}
              {frames.length > 0 && !loading && (
                <div className="bg-white rounded-lg p-4 shadow-sm border">
                  {/* Playback Controls */}
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <button
                      onClick={handleReset}
                      className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                    >
                      Reset
                    </button>
                    <button
                      onClick={handlePlayPause}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      {isPlaying ? "Pause" : "Play"}
                    </button>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                      <span>
                        Frame {currentFrameIndex + 1} of {frames.length}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${Math.round(
                            ((currentFrameIndex + 1) / frames.length) * 100
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Speed Controls */}
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-sm text-gray-600">Speed:</span>
                    {[1000, 500, 250, 100].map((speed) => (
                      <button
                        key={speed}
                        onClick={() => handleSpeedChange(speed)}
                        className={`px-2 py-1 text-xs rounded transition-colors ${
                          playbackSpeed === speed
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        {speed === 1000
                          ? "1x"
                          : speed === 500
                          ? "2x"
                          : speed === 250
                          ? "4x"
                          : "10x"}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
