import AWS from "aws-sdk";
import fs from "fs";
import path from "path";

const s3 = new AWS.S3({
  accessKeyId: process.env.MINIO_ROOT_USER || "minio",
  secretAccessKey: process.env.MINIO_ROOT_PASSWORD || "minio123",
  endpoint: "http://minio:9000",
  s3ForcePathStyle: true,
  signatureVersion: "v4",
});

export default async function createBuckets() {
  let customBuckets: string[] = [];
  try {
    const customBucketsFile = fs
      .readFileSync(path.resolve(__dirname, "../../config/buckets.txt"))
      .toString();
    customBuckets = customBucketsFile.split("\n");

    const buckets = await s3.listBuckets().promise();
    const existingBuckets = buckets.Buckets?.map((bucket) => bucket.Name);

    await Promise.all(
      customBuckets.map(async (bucket) => {
        if (!existingBuckets?.includes(bucket)) {
          await s3.createBucket({ Bucket: bucket }).promise();
          console.log(`✅ Bucket '${bucket}' created`);
        } else {
          console.log(`Bucket '${bucket}' already exists.`);
        }
      })
    );
  } catch (err) {
    console.error("No custom buckets.");
  }
}
