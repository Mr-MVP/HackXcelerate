// import React, { useState, useCallback } from "react";
// import { FileWithPath, useDropzone } from "react-dropzone";
// import { Button } from "../ui/button";

// type FileUploaderProps = {
//   fieldChange: (FILES: File[]) => void;
//   mediaUrl: string;
// };

// const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
//   const [file, setFile] = useState<File[]>([]);
//   const [fileUrl, setFileUrl] = useState("");
//   const onDrop = useCallback(
//     (acceptedFiles: FileWithPath[]) => {
//       setFile(acceptedFiles);
//       fieldChange(acceptedFiles);
//       setFileUrl(URL.createObjectURL(acceptedFiles[0]));
//     },
//     [file]
//   );
//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop,
//     accept: {
//       "image/*": [".png", ".jpeg", ".jpg", ".svg"],
//     },
//   });

//   return (
//     <div
//       {...getRootProps()}
//       className="flex flex-center flex-col bg-dark-3 rounded-x1 cursor-pointer"
//     >
//       <input {...getInputProps()} className="cursor-pointer" />
//       {fileUrl ? (
//         <>
//           <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
//             <img src={fileUrl} alt="image" className="file_uploader-img" />
//           </div>
//           <p className="file_uploader-label">Click or Drag photo to replace</p>
//         </>
//       ) : (
//         <div className="file_uploader-box">
//           <img
//             src="src/assets/icons/add-post.svg"
//             width={96}
//             height={77}
//             alt="add"
//           />
//           <h3 className="base-medium text-light-2 mb-2 mt-6">
//             Drag Photo Here
//           </h3>
//           <p className="text-light-4 small-regular mb-6">SVG, PNG, JPG</p>
//           <Button className="shad-button_dark_4">Select from computer</Button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FileUploader;

import React, { useState, useCallback } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { Button } from "../ui/button";

type FileUploaderProps = {
  fieldChange: (file: File) => void; // Change the argument type of fieldChange function
  mediaUrl: string;
};

const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
  const [file, setFile] = useState<File | null>(null); // Change file state type to File | null
  const [fileUrl, setFileUrl] = useState<string | null>(null); // Change fileUrl state type to string | null

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      console.log(acceptedFiles);
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
      const uploadedFile = acceptedFiles[0]; // Get the first file from acceptedFiles array
      setFile(uploadedFile);
      fieldChange(uploadedFile); // Call fieldChange function with the uploaded file
      setFileUrl(URL.createObjectURL(uploadedFile));
    },
    [fieldChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg", ".svg"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="flex flex-center flex-col bg-dark-3 rounded-x1 cursor-pointer"
    >
      <input {...getInputProps()} className="cursor-pointer" />
      {fileUrl ? (
        <>
          <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
            <img src={fileUrl} alt="image" className="file_uploader-img" />
          </div>
          <p className="file_uploader-label">Click or Drag photo to replace</p>
        </>
      ) : (
        <div className="file_uploader-box">
          <img
            src="src/assets/icons/add-post.svg"
            width={96}
            height={77}
            alt="add"
          />
          <h3 className="base-medium text-light-2 mb-2 mt-6">
            Drag Photo Here
          </h3>
          <p className="text-light-4 small-regular mb-6">SVG, PNG, JPG</p>
          <Button className="shad-button_dark_4">Select from computer</Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
