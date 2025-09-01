import { Progress } from "flowbite-react";
import {
  CalendarDays,
  CirclePause,
  CloudDownload,
  Disc,
  Expand,
  Gauge,
  Grid2x2,
  Grid3x3,
  Table2,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

export default function Footer({
  setItemsPerRow,
  setIsFirstItemExpanded,
  isFirstItemExpanded,
}: {
  setItemsPerRow: (num: number) => void;
  setIsFirstItemExpanded: (isExpanded: boolean) => void;
  isFirstItemExpanded: boolean;
}) {
  return (
    <footer className="bg-gray-300 text-black p-3 flex flex-col gap-5">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <CalendarDays />
          <p className="sm:text-xs md:text-xs lg:text-sm">
            2025-04-12 08:00:00 AM
          </p>
        </div>
        <div className="flex items-center gap-2">
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
        <div className="flex items-center gap-2">
          <p className="sm:text-xs md:text-xs lg:text-sm">
            Preprocessing rate: 9.4 FPS
          </p>
          <Disc />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <CirclePause className="cursor-pointer" />
          <Gauge className="cursor-pointer" />
          <ZoomIn className="cursor-pointer" />
          <ZoomOut className="cursor-pointer" />
        </div>
        <div className="w-1/2">
          <Progress
            progress={80}
            color="teal"
            theme={{ color: { teal: "bg-secondary" } }}
          />
        </div>
        <div className="flex items-center gap-2">
          <Expand className="cursor-pointer" />
          <CloudDownload className="cursor-pointer" />
        </div>
      </div>
    </footer>
  );
}
