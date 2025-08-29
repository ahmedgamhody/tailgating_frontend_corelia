import { useRef } from "react";
import { IFrameData } from "../../interfaces";

export default function FrameItem({ frame }: { frame: IFrameData }) {
  const containerRef = useRef(null);

  return (
    <div className="bg-white rounded shadow p-2">
      <p className="text-sm font-semibold mb-2">{frame?.source_name}</p>

      <div
        ref={containerRef}
        className="relative w-full aspect-square overflow-hidden"
      >
        <img
          src={`data:image/jpeg;base64,${frame?.frame}`}
          alt="frame"
          className="w-full h-full object-cover rounded"
        />
      </div>
    </div>
  );
}
