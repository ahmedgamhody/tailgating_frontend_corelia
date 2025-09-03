import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, File, ImageIcon, FileText } from "lucide-react";
import { clsx } from "clsx";

interface FileUploadProps {
  onFileSelect: (files: File[]) => void;
  disabled?: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  disabled = false,
}) => {
  const isDisabled = disabled;
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onFileSelect(acceptedFiles);
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg"],
    },
    multiple: false,
    maxFiles: 1,
    disabled: isDisabled, // Disable the dropzone when processing
  });

  return (
    <div
      {...getRootProps()}
      className={clsx(
        "border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200",
        isDisabled
          ? "border-gray-200 bg-gray-100 cursor-not-allowed opacity-60"
          : isDragActive
          ? "border-blue-500 bg-blue-50 scale-[0.99] cursor-pointer"
          : "border-gray-300 hover:border-blue-400 hover:bg-gray-50 cursor-pointer"
      )}
    >
      <input {...getInputProps()} disabled={isDisabled} />
      <div className="relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2">
          <ImageIcon
            className={clsx(
              "h-8 w-8 transform -rotate-12",
              isDisabled ? "text-gray-400" : "text-blue-500"
            )}
          />
          <FileText
            className={clsx(
              "h-8 w-8 transform rotate-12",
              isDisabled ? "text-gray-400" : "text-blue-600"
            )}
          />
        </div>
        <Upload
          className={clsx(
            "mx-auto h-12 w-12 mt-6",
            isDisabled ? "text-gray-300" : "text-gray-400"
          )}
        />
      </div>
      <p
        className={clsx(
          "mt-4 text-lg font-medium",
          isDisabled ? "text-gray-400" : "text-gray-900"
        )}
      >
        {/* i remove selectedLanguage update that */}

        {isDisabled
          ? "Please select a language first"
          : disabled
          ? "Processing in progress..."
          : isDragActive
          ? "Drop the files here"
          : "Drag & drop files here"}
      </p>
      <p
        className={clsx(
          "mt-2 text-sm",
          isDisabled ? "text-gray-400" : "text-gray-500"
        )}
      >
        {isDisabled
          ? "Choose your document language from the dropdown above"
          : disabled
          ? "Please wait for current upload to complete"
          : "Support for  PNG, JPG (up to 10MB)"}
      </p>
      {!isDisabled && (
        <div className="mt-4 flex justify-center gap-2">
          <File className="h-5 w-5 text-gray-400" />
          <span className="text-sm text-gray-500">Or click to browse</span>
        </div>
      )}
    </div>
  );
};
