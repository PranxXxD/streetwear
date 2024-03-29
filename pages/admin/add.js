import React, { useState } from "react";
import FullLayout from "../../src/layouts/FullLayout";
import theme from "../../src/theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import Head from "next/head";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Grid, Stack, TextField, File, Button } from "@mui/material";
import BaseCard from "../../src/components/baseCard/BaseCard";

const Add = () => {
  const [form, setForm] = useState({});

  const handleChange = async (e) => {
    e.preventDefault();
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Fetch API request to add products
  const submitForm = async () => {
    const data = [form];
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addproducts`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    // console.log(data);
    let prdctData = await a.json();
    console.log(prdctData);
    setForm("");
    toast("Product has been added to database", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      type: "success",
    });
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
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <FullLayout>
          <Grid container spacing={0}>
            <Grid item xs={12} lg={12}>
              <BaseCard title="Add a Product">
                <Stack spacing={3}>
                  <TextField
                    value={form.title ? form.title : ""}
                    name="title"
                    label="Title"
                    variant="outlined"
                    onChange={handleChange}
                  />
                  <TextField
                    value={form.slug ? form.slug : ""}
                    name="slug"
                    label="Slug"
                    variant="outlined"
                    onChange={handleChange}
                  />
                  <TextField
                    value={form.category ? form.category : ""}
                    name="category"
                    label="Category"
                    variant="outlined"
                    onChange={handleChange}
                  />
                  <TextField
                    value={form.color ? form.color : ""}
                    name="color"
                    label="Color"
                    variant="outlined"
                    onChange={handleChange}
                  />
                  <TextField
                    value={form.size ? form.size : ""}
                    name="size"
                    label="Size"
                    variant="outlined"
                    onChange={handleChange}
                  />
                  <TextField
                    value={form.price ? form.price : ""}
                    name="price"
                    label="Price"
                    variant="outlined"
                    onChange={handleChange}
                  />
                  <TextField
                    value={form.availableQty ? form.availableQty : ""}
                    name="availableQty"
                    label="AvailableQty"
                    variant="outlined"
                    onChange={handleChange}
                  />
                  <TextField
                    value={form.image ? form.image : ""}
                    typle="file"
                    name="img"
                    variant="outlined"
                    onChange={handleChange}
                  />
                </Stack>
                <br />
                <Button onClick={submitForm} variant="outlined" mt={2}>
                  Submit
                </Button>
              </BaseCard>
            </Grid>
          </Grid>
        </FullLayout>
      </ThemeProvider>
    </>
  );
};

export default Add;
