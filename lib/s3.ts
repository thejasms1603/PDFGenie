import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY!,
  },
});

export const uploadToS3 = async (file: File) => {
  try {
    const file_key = `upload/${Date.now().toString()}-${file.name.replace(
      /\s/g,
      "-"
    )}`;
    const params = {
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
      Key: file_key,
      Body: new Uint8Array(await file.arrayBuffer()),
      ContentType: file.type,
    };

    await s3Client.send(new PutObjectCommand(params));
    console.log("Successfully uploaded to S3:", file_key);

    return {
      file_key,
      file_name: file.name,
    };
  } catch (error) {
    console.error("Failed to upload document", error);
    return null;
  }
};

export const getS3Url = (file_key: string) => {
  const url = `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.us-east-1.amazonaws.com/${file_key}`;
  return url;
};
