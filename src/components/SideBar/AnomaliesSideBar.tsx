import { CircleChevronLeft } from "lucide-react";
import { Tooltip, Select, Label } from "flowbite-react";
import { Sidebar } from "flowbite-react";
import { useAppDispatch } from "../../store/hooks";
import { closeAnomaliesSidebar } from "../../store/ui/uiSlice";
import { useGetChannelsAndSources } from "../../hooks/useGetChannelsAndSources";
import {
  resetTimestamp,
  // setTimestamp,
} from "../../store/anomalies/anomaliesSlice";
import { useEffect } from "react";
export default function AnomaliesSideBar({
  selectedChannel,
  setSelectedChannel,
  selectedSource,
  setSelectedSource,
}: {
  selectedChannel?: string;
  setSelectedChannel?: React.Dispatch<React.SetStateAction<string>>;
  selectedSource?: string;
  setSelectedSource?: React.Dispatch<React.SetStateAction<string>>;
}) {
  const dispatch = useAppDispatch();

  const { channels } = useGetChannelsAndSources();

  useEffect(() => {
    return () => {
      dispatch(resetTimestamp());
    };
  }, []);

  return (
    <Sidebar
      aria-label="Sidebar with content separator example"
      className=" bg-section "
    >
      <Sidebar.Items className="flex justify-between flex-col ">
        <Sidebar.ItemGroup>
          <div className="mb-4 flex justify-end">
            <Tooltip content="Hide Sidebar">
              <CircleChevronLeft
                className="text-secondary cursor-pointer"
                strokeWidth={2}
                onClick={() => {
                  dispatch(closeAnomaliesSidebar());
                }}
              />
            </Tooltip>
          </div>
          <div
            className=" flex flex-col"
            style={{
              marginBottom: "25px",
            }}
          >
            <h1 className="text-xl font-bold ">Anomalies </h1>
          </div>
          <div className="flex flex-col gap-4">
            {/* Channels Dropdown */}
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="channel"
                value="Channel"
                className="text-lg text-secondary font-bold"
              />
              <Select
                id="channel"
                value={selectedChannel}
                onChange={(e) =>
                  setSelectedChannel && setSelectedChannel(e.target.value)
                }
                className="w-full"
              >
                <option className="hidden">Select Channel</option>
                {channels.map((channel) => (
                  <option key={channel.channel} value={channel.channel}>
                    {channel.channel}
                  </option>
                ))}
              </Select>
            </div>

            {/* Sources Dropdown */}
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="source"
                value="Source"
                className="text-lg text-secondary font-bold"
              />
              <Select
                id="source"
                value={selectedSource}
                onChange={(e) =>
                  setSelectedSource && setSelectedSource(e.target.value)
                }
                className="w-full"
              >
                <option className="hidden">Select Source</option>
                {channels
                  .find((ch) => ch.channel === selectedChannel)
                  ?.sources.map((source) => (
                    <option key={source} value={source}>
                      {source}
                    </option>
                  ))}
              </Select>
            </div>
          </div>
          {/* <div className="mt-6">
            <Label
              value="Anomalies Timestamps"
              className="text-lg text-secondary font-bold mb-3"
            />
            <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
              {anomalies && anomalies.length > 0 ? (
                anomalies.map((anomaly, index) => (
                  <div
                    key={index}
                    className="p-2 bg-white rounded-lg border cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => {
                      dispatch(setTimestamp(anomaly.timestamp));
                    }}
                  >
                    <div className="text-sm font-medium text-gray-900">
                      {anomaly.timestamp}
                    </div>
                    <div className="text-xs text-gray-500">
                      Channel: {anomaly.channel_name}
                    </div>
                    <div className="text-xs text-gray-500">
                      Source: {anomaly.source_name}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 py-4">
                  No anomalies found
                </div>
              )}
            </div>
          </div> */}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
