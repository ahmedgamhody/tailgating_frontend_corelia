import { Vehicles } from "../../types";

export default function VehicleDataDisplay({
  vehicleData,
}: {
  vehicleData: Vehicles;
}) {
  const isMultipleVehicles = vehicleData.length > 1;
  return (
    <div
      className={`${
        isMultipleVehicles ? "" : "mt-6 p-4 bg-gray-50 rounded-lg"
      }`}
    >
      {!isMultipleVehicles && (
        <h3 className="text-lg font-semibold mb-3 text-gray-800">
          Vehicle Information
        </h3>
      )}
      <div className={`${isMultipleVehicles ? "space-y-4" : "space-y-2"}`}>
        {vehicleData.length > 0 ? (
          vehicleData.map((vehicle, index) => (
            <div
              key={index}
              className={`bg-white ${
                isMultipleVehicles
                  ? "border-l-4 border-green-500 shadow-md"
                  : ""
              } p-4 rounded-lg border`}
            >
              {/* Vehicle header for multiple results */}
              {isMultipleVehicles && (
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold text-sm">
                        {index + 1}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-800 font-mono">
                        {vehicle.registration}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {vehicle.make} {vehicle.model || "N/A"}
                      </p>
                    </div>
                  </div>
                  {vehicle.primary_colour && (
                    <div className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                      {vehicle.primary_colour}
                    </div>
                  )}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {!isMultipleVehicles && (
                  /* Registration - Only show for single vehicle since it's in header for multiple */
                  <div className="bg-blue-50 p-3 rounded-md">
                    <span className="block text-xs font-medium text-blue-600 uppercase mb-1">
                      Registration
                    </span>
                    <span className="text-lg font-bold text-blue-800 font-mono">
                      {vehicle.registration}
                    </span>
                  </div>
                )}

                {!isMultipleVehicles && (
                  /* Make & Model - Only show for single vehicle since it's in header for multiple */
                  <div className="bg-gray-50 p-3 rounded-md">
                    <span className="block text-xs font-medium text-gray-600 uppercase mb-1">
                      Make & Model
                    </span>
                    <span className="text-lg font-semibold text-gray-800">
                      {vehicle.make} {vehicle.model || "N/A"}
                    </span>
                  </div>
                )}

                {!isMultipleVehicles && vehicle.primary_colour && (
                  /* Primary Color - Only show for single vehicle since it's in header for multiple */
                  <div className="bg-green-50 p-3 rounded-md">
                    <span className="block text-xs font-medium text-green-600 uppercase mb-1">
                      Primary Color
                    </span>
                    <span className="text-lg font-semibold text-green-800">
                      {vehicle.primary_colour}
                    </span>
                  </div>
                )}

                {/* Fuel Type */}
                <div className="bg-yellow-50 p-3 rounded-md">
                  <span className="block text-xs font-medium text-yellow-600 uppercase mb-1">
                    Fuel Type
                  </span>
                  <span className="text-sm font-medium text-yellow-800">
                    {vehicle.fuel_type || "N/A"}
                  </span>
                </div>

                {/* Engine Size */}
                <div className="bg-purple-50 p-3 rounded-md">
                  <span className="block text-xs font-medium text-purple-600 uppercase mb-1">
                    Engine Size
                  </span>
                  <span className="text-sm font-medium text-purple-800">
                    {vehicle.engine_size ? `${vehicle.engine_size}cc` : "N/A"}
                  </span>
                </div>

                {/* First Used Date */}
                <div className="bg-indigo-50 p-3 rounded-md">
                  <span className="block text-xs font-medium text-indigo-600 uppercase mb-1">
                    First Used Date
                  </span>
                  <span className="text-sm font-medium text-indigo-800">
                    {vehicle.first_used_date
                      ? new Date(vehicle.first_used_date).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>

                {/* Registration Date */}
                <div className="bg-pink-50 p-3 rounded-md">
                  <span className="block text-xs font-medium text-pink-600 uppercase mb-1">
                    Registration Date
                  </span>
                  <span className="text-sm font-medium text-pink-800">
                    {vehicle.registration_date
                      ? new Date(vehicle.registration_date).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>

                {/* Manufacture Date */}
                <div className="bg-orange-50 p-3 rounded-md">
                  <span className="block text-xs font-medium text-orange-600 uppercase mb-1">
                    Manufacture Date
                  </span>
                  <span className="text-sm font-medium text-orange-800">
                    {vehicle.manufacture_date
                      ? new Date(vehicle.manufacture_date).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>

                {/* Last MOT Test */}
                <div className="bg-red-50 p-3 rounded-md">
                  <span className="block text-xs font-medium text-red-600 uppercase mb-1">
                    Last MOT Test
                  </span>
                  <span className="text-sm font-medium text-red-800">
                    {vehicle.last_mot_test_date
                      ? new Date(
                          vehicle.last_mot_test_date
                        ).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>

                {/* Secondary Color */}
                {vehicle.secondary_colour &&
                  vehicle.secondary_colour !== "Not Stated" && (
                    <div className="bg-teal-50 p-3 rounded-md">
                      <span className="block text-xs font-medium text-teal-600 uppercase mb-1">
                        Secondary Color
                      </span>
                      <span className="text-sm font-medium text-teal-800">
                        {vehicle.secondary_colour}
                      </span>
                    </div>
                  )}

                {/* Data Source */}
                <div className="bg-gray-100 p-3 rounded-md">
                  <span className="block text-xs font-medium text-gray-500 uppercase mb-1">
                    Data Source
                  </span>
                  <span className="text-sm font-medium text-gray-700 uppercase">
                    {vehicle.data_source || "N/A"}
                  </span>
                </div>

                {/* Modification Status */}
                {vehicle.modification && (
                  <div
                    className={`p-3 rounded-md ${
                      vehicle.modification === "UPDATED"
                        ? "bg-green-100"
                        : vehicle.modification === "CREATED"
                        ? "bg-blue-100"
                        : "bg-gray-100"
                    }`}
                  >
                    <span
                      className={`block text-xs font-medium uppercase mb-1 ${
                        vehicle.modification === "UPDATED"
                          ? "text-green-600"
                          : vehicle.modification === "CREATED"
                          ? "text-blue-600"
                          : "text-gray-600"
                      }`}
                    >
                      Status
                    </span>
                    <span
                      className={`text-sm font-bold ${
                        vehicle.modification === "UPDATED"
                          ? "text-green-800"
                          : vehicle.modification === "CREATED"
                          ? "text-blue-800"
                          : "text-gray-800"
                      }`}
                    >
                      {vehicle.modification}
                    </span>
                  </div>
                )}

                {/* Last Update */}
                {vehicle.last_update_date && (
                  <div className="bg-slate-50 p-3 rounded-md">
                    <span className="block text-xs font-medium text-slate-600 uppercase mb-1">
                      Last Update
                    </span>
                    <span className="text-sm font-medium text-slate-800">
                      {new Date(vehicle.last_update_date).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-center">
            <p className="text-yellow-700 font-medium">No vehicle data found</p>
            <p className="text-yellow-600 text-sm mt-1">
              Try searching with different parameters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
