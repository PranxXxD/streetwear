// const handleImageUpload = async () => {
//   // const [imagePublicId, setImagePublicId] = useState("");
//   const { files } = document.querySelector('input[type="file"]');
//   const imageFile = document.querySelector('input[type="file"]');
//   const filesa = imageFile.files;
//   console.log("Image file", filesa[0]);
//   const imageData = new ImageData();
//   imageData.append("file", files[0]);
//   // replace this with your upload preset name
//   imageData.append("streetWear", "pranxxxd");
//   let a = await fetch(
//     "https://api.Cloudinary.com/v1_1/pranxxxd/image/upload",
//     {
//       method: "POST", // or 'PUT'
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(imageData),
//     }
//   );
//   let image = await a.json();
//   console.log(image);
//   setimageUrl(image.secure_url);
//   setimageAlt(`An image of ${image.original_filename}`);
// };
