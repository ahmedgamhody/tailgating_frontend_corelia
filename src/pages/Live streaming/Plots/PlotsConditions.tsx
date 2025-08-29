import { ToggleSwitch } from "flowbite-react";
import { PlotsConditionsProps, PlotsConditionsType } from "../../../types";
import PlotToggle from "./PlotToggle";

const toggleItems: { label: string; name: keyof PlotsConditionsType }[] = [
  { label: "Source name", name: "sourceName" },
  { label: "Date & Time", name: "dateTime" },
  { label: "Frames Rate", name: "framesRate" },

  { label: "Classes Count", name: "classesCount" },
  { label: "Classes Summations", name: "classesSummations" },

  { label: "Classes", name: "classes" },
  { label: "Tracking IDs", name: "trackingIds" },
  { label: "Objects Durations", name: "objectsDurations" },

  { label: "Boxes", name: "boxes" },
  { label: "Masks", name: "masks" },
  { label: "Keypoints", name: "keypoints" },

  { label: "Confidence", name: "confidence" },

  { label: "Tracking Lines", name: "trackingLines" },
  { label: "Heat Map", name: "heatMap" },
  { label: "Blur", name: "blur" },
];

export default function PlotsConditions({
  plotsConditions,
  setPlotsConditions,
}: PlotsConditionsProps) {
  return (
    <div className="bg-section p-3 rounded-md gap-4 flex flex-col h-full ">
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
            setPlotsConditions((prev) => ({ ...prev, plots: !prev.plots }))
          }
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
        {toggleItems.map((item) => (
          <PlotToggle
            key={item.name}
            label={item.label}
            name={item.name}
            value={plotsConditions[item.name]}
            plotsConditions={plotsConditions}
            onChange={(name) =>
              setPlotsConditions((prev) => ({
                ...prev,
                [name]: !prev[name],
              }))
            }
          />
        ))}
      </div>
    </div>
  );
}
