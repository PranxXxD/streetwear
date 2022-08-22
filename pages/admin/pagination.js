import { useQuery } from "@tanstack/react-query";
import React from "react";
import Product from "../Models/Product";
import mongoose from "mongoose";

const Pagination = () => {
    const data = { page };

    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getproducts`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    await res.json();
    console.log(res);

  return (
    <div>
      <button onClick={Pagination}>next</button>
    </div>
  );
}
// fetching the data from the mongodb
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  // fetch the single item with the unique slug
  let products = await Product.find({ query: {pages : 1}});
  console.log(context.query.pages)

  return {
    props: { products: JSON.parse(JSON.stringify(products)) }, // will be passed to the page component as props
  };
}

export default Pagination;
