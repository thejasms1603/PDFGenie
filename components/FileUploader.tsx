"use client";
import { useState } from "react";
import { FileUpload } from "./ui/file-upload";
import { useDropzone } from "react-dropzone";

const FileUploader = () => {
  const [files, setFiles] = useState<File[]>([]);
  const handleFileUpload = (files: File[]) => {
    setFiles(files);
    console.log(files);
  };
  return (
    <div className='w-full max-w-6xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg'>
      <FileUpload onChange={handleFileUpload} />
    </div>
  );
 
};

export default FileUploader;
