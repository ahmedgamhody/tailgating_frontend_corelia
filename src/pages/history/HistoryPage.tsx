import { useGetAnomalies } from "../../hooks/useGetAnomalies";
import { AnomaliesResponseConfig } from "../../types";
import {
  Calendar,
  Camera,
  Clock,
  AlertTriangle,
  RefreshCcw,
  Eye,
  Settings,
} from "lucide-react";

export default function HistoryPage() {
  const { anomalies, error, refetch, anomaliesLoading } = useGetAnomalies();
  const formatDateTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return {
      date: date.toLocaleDateString("en-GB"),
      time: date.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    };
  };

  const handleRefresh = () => {
    refetch();
  };

  const handleShow = (anomaly: AnomaliesResponseConfig) => {
    window.open(`/anomalies/${anomaly.timestamp}`, "_blank");
  };

  if (anomaliesLoading) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <p className="text-blue-800">Loading anomalies...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            <div>
              <h3 className="text-red-800 font-semibold">
                Error Loading Anomalies
              </h3>
              <p className="text-red-600 mt-1">{error}</p>
              <button
                onClick={handleRefresh}
                className="mt-3 px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Anomalies History
          </h1>
          <p className="text-gray-600 mt-1">
            View all detected anomalies across channels and sources
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 px-3 py-1 rounded-full">
            <span className="text-blue-800 font-semibold">
              {anomalies.length} Total Anomalies
            </span>
          </div>
          <button
            onClick={handleRefresh}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RefreshCcw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Anomalies Table */}
      {anomalies.length > 0 ? (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              {/* Table Header */}
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center justify-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Date & Time</span>
                    </div>
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center justify-center space-x-1">
                      <Camera className="w-4 h-4" />
                      <span>Channel</span>
                    </div>
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center justify-center space-x-1">
                      <Camera className="w-4 h-4" />
                      <span>Source</span>
                    </div>
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center justify-center space-x-1">
                      <Settings className="w-4 h-4" />
                      <span>Actions</span>
                    </div>
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="bg-white divide-y divide-gray-200">
                {anomalies.map((anomaly, index) => {
                  const { date, time } = formatDateTime(anomaly.timestamp);
                  return (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      {/* Timestamp */}
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex flex-col items-center">
                          <div className="text-sm font-medium text-gray-900">
                            {date}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{time}</span>
                          </div>
                        </div>
                      </td>

                      {/* Channel */}
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                          <div className="text-sm font-medium text-gray-900">
                            {anomaly.channel_name}
                          </div>
                        </div>
                      </td>

                      {/* Source */}
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="text-sm text-gray-900">
                          {anomaly.source_name}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                          Detected
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent row click
                            handleShow(anomaly);
                          }}
                          className="inline-flex items-center space-x-1 px-3 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded-md hover:bg-blue-200 hover:text-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                        >
                          <Eye className="w-3 h-3" />
                          <span>Show</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-12">
          <div className="text-center">
            <AlertTriangle className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No Anomalies Found
            </h3>
            <p className="text-gray-500">
              No anomalies have been detected yet. Check back later or refresh
              the page.
            </p>
            <button
              onClick={handleRefresh}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Refresh Data
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
