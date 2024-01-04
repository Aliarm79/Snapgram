import { useCallback, useState } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";

interface FileUploaderProps {
  fieldChnage: (FILES: File[]) => void;
  mediaUrl: string;
}

function FileUploader({ fieldChnage, mediaUrl }: FileUploaderProps) {
  const [fileUrl, setFileUrl] = useState("");
  const [file, setFile] = useState<File[]>([]);
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFile(acceptedFiles);
    fieldChnage(acceptedFiles);
    setFileUrl(URL.createObjectURL(acceptedFiles[0]));
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg", ".svg"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="cursor-pointer flex-center flex-col bg-dark-3 rounded-xl"
    >
      <input {...getInputProps()} />
      {fileUrl ? (
        <div className="flex  justify-center w-full p-5 lg:p-10">
          <img src={fileUrl} alt="image" className="file_uploader-img" />
        </div>
      ) : (
        <div className="file_uploader-box">
          <img
            src="/assets/icons/file-upload.svg"
            alt="file-upload"
            width={96}
          />
          <h3 className="base-medium text-light-2 mb-2 mt-6">
            {!isDragActive
              ? "Drag photo here , or click to select files"
              : "drop here ..."}
          </h3>
          <p className="text-light-4 small-regular mb-6">SVG, PNG, JPG</p>
        </div>
      )}
    </div>
  );
}
export default FileUploader;
