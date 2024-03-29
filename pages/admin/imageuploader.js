import React, { useState } from "react";
import FullLayout from "../../src/layouts/FullLayout";
import theme from "../../src/theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import Head from "next/head";
import {
  Grid,
  TextField,
  ImageList,
  ImageListItem,
  Button,
} from "@mui/material";
import BaseCard from "../../src/components/baseCard/BaseCard";
import Product from "../../models/Product";
import mongoose from "mongoose";
import "primereact/resources/themes/lara-light-teal/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import axios from "axios";

const Bucket_Url = " https://streetwearbucket.s3.ap-south-1.amazonaws.com";

// adding an image to database and showing in dashboard -> pending
const ImageUploader = ({ products }) => {
  const [file, setFile] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(null);
  const [uploadingStatus, setUploadingStatus] = useState();

  const selectFile = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
  };

  const uploadFile = async () => {
    // For UX info
    setUploadingStatus("Uploading file to AWS S3");

    // Making a POST req to create earlier API route
    let { data } = await axios.post("/api/awsintegration", {
      name: file.name,
      type: file.type,
    });
    console.log(data);
    //fetching out an url
    const url = data.url;
    //uploading a file
    await axios.put(url, file, {
      headers: {
        "Content-type": file.type,
        "Access-Control-Allow-Origin": "*",
      },
    });
    setFileUploaded(Bucket_Url + file.name);
    setFile(null);
  };
  return (
    <>
      <Head>
        <title>streetWear.com:admin</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        <style jsx global>{`
          footer {
            display: none;
          }
        `}</style>
        <FullLayout>
          <Grid container spacing={0}>
            <Grid item xs={12} lg={12}>
              <BaseCard title="Upload an Image">
                <div className="flex items-center">
                  <label className="block">
                    <span className="sr-only">Choose profile photo</span>
                    <input
                      type="file"
                      className="block w-full text-sm text-slate-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                                  file:bg-[#def2f6fb] file:text-[#4bd9f6fb]
                                   hover:file:bg-[#c5eef6fb] cursor-pointer"
                      onChange={(e) => {
                        selectFile(e);
                      }}
                      name="image"
                    />
                  </label>
                  {file && (
                    <>
                      {/* <p>Selected file: {file.name}</p> */}
                      <Button
                        onClick={uploadFile}
                        className="flex"
                        variant="outlined"
                        mt={2}
                      >
                        Submit
                      </Button>
                    </>
                  )}
                </div>

                {uploadingStatus && <p>{uploadingStatus}</p>}
                {fileUploaded && <img src={fileUploaded} />}

                <ImageList
                  sx={{ height: 400 }}
                  variant="quilted"
                  cols={4}
                  rowHeight={500}
                >
                  {products.map((product) => {
                    return (
                      <img
                        key={product._id}
                        alt="ecommerce"
                        className="h-[30vh] md:h-[36vh] block m-auto p-4 row-auto col-auto"
                        src={product.img}
                      />
                    );
                  })}
                </ImageList>
              </BaseCard>
            </Grid>
          </Grid>
        </FullLayout>
      </ThemeProvider>
    </>
  );
};

export async function getServerSideProps(context) {
  let error = null;

  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let products = await Product.find();
  // console.log(products);
  return {
    props: { products: JSON.parse(JSON.stringify(products)) }, // will be passed to the page component as props
  };
}

export default ImageUploader;
