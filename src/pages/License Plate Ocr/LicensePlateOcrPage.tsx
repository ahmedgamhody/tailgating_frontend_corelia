import { useState } from "react";
import OcrSection from "../../components/License Plate Ocr/OcrSection";
import VehicleDetails from "../../components/License Plate Ocr/vehicleDetails";
import VehiclesDetails from "../../components/License Plate Ocr/vehiclesDetails";
import { extractLicensePlateOcrResponse } from "../../types";

export default function LicensePlateOcrPage() {
  const [plateOcrResult, setPlateOcrResult] =
    useState<extractLicensePlateOcrResponse | null>(null);
  // useState<extractLicensePlateOcrResponse | null>({ plate: "A120AAM" });
  return (
    <div>
      <OcrSection
        plateOcrResult={plateOcrResult}
        setPlateOcrResult={setPlateOcrResult}
      />
      {plateOcrResult && <VehicleDetails plateOcrResult={plateOcrResult} />}
      <VehiclesDetails />
    </div>
  );
}
