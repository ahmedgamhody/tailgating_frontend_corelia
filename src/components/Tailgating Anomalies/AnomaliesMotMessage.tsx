/* eslint-disable @typescript-eslint/no-explicit-any */
export default function AnomaliesMotMessage({ vehicle }: { vehicle: any }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
        <div>
          <span className="font-semibold text-gray-700">Registration:</span>
          <p className="text-blue-600 font-mono">
            {vehicle.registration || "N/A"}
          </p>
        </div>
        <div>
          <span className="font-semibold text-gray-700">Make & Model:</span>
          <p className="text-gray-800">
            {vehicle.make} {vehicle.model || "N/A"}
          </p>
        </div>
        <div>
          <span className="font-semibold text-gray-700">Color:</span>
          <p className="text-gray-800">{vehicle.primary_colour || "N/A"}</p>
        </div>
        <div>
          <span className="font-semibold text-gray-700">Fuel Type:</span>
          <p className="text-gray-800">{vehicle.fuel_type || "N/A"}</p>
        </div>
        <div>
          <span className="font-semibold text-gray-700">Engine Size:</span>
          <p className="text-gray-800">
            {vehicle.engine_size ? `${vehicle.engine_size}cc` : "N/A"}
          </p>
        </div>
        <div>
          <span className="font-semibold text-gray-700">First Used:</span>
          <p className="text-gray-800">{vehicle.first_used_date || "N/A"}</p>
        </div>
        <div>
          <span className="font-semibold text-gray-700">Last MOT:</span>
          <p className="text-gray-800">
            {vehicle.last_mot_test_date
              ? new Date(vehicle.last_mot_test_date).toLocaleDateString()
              : "N/A"}
          </p>
        </div>
        <div>
          <span className="font-semibold text-gray-700">Status:</span>
          <p
            className={`font-medium ${
              vehicle.modification === "UPDATED"
                ? "text-green-600"
                : "text-blue-600"
            }`}
          >
            {vehicle.modification || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}
