import fs from "fs";
import AWS from "aws-sdk";
import formidable from "formidable";

//  * PROFILE IMAGE STORING STARTS

const s3 = new AWS.S3({
  endpoint: `${process.env.AWS_ENDPOINT}`,
  region: "api.ap-south-1",
  credentials: {
    accessKeyId: `${process.env.AWS_ACCESS_KEY_ID}`,
    secretAccessKey: `${process.env.SECRET_ACCESS_KEY_ID}`,
  },
});

export const config = {
  api: {
    bodyParse: false,
  },
};

export default async function handler(req, res) {
  const form = formidable();
  form.parse(req, async (err, fields, files) => {
    if (!files.image) {
      res.status(400).send("No file Uploaded");
      return;
    }
    try {
      return s3.putObject(
        {
          Bucket: `${process.env.AWS_BUCKET}`,
          Key: files.image.originalname,
          Body: fs.createReadStream(files.image.filepath),
          ACL: "public-read",
        },
        async () => {
          return res.status(200).send("file uploaded");
        }
      );
    } catch (err) {
      console.log(err);
      return res.status(500).send("Error uploading file");
    }
  });
}

// * Single Upload

// const ImgUpload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: "streetwearbucket",
//     acl: "public-read",
//     key: function (req, file, cb) {
//       cb(
//         null,
//         path.basename(file.originalname, path.extname(file.originalname)) +
//           "-" +
//           Date.now() +
//           path.extname(file.originalname)
//       );
//     },
//   }),
//   limits: { fileSize: 3000000 }, // In bytes: 2000000 bytes = 2 MB
//   fileFilter: function (req, file, cb) {
//     checkFileType(file, cb);
//   },
// });

// * Check File Type
//  * @param file
//  * @param cb
//  * @return {*}
//  */
// function checkFileType(files, cb) {
//   // Allowed ext
//   const filetypes = /jpeg|jpg|png|gif/;
//   // Check ext
//   const extname = filetypes.test(
//     path.extname(files.image.originalname).toLowerCase()
//   );
//   // Check mime
//   const mimetype = filetypes.test(file.mimetype);
//   if (mimetype && extname) {
//     return cb(null, true);
//   } else {
//     cb("Error: Images Only!");
//   }
// }

// * @route POST api/profile/business-img-upload
//  * @desc Upload post image
//  * @access public
//  */
