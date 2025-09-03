/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { FileUpload } from "./FileUpload";
import { extractLicensePlateOcr } from "../../utils/api";
import toast from "react-hot-toast";
import { ImageUp } from "lucide-react";
import { extractLicensePlateOcrResponse } from "../../types";

export default function OcrSection({
  plateOcrResult,
  setPlateOcrResult,
}: {
  plateOcrResult: extractLicensePlateOcrResponse | null;
  setPlateOcrResult: React.Dispatch<
    React.SetStateAction<extractLicensePlateOcrResponse | null>
  >;
}) {
  const [loading, setLoading] = useState(false);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleFileSelect = async (files: File[]) => {
    const file = files[0];
    if (!file) return;

    // Create image preview URL
    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);

    const formData = new FormData();
    formData.append("file", file);
    try {
      setLoading(true);
      const result = await extractLicensePlateOcr(file);
      setPlateOcrResult(result);
    } catch (error: any) {
      toast.error(
        `Failed to extract license plate OCR: ${error.message || error}`
      );
      // Clear image on error
      setSelectedImage(null);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">License Plate OCR</h1>
      <FileUpload onFileSelect={handleFileSelect} disabled={loading} />

      {/* Results Section */}
      {plateOcrResult || selectedImage ? (
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Image Section */}
          {selectedImage && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-800">
                Uploaded Image
              </h3>
              <div className="border-2 border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                <img
                  src={selectedImage}
                  alt="Uploaded license plate"
                  className="w-full h-48 object-contain bg-white"
                />
              </div>
            </div>
          )}

          {/* OCR Results Section */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-800">OCR Results</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              {loading ? (
                <div className="flex flex-col items-center justify-center space-y-3">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  <p className="text-gray-500">Processing image...</p>
                </div>
              ) : plateOcrResult ? (
                <div className="text-center">
                  <p className="text-green-600 mb-2">License Plate Detected:</p>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <span className="font-bold text-2xl text-green-800 font-mono">
                      {plateOcrResult.plate}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-yellow-600">Processing...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-4 flex justify-center items-center h-32 border-2 border-dashed border-gray-300 rounded-lg">
          <div className="text-center">
            <ImageUp className="mx-auto h-12 w-12 text-gray-400 mb-2" />
            <p className="text-gray-500">
              Upload an image to get started with license plate OCR
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
