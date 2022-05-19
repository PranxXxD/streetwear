import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import Product from "../../models/Product";
import mongoose from "mongoose";

const Post = ({ buyNow, addToCart, product, variant }) => {
  // console.log(product, variant);
  const router = useRouter();
  const { slug } = router.query;
  const [pin, setPin] = useState();
  const [service, setService] = useState();

  // code for checking the pincode using fetch api
  const checkServiceAbility = async () => {
    let pins = await fetch("http://localhost:3000/api/pincode");
    let pinJson = await pins.json();
    // console.log(pinJson, pin);

    if (pinJson.includes(parseInt(pin))) {
      setService(true);
    } else {
      setService(false);
    }
  };

  // change the state of the input while user is typing
  const onChangepin = (e) => {
    setPin(e.target.value);
  };

  const [color, setColor] = useState(product.color);
  const [size, setSize] = useState(product.size);

  const refreshvariant = (newcolor, newsize) => {
    let url = `http://localhost:3000/products/${variant[newsize][newcolor]["slug"]}`;
    window.location = url;
  };

  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-14 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto px-24 md:px-36 object-cover object-top rounded"
              src={product.img}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                BRAND NAME
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {product.title} - {product.size}/{product.color}
              </h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-red-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-red-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-red-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-red-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-red-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <span className="text-gray-600 ml-3">4 Reviews</span>
                </span>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                  <a className="text-blue-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                  <a className="text-blue-300">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </a>
                  <a className="text-green-400">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </a>
                </span>
              </div>
              <p className="leading-relaxed">{product.desc}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex">
                  <span className="mr-3">Color</span>

                  {Object.keys(variant).includes("black") &&
                    Object.keys(variant["black"]).includes(size) && (
                      <button
                        onClick={() => {
                          refreshvariant(size, "black");
                        }}
                        className={`border-2 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none ${
                          color === "black" ? "border-gray-600" : "border-white"
                        }`}
                      ></button>
                    )}
                  {Object.keys(variant).includes("green") &&
                    Object.keys(variant["green"]).includes(size) && (
                      <button
                        onClick={() => {
                          refreshvariant(size, "green");
                        }}
                        className={`border-2 ml-1 bg-green-800 rounded-full w-6 h-6 focus:outline-none ${
                          color === "green" ? "border-black" : "border-gray-600"
                        }`}
                      ></button>
                    )}
                  {Object.keys(variant).includes("red") &&
                    Object.keys(variant["red"]).includes(size) && (
                      <button
                        onClick={() => {
                          refreshvariant(size, "red");
                        }}
                        className={`border-2 ml-1 bg-red-600 rounded-full w-6 h-6 focus:outline-none ${
                          color === "red" ? "border-black" : "border-gray-600"
                        }`}
                      ></button>
                    )}
                  {Object.keys(variant).includes("blue") &&
                    Object.keys(variant["blue"]).includes(size) && (
                      <button
                        onClick={() => {
                          refreshvariant(size, "blue");
                        }}
                        className={`border-2 ml-1 bg-blue-400 rounded-full w-6 h-6 focus:outline-none ${
                          color === "blue" ? "border-black" : "border-gray-600"
                        }`}
                      ></button>
                    )}
                  {Object.keys(variant).includes("pink") &&
                    Object.keys(variant["pink"]).includes(size) && (
                      <button
                        onClick={() => {
                          refreshvariant(size, "pink");
                        }}
                        className={`border-2 ml-1 bg-pink-500 rounded-full w-6 h-6 focus:outline-none ${
                          color === "pink" ? "border-black" : "border-gray-600"
                        }`}
                      ></button>
                    )}
                  {Object.keys(variant).includes("violet") &&
                    Object.keys(variant["violet"]).includes(size) && (
                      <button
                        onClick={() => {
                          refreshvariant(size, "violet");
                        }}
                        className={`border-2 ml-1 bg-violet-400 rounded-full w-6 h-6 focus:outline-none ${
                          color === "violet"
                            ? "border-black"
                            : "border-gray-600"
                        }`}
                      ></button>
                    )}
                  {/* Size component */}
                </div>
                <div className="flex ml-6 items-center">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    <select
                      value={size}
                      onChange={(e) => {
                        refreshvariant(e.target.value, color);
                      }}
                      className="rounded border appearance-none border-gray-600 py-2 focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 text-base pl-3 pr-10"
                    >
                      {Object.keys(variant[color]).includes("S") && (
                        <option value={"S"}>S</option>
                      )}
                      {Object.keys(variant[color]).includes("M") && (
                        <option value={"M"}>M</option>
                      )}
                      {Object.keys(variant[color]).includes("L") && (
                        <option value={"L"}>L</option>
                      )}
                      {Object.keys(variant[color]).includes("XL") && (
                        <option value={"XL"}>XL</option>
                      )}
                      {Object.keys(variant[color]).includes("XXL") && (
                        <option value={"XXL"}>XXL</option>
                      )}
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">
                  499.00
                </span>
                <button
                  onClick={() => {
                    buyNow(slug, 1, 499, product.title, size, color);
                  }}
                  className="flex ml-16 md:ml-8 text-white bg-red-400 border-0 py-2 px-4 focus:outline-none hover:bg-red-500 rounded"
                >
                  Buy Now
                </button>
                {/*Added the item to the cart when user tap the add to cart button */}
                <button
                  onClick={() =>
                    addToCart(slug, 1, 499, product.title, size, color)
                  }
                  className="flex md:ml-8 text-white bg-red-400 border-0 py-2 px-4 focus:outline-none hover:bg-red-500 rounded"
                >
                  Add to Cart
                </button>
                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-600 ml-4 hover:text-red-600">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>
              </div>
              <div className="flex space-x-2 mt-6 text-sm">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className=" bg-white rounded border border-gray-600 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-2 leading-8 transition-colors duration-200 ease-in-out"
                  onChange={onChangepin}
                  placeholder="Enter your Pincode"
                />

                <button
                  onClick={checkServiceAbility}
                  className="flex text-white bg-red-400 border-0 py-2 px-4 focus:outline-none hover:bg-red-500 rounded"
                >
                  Check Pincode
                </button>
              </div>
              {service && service != null && (
                <div className="flex mt-3 text-green-500 text-sm">
                  Yay! service is Availabe
                </div>
              )}
              {!service && service != null && (
                <div className="flex mt-3 text-red-700 text-sm">
                  Sorry! service is not Available to this pincode
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// fetching the data from the mongodb
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  // fetch the single item with the unique slug
  let product = await Product.findOne({ slug: context.query.slug });
  // find the variant with the item title
  let variant = await Product.find({ title: product.title });
  let colorSizeSlug = {}; //{red : { XL : { slug : 'Wear-the-street-premium-collection'}}}
  // iterate through the items and display the item is the particular color & size is availabe in db
  for (let item of variant) {
    if (Object.keys(colorSizeSlug).includes(item.color)) {
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    }
    // add the non-existing item to the existing list
    else {
      colorSizeSlug[item.color] = {};
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    }
  }

  return {
    props: {
      product: JSON.parse(JSON.stringify(products)),
      variant: JSON.parse(JSON.stringify(colorSizeSlug)),
    }, // will be passed to the page component as props
  };
}

export default Post;
