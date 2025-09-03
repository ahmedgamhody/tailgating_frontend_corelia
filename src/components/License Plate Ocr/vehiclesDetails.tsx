import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  VehiclesDetailsFormData,
  VehiclesDetailsSchema,
} from "../../validation/VehicleDetailsValidation";
import { getVehiclesDetails } from "../../utils/api";
import VehicleDataDisplay from "./VehicleDataDisplay";
import { Vehicles } from "../../types";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function VehiclesDetails() {
  const [loading, setLoading] = useState(false);
  const [vehicleData, setVehicleData] = useState<Vehicles | null>(null);
  const [noDataFound, setNoDataFound] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<VehiclesDetailsFormData>({
    resolver: zodResolver(VehiclesDetailsSchema),
    defaultValues: {
      limit: 10, // Default limit
    },
  });

  const onSubmit = async (data: VehiclesDetailsFormData) => {
    setLoading(true);
    setNoDataFound(false); // Reset the no data state
    try {
      const result = await getVehiclesDetails(data);
      console.log("result", result);
      // Check if result exists and has at least one item
      if (result && Array.isArray(result) && result.length > 0) {
        setVehicleData(result);
        setNoDataFound(false);
        toast.success(`Found ${result.length} vehicle(s) successfully!`);
      } else {
        setVehicleData(null);
        setNoDataFound(true); // Set no data found state
      }
    } catch (error) {
      console.error("Error fetching vehicles details:", error);
      setVehicleData(null);
      setNoDataFound(false); // Don't show no data message for errors
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    reset({
      partial_registration: "",
      make: "",
      primary_colour: "",
      model: "",
      fuel_type: "",
      limit: 10,
    });
    setVehicleData(null);
    setNoDataFound(false);
    setIsExpanded(true); // Reset to expanded state
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Multiple Vehicles Search</h1>
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Registration Input - Full Width */}
          <div>
            <label
              htmlFor="partial_registration"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Registration Number *
            </label>
            <input
              {...register("partial_registration")}
              type="text"
              id="partial_registration"
              placeholder="Enter partial or full registration number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading}
            />
            {errors.partial_registration && (
              <p className="text-red-500 text-sm mt-1">
                {errors.partial_registration.message}
              </p>
            )}
          </div>

          {/* Two Column Layout for Optional Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Make Input */}
            <div>
              <label
                htmlFor="make"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Make (Optional)
              </label>
              <input
                {...register("make")}
                type="text"
                id="make"
                placeholder="Enter vehicle make"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
              />
              {errors.make && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.make.message}
                </p>
              )}
            </div>

            {/* Model Input */}
            <div>
              <label
                htmlFor="model"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Model (Optional)
              </label>
              <input
                {...register("model")}
                type="text"
                id="model"
                placeholder="Enter vehicle model"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
              />
              {errors.model && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.model.message}
                </p>
              )}
            </div>

            {/* Primary Colour Input */}
            <div>
              <label
                htmlFor="primary_colour"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Primary Color (Optional)
              </label>
              <input
                {...register("primary_colour")}
                type="text"
                id="primary_colour"
                placeholder="Enter primary color"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
              />
              {errors.primary_colour && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.primary_colour.message}
                </p>
              )}
            </div>

            {/* Fuel Type Input */}
            <div>
              <label
                htmlFor="fuel_type"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Fuel Type (Optional)
              </label>
              <input
                {...register("fuel_type")}
                type="text"
                id="fuel_type"
                placeholder="e.g., Petrol, Diesel, Electric"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
              />
              {errors.fuel_type && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.fuel_type.message}
                </p>
              )}
            </div>
          </div>

          {/* Limit Input */}
          <div>
            <label
              htmlFor="limit"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Results Limit
            </label>
            <input
              {...register("limit", {
                valueAsNumber: true,
                min: { value: 1, message: "Limit must be at least 1" },
                max: { value: 100, message: "Limit cannot exceed 100" },
              })}
              type="number"
              id="limit"
              min="1"
              max="100"
              placeholder="Max number of results (1-100)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading}
            />
            {errors.limit && (
              <p className="text-red-500 text-sm mt-1">
                {errors.limit.message}
              </p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Maximum number of vehicles to return (default: 10)
            </p>
          </div>

          {/* Submit and Reset Buttons */}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Searching...
                </div>
              ) : (
                "Search Multiple Vehicles"
              )}
            </button>
            <button
              type="button"
              onClick={handleReset}
              disabled={loading}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Reset
            </button>
          </div>
        </form>

        {/* Vehicle Data Display - With Collapsible Header */}
        {vehicleData && (
          <div className="mt-6">
            <div
              className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-t-lg cursor-pointer hover:bg-green-100 transition-colors"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
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
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-800">
                    Search Results {!isExpanded ? "(Preview)" : ""}
                  </h3>
                  <div className="flex items-center space-x-4">
                    <p className="text-sm text-green-600">
                      {vehicleData.length} vehicle
                      {vehicleData.length > 1 ? "s" : ""} found
                    </p>
                    {vehicleData.length > 1 && !isExpanded && (
                      <span className="px-2 py-1 bg-green-200 text-green-800 text-xs rounded-full">
                        Click to expand
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {!isExpanded && vehicleData.length > 0 && (
                  <div className="text-xs text-green-600 text-right">
                    <div>First {Math.min(3, vehicleData.length)} shown</div>
                    {vehicleData.length > 3 && (
                      <div>{vehicleData.length - 3} more hidden</div>
                    )}
                  </div>
                )}
                <div className="flex-shrink-0">
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-green-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-green-600" />
                  )}
                </div>
              </div>
            </div>

            {/* Collapsible Content */}
            {isExpanded ? (
              <div className="border-l border-r border-b border-green-200 rounded-b-lg bg-white">
                <div className="max-h-96 overflow-y-auto">
                  {/* Compact header for multiple results */}
                  {vehicleData.length > 1 && (
                    <div className="sticky top-0 bg-white border-b border-gray-200 p-3">
                      <p className="text-xs text-gray-500 text-center">
                        Scroll to view all {vehicleData.length} results • Click
                        any vehicle for details
                      </p>
                    </div>
                  )}
                  <div className="p-4 space-y-3">
                    <VehicleDataDisplay vehicleData={vehicleData} />
                  </div>
                </div>
              </div>
            ) : (
              // Collapsed view - Show summary cards
              <div className="border-l border-r border-b border-green-200 rounded-b-lg bg-white p-4">
                <div className="grid gap-2 max-h-40 overflow-y-auto">
                  {vehicleData.slice(0, 3).map((vehicle, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded-md border hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="font-mono font-bold text-sm">
                          {vehicle.registration}
                        </span>
                        <span className="text-sm text-gray-600">
                          {vehicle.make} {vehicle.model || ""}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {vehicle.primary_colour && (
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                            {vehicle.primary_colour}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                  {vehicleData.length > 3 && (
                    <div className="text-center py-2 text-sm text-gray-500">
                      +{vehicleData.length - 3} more vehicles...
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setIsExpanded(true)}
                  className="w-full mt-3 px-3 py-2 text-sm bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors"
                >
                  View Full Details
                </button>
              </div>
            )}
          </div>
        )}

        {/* No Data Found Message */}
        {noDataFound && (
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
                  No Vehicles Found
                </h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>
                    No vehicles were found matching the search criteria. Please
                    try:
                  </p>
                  <ul className="list-disc list-inside mt-1">
                    <li>Using a shorter registration pattern</li>
                    <li>Removing optional filters (make, color)</li>
                    <li>Checking spelling of make and color</li>
                    <li>Increasing the results limit</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
