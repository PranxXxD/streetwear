import React from "react";
import Link from "next/link";
import Product from "../models/Product";
import mongoose from "mongoose";
import { FaRupeeSign } from "react-icons/fa";

const hoodies = ({ products }) => {
  // console.log(products);
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto my-auto ">
          <div className="flex flex-wrap -m-4 justify-center ">
            {/* rendering the products using map method */}
            {/* products is an object so need to use OBject.keys method to display  */}
            {Object.keys(products).length === 0 && (
              <p>Sorry, hoodies are out of stock, new stock coming soon!</p>
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
                        <FaRupeeSign className="text-md mt-1 px-1" />
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
    </div>
  );
};

// fetching the data from the mongodb
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let products = await Product.find({ category: "hoodie" });
  // console.log(products);
  // tshirt is an object
  let hoodies = {};
  // looping through the product array
  for (let item of products) {
    //push the new item color & size in thsirts array if it is not available
    // taking title as a key and hoodies as a value
    if (item.title in hoodies) {
      if (
        !hoodies[item.title].color.includes(item.color) &&
        item.availableQty > 0
      ) {
        hoodies[item.title].color.push(item.color);
      }
      if (
        !hoodies[item.title].size.includes(item.size) &&
        item.availableQty > 0
      ) {
        hoodies[item.title].size.push(item.size);
      }
    }
    // display the tshirt if the color & size is availabel
    else {
      hoodies[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        hoodies[item.title].color = [item.color];
        hoodies[item.title].size = [item.size];
      }
    }
  }
  return {
    props: {
      // products: JSON.parse(JSON.stringify(products)),
      products: JSON.parse(JSON.stringify(hoodies)),
    }, // will be passed to the page component as props
  };
}

export default hoodies;
