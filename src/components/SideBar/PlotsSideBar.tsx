import { CircleChevronRight, Settings } from "lucide-react";
import { ToggleSwitch, Tooltip } from "flowbite-react";
import { Sidebar } from "flowbite-react";
import { useAppDispatch } from "../../store/hooks";

import { closePlotsSidebar } from "../../store/ui/uiSlice";
import { PlotsConditionsProps, PlotsConditionsType } from "../../types";
import PlotToggle from "../../pages/Live streaming/Plots/PlotToggle";
const toggleItems: {
  label: string;
  name: keyof PlotsConditionsType;
  type: "boolean" | "number";
  space?: boolean;
  disable?: boolean;
}[] = [
  { label: "Source name", name: "source_name", type: "boolean" },
  { label: "Date-Time", name: "timestamp", type: "boolean" },
  { label: "Frames rate", name: "frame_rate", type: "boolean", space: true },
  ///////////////////////////////////////////////
  { label: "Classes Counts", name: "classes_counts", type: "boolean" },
  {
    label: "Classes Summations",
    name: "classesSummations",
    type: "boolean",
    space: true,
  },
  { label: "Labels", name: "labels", type: "boolean" },
  { label: "Boxes", name: "boxes", type: "boolean" },
  { label: "Masks", name: "masks", type: "boolean" },
  { label: "Key-points", name: "keypoints", type: "boolean", space: true },
  ///////////////////////////////////////////////
  {
    label: "Tracking Lines",
    name: "trackingLines",
    type: "boolean",
  },
  { label: "Objects Durations", name: "objectsDurations", type: "boolean" },
  { label: "Heat Map", name: "heatMap", type: "boolean", disable: true },
  { label: "Blur", name: "blur", type: "boolean", disable: true },
];

export default function PlotsSideBar({
  plotsConditions,
  setPlotsConditions,
  moreInstancesInput,
  setMoreInstancesInput,
}: PlotsConditionsProps) {
  const dispatch = useAppDispatch();
  return (
    <Sidebar
      aria-label="Sidebar with content separator example"
      className="h-full bg-section w-full "
    >
      <Sidebar.Items className="h-5/6 flex justify-between flex-col">
        <Sidebar.ItemGroup>
          <div className="mb-5">
            <Tooltip content="Hide Sidebar">
              <CircleChevronRight
                className="text-secondary cursor-pointer"
                strokeWidth={2}
                onClick={() => {
                  dispatch(closePlotsSidebar());
                }}
              />
            </Tooltip>
          </div>
          <div className="bg-section p-2 rounded-md gap-3 flex flex-col h-full ">
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold tracking-wide">Plots</h1>
              <ToggleSwitch
                id={"plots"}
                checked={plotsConditions.plots}
                theme={{
                  toggle: {
                    checked: {
                      off: "bg-gray-400",
                      color: {
                        cyan: "bg-secondary",
                      },
                    },
                  },
                }}
                color="cyan"
                onChange={() =>
                  setPlotsConditions((prev) => ({
                    ...prev,
                    plots: !prev.plots,
                  }))
                }
              />
              <Settings className=" cursor-pointer" />
              <input
                type="number"
                disabled={!plotsConditions.plots}
                placeholder="0"
                value={moreInstancesInput}
                onChange={(e) => {
                  const val = e.target.value;
                  setMoreInstancesInput(val === "" ? "" : Number(val));
                }}
                className={`border border-gray-300 rounded px-2 py-1 text-sm w-20
                  ${
                    plotsConditions.plots
                      ? "bg-white"
                      : "bg-gray-200 opacity-50 cursor-not-allowed"
                  }
                `}
              />
            </div>
            <div className="grid grid-cols-1 gap-2 flex-1">
              {toggleItems?.map((item) =>
                item.type === "boolean" ? (
                  <PlotToggle
                    key={item.name}
                    label={item.label}
                    name={item.name}
                    value={plotsConditions[item.name] as boolean}
                    plotsConditions={plotsConditions}
                    space={item.space}
                    disable={item.disable}
                    onChange={(name) =>
                      setPlotsConditions((prev) => ({
                        ...prev,
                        [name]: !prev[name],
                      }))
                    }
                  />
                ) : (
                  <div key={item.name}>
                    <div
                      key={item.name}
                      className={`flex gap-1 items-center justify-between`}
                    >
                      <label className="text-sm font-medium">
                        {item.label}
                      </label>
                    </div>
                    {item.space && <hr className="border-t border-gray-400" />}
                  </div>
                )
              )}
            </div>
          </div>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
