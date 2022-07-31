import S3 from "aws-sdk/clients/s3";

//  * PROFILE IMAGE STORING STARTS

const s3 = new S3({
  region: "ap-south-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY_ID,
  signatureVersion: "v4",
});

export const config = {
  api: {
    bodyParse: false,
  },
};

export default async function handler(req, res) {
  if (req.method != "POST") {
    return res.status(500).json({ error: "Error" });
  }
  try {
    //retreiving name and type from body of the request
    let { name, type } = req.body;
    const fileParams = {
      Bucket: process.env.AWS_BUCKET,
      Key: name,
      Expires: 600,
      ContentType: type,
      ACL: "public-read",
    };

    //generating a signed ul which we used to upload a file
    const url = await s3.getSignedUrlPromise("putObject", fileParams);
    return res.status(200).json({ url });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Error uploading file" });
  }
}
