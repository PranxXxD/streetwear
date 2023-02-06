import React from "react";
import mongoose from "mongoose";
import Product from "../models/Product";
import Link from "next/link";
import { FaRupeeSign } from "react-icons/fa";


const LatestCollection = ({products}) => {
  return (
    <div>
      {/* Latest Collection */}
      <div className="item-center justify-center text-center">
        <span className="before:block before:absolute before:-inset-2 before:-skew-y-3 before:bg-red-400 relative inline-block m-2 shadow-lg">
          <h2 className="relative text-white text-3xl text-center">
            Latest Collection!
          </h2>
        </span>
      </div>
     
      <div className="flex flex-wrap -m-4 justify-center mx-5 p-6">
        { Object.keys(products).map((item) => {
          return (
            <Link key={item._id} href={`/products/${products[item].slug}`}>
              <div
                className="lg:w-1/4 md:w-1/2 p-2 md:p-4 w-full cursor-pointer shadow-lg rounded-3xl m-4 md:m-4 transition duration-100 ease-in-out hover:transforms
                hover:-translate-y-1 hover:scale-110"
              >
                <a className="block relative rounded overflow-hidden">
                  <img
                    alt="ecommerce"
                    className="h-[30vh] md:h-[36vh] block m-auto"
                    src={products[item].img}
                  />
                </a>
                <div className="mt-4 text-center">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                    {products[item].category}
                  </h3>
                  <h2
                    className="text-gray-900 title-font font-semibold
                    "
                  >
                    {products[item].title}
                  </h2>
                  <p className="mt-1 flex justify-center font-bold">
                    <a>
                      <FaRupeeSign className="text-md mt-1 px-1" />
                    </a>
                    {products[item].price}
                  </p>

                  <div className="text-sm my-1">
                    {products[item].color.includes("black") && (
                      <button className="border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button>
                    )}
                    {products[item].color.includes("green") && (
                      <button className="border-2 border-gray-300 ml-1 bg-green-800 rounded-full w-6 h-6 focus:outline-none"></button>
                    )}{" "}
                    {products[item].color.includes("red") && (
                      <button className="border-2 border-gray-300 ml-1 bg-red-800 rounded-full w-6 h-6 focus:outline-none"></button>
                    )}{" "}
                    {products[item].color.includes("blue") && (
                      <button className="border-2 border-gray-300 ml-1 bg-blue-400 rounded-full w-6 h-6 focus:outline-none"></button>
                    )}{" "}
                    {products[item].color.includes("pink") && (
                      <button className="border-2 border-gray-300 ml-1 bg-pink-400 rounded-full w-6 h-6 focus:outline-none"></button>
                    )}{" "}
                    {products[item].color.includes("violet") && (
                      <button className="border-2 border-gray-300 ml-1 bg-violet-500 rounded-full w-6 h-6 focus:outline-none"></button>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

// fetching the data from the mongodb
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let products = await Product.find({ category: "shirts" });
  // console.log(products);
  // tshirt is an object
  let shirts = {};
  // looping through the product array
  for (let item of products) {
    //push the new item color & size in the shirts array if it is not available
    // taking title as a key and shirts as a value
    if (item.title in shirts) {
      if (
        !shirts[item.title].color.includes(item.color) &&
        item.availableQty > 0
      ) {
        shirts[item.title].color.push(item.color);
      }
      if (
        !shirts[item.title].size.includes(item.size) &&
        item.availableQty > 0
      ) {
        shirts[item.title].size.push(item.size);
      }
    }
    // display the tshirt if the color & size is availabel
    else {
      shirts[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        shirts[item.title].color = [item.color];
        shirts[item.title].size = [item.size];
      }
    }
  }
  return {
    props: {
      // products: JSON.parse(JSON.stringify(products)),
      products: JSON.parse(JSON.stringify(shirts)),
    }, // will be passed to the page component as props
  };
}

export default LatestCollection;
