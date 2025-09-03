import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getVehicleDetails } from "../../utils/api";
import VehicleDataDisplay from "./VehicleDataDisplay";
import { extractLicensePlateOcrResponse, Vehicles } from "../../types";

export default function VehicleDetails({
  plateOcrResult,
}: {
  plateOcrResult: extractLicensePlateOcrResponse | null;
}) {
  const [loading, setLoading] = useState(false);
  const [vehicleData, setVehicleData] = useState<Vehicles | null>(null);
  const [noDataFound, setNoDataFound] = useState(false);

  // Auto search when plateOcrResult changes
  useEffect(() => {
    if (plateOcrResult?.plate) {
      searchVehicleDetails(plateOcrResult.plate);
    } else {
      setVehicleData(null);
      setNoDataFound(false);
    }
  }, [plateOcrResult]);

  const searchVehicleDetails = async (plateNumber: string) => {
    setLoading(true);
    setNoDataFound(false);
    setVehicleData(null);

    try {
      const result = await getVehicleDetails({
        registration: plateNumber,
        make: "",
        primary_colour: "",
      });

      // Check if result exists and has at least one item
      if (result && Array.isArray(result) && result.length > 0) {
        setVehicleData(result);
        setNoDataFound(false);
        toast.success(`Vehicle found for plate: ${plateNumber}`);
      } else {
        setVehicleData(null);
        setNoDataFound(true);
        toast.error(`No vehicle data found for plate: ${plateNumber}`);
      }
    } catch (error) {
      console.error("Error fetching vehicle details:", error);
      setVehicleData(null);
      setNoDataFound(true);
      toast.error(`Failed to fetch vehicle details for: ${plateNumber}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Vehicle Details</h1>

      {plateOcrResult && (
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
          {/* OCR Result Display */}
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-800">
                  Detected License Plate
                </h3>
                <p className="text-2xl font-bold text-blue-900 font-mono">
                  {plateOcrResult.plate}
                </p>
                {loading && (
                  <p className="text-sm text-blue-600 mt-1">
                    🔍 Searching vehicle database...
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-8">
              <div className="flex flex-col items-center space-y-3">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
                <p className="text-gray-600">
                  Searching for vehicle details...
                </p>
                <p className="text-sm text-gray-500">
                  Please wait while we look up: {plateOcrResult.plate}
                </p>
              </div>
            </div>
          )}

          {/* Vehicle Data Display */}
          {vehicleData && !loading && (
            <VehicleDataDisplay vehicleData={vehicleData} />
          )}

          {/* No Data Found Message */}
          {noDataFound && !loading && (
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-yellow-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    No Vehicle Data Found
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>
                      No vehicle data was found for license plate:{" "}
                      <strong className="font-mono">
                        {plateOcrResult.plate}
                      </strong>
                    </p>
                    <p className="mt-1">This could mean:</p>
                    <ul className="list-disc list-inside mt-1">
                      <li>The plate number is not in our database</li>
                      <li>The OCR reading might be inaccurate</li>
                      <li>The vehicle is not registered in the UK</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
