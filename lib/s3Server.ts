import AWS from "aws-sdk";
import fs from "fs";
import path from "path";

export async function downloadFromS3(file_key: string) {
  try {
    if (
      !process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID ||
      !process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY ||
      !process.env.NEXT_PUBLIC_S3_BUCKET_NAME
    ) {
      throw new Error("Missing AWS S3 environment variables.");
    }

    AWS.config.update({
      accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY,
    });

    const s3 = new AWS.S3({
      region: "us-east-1",
    });

    const params = {
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
      Key: file_key,
    };

    const obj = await s3.getObject(params).promise();

    if (!obj.Body) {
      throw new Error("No file data received from S3.");
    }

    const file_name = path.join("/tmp", `pdf-${Date.now()}.pdf`);
    fs.writeFileSync(file_name, obj.Body as Buffer);

    return file_name;
  } catch (error) {
    console.error("Error downloading from S3:", error);
    throw error;
  }
}
