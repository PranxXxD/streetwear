import React from "react";
import { Autocomplete } from "@mui/material";
import Link from "next/link";
import { FaRupeeSign } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useState } from "react";
import { TextField } from "@mui/material";
import axios from "axios";

const getPrdt = async (str) => {
  try {
    let searchableprdt = str.replace(/,/g, "");
    let url = "http://localhost:3000/api/search?title=" + searchableprdt;

    let { data } = await axios.get(url);
    // console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

const Search = () => {
  const [value, setValue] = useState("");
  const [optionsOne, setOptionsOne] = useState([]);

  const onChangeOne = async (e) => {
    if (e.target.value) {
      let data = await getPrdt(e.target.value);
      setOptionsOne(data);
    }
  };
  return (
    <>
      <div className="absolute right-20 flex justify-start items-center p-3 mx-20 top-1 md:-top-6">
        <Autocomplete
          freeSolo
          filterOptions={(x) => x}
          onChange={(e) => setValue(e.target.innerText)}
          options={optionsOne ? optionsOne.map((obj) => obj.fullName) : []}
          renderInput={(params) => (
            <TextField
              className="absolute flex w-[420%]"
              color="secondary"
              type="text"
              placeholder="Search"
              {...params}
              label="Search"
              onChange={(e) => onChangeOne(e)}
            />
          )}
        />
        <svg
          className="absolute left-16 z-5 cursor-pointer top-7 mx-4"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17Z"
            stroke="#4B5563"
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 21L15 15"
            stroke="#4B5563"
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {value}
      {/* <Link key={item._id} href={`/products/${products[item].slug}`}>
        <div className="lg:w-1/4 md:w-1/2 p-4 w-full cursor-pointer shadow-lg rounded-3xl m-2 md:m-2">
          <span className="bg-[#e75555] text-white text-md rounded-sm p-1 -m-4">
            40% off
          </span>
          <a className="block relative rounded overflow-hidden">
            <img
              alt="ecommerce"
              className="h-[26vh] md:h-[26vh] block m-auto"
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
            <div className="items-center text-red-350 justify-center first:text-red-350 hover:text-[#e75555] p-2 cursor-pointer flex">
              <AiOutlineShoppingCart className="flex md:ml-6 mr-2 focus:outline-none text-md md:text-2xl" />
              <h3 className="text-md font-semibold pr-2">ADD TO CART</h3>
            </div>
          </div>
        </div>
      </Link> */}
    </>
  );
};

export default Search;
