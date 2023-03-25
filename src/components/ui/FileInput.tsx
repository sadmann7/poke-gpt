import { CheckCircle, DownloadCloud, Loader2 } from "lucide-react";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  type Dispatch,
  type SetStateAction
} from "react";
import {
  useDropzone,
  type Accept,
  type ErrorCode,
  type FileRejection
} from "react-dropzone";
import type {
  FieldValues,
  Path,
  PathValue,
  UseFormSetValue
} from "react-hook-form";
import { toast } from "react-hot-toast";
import { twMerge } from "tailwind-merge";

type FileInputProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  setValue: UseFormSetValue<TFieldValues>;
  accept?: Accept;
  maxSize: number;
  maxFiles?: number;
  selectedFile: File | null;
  setSelectedFile: Dispatch<SetStateAction<File | null>>;
  previewType?: "image" | "name";
  isUploading?: boolean;
  disabled?: boolean;
  className?: string;
};

const FileInput = <TFieldValues extends FieldValues>({
  name,
  setValue,
  accept = {
    "image/png": [],
    "image/jpeg": [],
  },
  maxSize,
  maxFiles = 1,
  selectedFile,
  setSelectedFile,
  previewType = "image",
  isUploading = false,
  disabled = false,
  className = "",
}: FileInputProps<TFieldValues>) => {
  const onDrop = useCallback(
    async (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      acceptedFiles.forEach((file) => {
        if (!file) return;
        setValue(name, file as PathValue<TFieldValues, Path<TFieldValues>>, {
          shouldValidate: true,
        });
        setSelectedFile(file);
      });
      rejectedFiles.forEach((file) => {
        setValue(name, null as PathValue<TFieldValues, Path<TFieldValues>>, {
          shouldValidate: true,
        });
        setSelectedFile(null);
        switch (file.errors[0]?.code as ErrorCode) {
          case "file-invalid-type":
            toast.error("File type not supported");
            break;
          case "file-too-large":
            const size = (file.file.size / 1024 / 1024).toFixed(2);
            toast.error(
              `Please select a file smaller than ${
                maxSize / 1024 / 1024
              }MB. Current size: ${size}MB`
            );
            break;
          case "too-many-files":
            toast.error("Please select only one file");
            break;
          default:
            toast.error(file.errors[0]?.message);
            break;
        }
      });
    },
    [maxSize, name, setSelectedFile, setValue]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    maxFiles,
  });

  useEffect(() => {
    if (!selectedFile) return;
    return () => URL.revokeObjectURL(selectedFile.name);
  }, [selectedFile]);

  return (
    <div
      {...getRootProps()}
      className={twMerge(
        "group relative grid h-60 w-full cursor-pointer place-items-center rounded-lg border-2 border-dashed p-2 text-center transition hover:bg-gray-700/80",
        "focus:outline-none focus-visible:border-solid focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900",
        isDragActive ? "border-gray-400" : "border-gray-500",
        selectedFile && previewType === "image"
          ? "h-full border-none p-0"
          : "h-60",
        disabled
          ? "pointer-events-none opacity-50"
          : "pointer-events-auto opacity-100",
        className
      )}
    >
      <input {...getInputProps()} />
      {isUploading ? (
        <Loader2 className="h-16 w-16 animate-spin" />
      ) : selectedFile ? (
        previewType === "image" ? (
          <div className="group relative aspect-square h-full max-h-[420px] w-full">
            {isDragActive ? (
              <div className="absolute inset-0 grid h-full w-full place-items-center bg-gray-900/70">
                <div className="grid place-items-center gap-2 text-gray-200 sm:px-10">
                  <DownloadCloud
                    className={twMerge(
                      "h-9 w-9 group-hover:animate-bounce",
                      isDragActive ? "animate-bounce" : ""
                    )}
                    aria-hidden="true"
                  />
                  <p className="text-base font-medium sm:text-lg">
                    Drop the file here
                  </p>
                </div>
              </div>
            ) : (
              <div className="absolute inset-0 grid h-full w-full place-items-center bg-gray-900/60 opacity-0 transition-opacity group-hover:opacity-100">
                <div className="grid place-items-center gap-2">
                  <div className="flex items-center gap-2 text-gray-100">
                    <CheckCircle className="h-5 w-5" aria-hidden="true" />
                    <p className="text-base font-medium sm:text-lg">
                      Image selected
                    </p>
                  </div>
                  <p className="text-sm text-gray-400 sm:text-base">
                    Click to select another image, or drag and drop
                  </p>
                </div>
              </div>
            )}
            <Image
              src={URL.createObjectURL(selectedFile)}
              alt={selectedFile.name ?? "preview"}
              fill
              className="absolute inset-0 -z-10 rounded-2xl object-cover"
            />
          </div>
        ) : (
          <p className="text-base font-medium text-gray-200 sm:text-lg">
            {selectedFile.name}
          </p>
        )
      ) : isDragActive ? (
        <div className="grid place-items-center gap-2 text-gray-200 sm:px-10">
          <DownloadCloud
            className={twMerge(
              "h-9 w-9 group-hover:animate-bounce",
              isDragActive ? "animate-bounce" : ""
            )}
            aria-hidden="true"
          />
          <p className="text-base font-medium sm:text-lg">Drop the file here</p>
        </div>
      ) : (
        <div className="grid place-items-center gap-1 sm:px-10">
          <DownloadCloud className="h-9 w-9 text-gray-200" aria-hidden="true" />
          <p className="mt-2 text-base font-medium text-gray-200 sm:text-lg">
            Drag {`'n'`} drop file here, or click to select file
          </p>
          <p className="text-sm text-gray-400 sm:text-base">
            Please upload file with size less than{" "}
            {Math.round(maxSize / 1024 / 1024)}MB
          </p>
        </div>
      )}
    </div>
  );
};

export default FileInput;
