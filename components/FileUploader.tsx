"use client";
import { useState } from "react";
import { FileUpload } from "./ui/file-upload";
import { uploadToS3 } from "@/lib/s3";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const FileUploader = () => {
  const router = useRouter();
  const { mutate } = useMutation({
    mutationFn: async ({
      file_key,
      file_name,
    }: {
      file_key: string;
      file_name: string;
    }) => {
      const response = await axios.post("/api/create-chat", {
        file_key,
        file_name,
      });
      return response.data;
    },
  });
  const [files, setFiles] = useState<File[]>([]);

  const handleFileUpload = async (files: File[]) => {
    setFiles(files);
    console.log(files);

    const file = files[0];
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Please upload a smaller file");
      return;
    }

    try {
      const data = await uploadToS3(file);
      if (!data) {
        toast.error("Something went wrong!");
        return;
      }
      mutate(data, {
        onSuccess: ({ chat_id }) => {
          console.log(data);
          toast.success("File uploaded successfully");
          router.push(`/chat/${chat_id}`);
        },
        onError: (error) => {
          toast.error("File uploading failed");
          console.log(error);
        },
      });
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };
  return (
    <div className='w-full max-w-6xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg'>
      <FileUpload onChange={handleFileUpload} />
    </div>
  );
};

export default FileUploader;
