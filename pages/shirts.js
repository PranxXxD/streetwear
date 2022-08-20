import React from "react";
import Link from "next/link";
import Product from "../models/Product";
import mongoose from "mongoose";
import { FaRupeeSign } from "react-icons/fa";
import Image from "next/image";
import outofstock from "../images/outofstock.jpg";
import Head from "next/head";
import Content from "../components/content";

const shirts = ({ products }) => {
  // console.log(products);
  return (
    <div>
      <Head>
        <title>streetWear.com</title>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
        />
      </Head>
      <section className="text-gray-600 body-font min-h-screen">
        <div className="container px-5 py-24 mx-auto my-auto ">
          <div className="flex flex-wrap -m-4 justify-center mx-5">
            {/* rendering the products using map method */}
            {/* products is an object so need to use OBject.keys method to display  */}
            {Object.keys(products).length === 0 && (
              <>
                <section className="text-gray-600 body-font">
                  <div className="container mx-auto flex md:flex-row flex-col items-center">
                    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 md:mb-0">
                      <Image
                        className="object-cover object-center rounded"
                        width={300}
                        height={300}
                        src={outofstock}
                      />
                    </div>
                    <div className="lg:flex-grow md:w-1/2  flex flex-col md:items-start md:text-left items-center text-center">
                      <h2 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                        Sorry, Shirts are out of stock,
                        <br className="hidden lg:inline-block" />
                        new stock coming soon!
                      </h2>

                      <div className="flex justify-center">
                        <button className="inline-flex text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg">
                          Get Notify
                        </button>
                      </div>
                    </div>
                  </div>
                </section>
              </>
            )}
            {Object.keys(products).map((item) => {
              return (
                <Link key={item._id} href={`/products/${products[item].slug}`}>
                  <div className="lg:w-1/4 md:w-1/2 p-4 w-full cursor-pointer shadow-lg rounded-3xl m-2 md:m-2">
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
                        className="text-gray-900 title-font text-sm
                        font-medium"
                      >
                        {products[item].title}
                      </h2>
                      <p className="mt-1 flex justify-center">
                        <a>
                          <FaRupeeSign className="text-md mt-1 px-1" />
                        </a>
                        {products[item].price}
                      </p>
                      <div className="text-sm mt-1">
                        {products[item].size.includes("S") && (
                          <span className="border border-gray-300 mx-1 px-1">
                            S
                          </span>
                        )}
                        {products[item].size.includes("M") && (
                          <span className="border border-gray-300 mx-1 px-1">
                            M
                          </span>
                        )}
                        {products[item].size.includes("L") && (
                          <span className="border border-gray-300 mx-1 px-1">
                            L
                          </span>
                        )}
                        {products[item].size.includes("XL") && (
                          <span className="border border-gray-300 mx-1 px-1">
                            XL
                          </span>
                        )}
                        {products[item].size.includes("XXL") && (
                          <span className="border border-gray-300 mx-1 px-1">
                            XXL
                          </span>
                        )}
                      </div>
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
      </section>
      <Content />
    </div>
  );
};

// fetching the data from the mongodb
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let products = await Product.find({ category: "shirt" });
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

export default shirts;
