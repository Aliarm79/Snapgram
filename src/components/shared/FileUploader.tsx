import { useCallback, useState } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";

interface FileUploaderProps {
  fieldChnage: (FILES: File[]) => void;
  mediaUrl: string;
  userImg?: boolean;
}

function FileUploader({ fieldChnage, mediaUrl, userImg }: FileUploaderProps) {
  const [fileUrl, setFileUrl] = useState(mediaUrl);
  const [file, setFile] = useState<File[]>([]);
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      fieldChnage(acceptedFiles);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
      console.log(URL.createObjectURL(acceptedFiles[0]));
    },
    [file]
  );
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg", ".svg"],
    },
  });

  return (
    <div
      {...getRootProps()} 
      className={`cursor-pointer flex-center flex-col bg-dark-3 ${
        userImg ? "rounded-full" : " rounded-xl"
      }`}
    >
      <input {...getInputProps()} id="file"/>
      {fileUrl ? (
        <div
          className={`flex  justify-center   ${
            userImg ? "p-0 " : " p-5 lg:p-10"
          }`}
        >
          <img
            src={fileUrl}
            alt="image"
            className={`${
              userImg ? "file_uploader-img-user" : "file_uploader-img"
            }`}
          />
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
