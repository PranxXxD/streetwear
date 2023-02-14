import Head from "next/head";
import Image from "next/image";
import mongoose from "mongoose";
import Product from "../models/Product";
import Link from "next/link";
import { FaRupeeSign } from "react-icons/fa";
import Content from "../components/content";
import React, { useState } from "react";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import hoodiesbanner from "../images/hoodiesbanner.png";
import tshirtbanner from "../images/tshirtbanner.png";
// import slider from "../images/musician.jpg";

const Home = ({ products }) => {
  // console.log(products);
  return (
    <div>
      <Head>
        <title>streetWear.com</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <style>
          {`
                    .gallery-cell {
                        height: 386px;
                        padding-right:15px;
                    }
                    @media (min-width: 300px) and (max-width: 420px) {
                        .gallery-cell {
                            height: 286px !important;
                            
                        }
                    }
                    
                    @media (max-width: 640px) {
                        .gallery-cell {
                            padding-right:0;
                        }
                    }

                    .carousel__sliderLarge {
                        padding-left: 20%;
                        padding-right: 20%;
                    }

                    /* gives us the illusion of spaces between the slides */
                    .carousel__inner-slideLarge {
                        width: calc(100% - 20px);
                        height: calc(100% - 20px);
                        left: 10px;
                        top: 10px;
                        
                    }
                `}
        </style>
      </Head>
      <div className="container mx-auto py-9 md:py-12 px-4 md:px-6">
        <div className="flex items-strech justify-center flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 lg:space-x-8">
          <div className="flex flex-col md:flex-row items-strech justify-between bg-gray-50 py-6 px-6 md:py-12 lg:px-12 md:w-8/12 lg:w-7/12 xl:w-8/12 2xl:w-9/12 rounded-2xl">
            <div className="flex flex-col justify-center md:w-1/2 ">
              <h1 className="">
                <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-red-400 relative inline-block m-2 shadow-lg">
                  <span className="relative text-white text-3xl">
                    Best Deal
                  </span>
                </span>
              </h1>
              <p className="text-base lg:text-xl text-gray-800 mt-1">
                Save upto <span className="font-bold">50%</span>
              </p>
              <span className="text-gray-500">
                “All streetwear tshirts&Shirts”
              </span>
            </div>
            <div className="md:w-1/1 mt-8 md:mt-0 flex justify-center md:justify-end">
              <div>
                <img
                  src="https://cdn.pixabay.com/photo/2017/06/20/01/35/men-2421449__340.png"
                  alt=""
                />
              </div>
              <div>
                <img
                  src="https://cdn.pixabay.com/photo/2017/06/27/09/17/keywords-2446791__340.png"
                  alt=""
                />
              </div>
              <div>
                <img
                  src="https://cdn.pixabay.com/photo/2016/06/02/16/03/freedom-1431380__340.png"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="md:w-4/12 lg:w-5/12 xl:w-4/12 2xl:w-3/12 bg-gray-50 py-6 px-6 md:py-0 md:px-4 lg:px-6 flex flex-col justify-center relative rounded-2xl">
            <div className="flex flex-col justify-center">
              <h1 className="">
                <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-red-400 relative inline-block m-2 shadow-lg">
                  <span className="relative text-white text-3xl">
                    Grab a Deal
                  </span>
                </span>
              </h1>
              <p className="text-base lg:text-xl text-gray-800 m-1">
                Save Upto <span className="font-bold">30%</span>
              </p>
              <span className="text-gray-500 text-sm">
                “All streetwear hoodies”
              </span>
            </div>
            <div className="flex justify-end md:relative md:bottom-4 md:right-4 lg:bottom-0 lg:right-0">
              {/* <img
                src="https://i.ibb.co/rGfP7mp/Rectangle-59-1.png"
                alt=""
                className="md:w-20 md:h-20 lg:w-full lg:h-full"
              /> */}
              <img
                src="https://cdn.pixabay.com/photo/2015/03/01/21/44/bart-655318__340.png"
                alt=""
                className="md:w-20 md:h-20 lg:w-full lg:h-full mb-8"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Slider  */}
      <div className="2xl:mx-auto 2xl:container flex justify-center rounded-xl">
        <div className="2xl:px-20 px-6 py-12 w-full lg:w-4/5">
          {/* Carousel for Small-Sized Screen */}
          <CarouselProvider
            className="relative block sm:hidden"
            naturalSlideWidth={100}
            isIntrinsicHeight={true}
            totalSlides={3}
            visibleSlides={1}
            step={1}
            infinite={true}
          >
            <div className="js-flickity flex justify-center items-center">
              <ButtonBack
                role="button"
                aria-label="slide backward"
                className="w-12 h-12 md:w-14 md:h-14 rounded-full flex justify-center items-center bg-white border border-gray-300 hover:bg-gray-400 absolute z-30 left-0 ml-8 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 cursor-pointer"
                id="prev"
              >
                <svg
                  width={8}
                  height={14}
                  viewBox="0 0 8 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 1L1 7L7 13"
                    stroke="black"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </ButtonBack>
              <Slider>
                <Slide index={0}>
                  <div className="gallery-cell lg:mr-7 mr-6 lg:w-1/2 sm:w-96 w-full h-full">
                    <div className="relative w-full h-full lg:block hidden">
                      <img
                        src="https://spy.com/wp-content/uploads/2020/08/dfvdfgt.jpg?w=910&h=569&crop=1"
                        alt="sitting area"
                        className="object-center object-cover w-full h-full"
                      />
                      <div className="pl-6 pb-6 lg:pl-8 lg:pb-8 absolute left-0 bottom-0">
                        <h1 className="text-xl leading-5 lg:text-2xl lg:leading-normal font-medium text-white">
                          Lounge Interior
                        </h1>
                      </div>
                    </div>
                    <div className="relative w-full h-full lg:hidden">
                      <img
                        src="https://spy.com/wp-content/uploads/2020/08/dfvdfgt.jpg?w=910&h=569&crop=1"
                        alt="sitting area"
                        className="object-center object-cover w-full h-full"
                      />
                      
                    </div>
                  </div>
                </Slide>
                <Slide index={1}>
                  <div className="gallery-cell lg:mr-7 mr-6 lg:w-1/2 sm:w-96 w-full h-full">
                    <div className="relative w-full h-full lg:block hidden`">
                      <Image
                        src={hoodiesbanner}
                        alt=""
                        className="object-center object-cover w-full h-full"
                      />
                        <Image
                        src={tshirtbanner}
                        alt=""
                        className="object-center object-cover w-full h-full"
                      />
                    
                    </div>
                    <div className="relative w-full h-full lg:hidden">
                    <Image
                        src={hoodiesbanner}
                        alt=""
                        className="object-center object-cover w-full h-full"
                      />
                        <Image
                        src={tshirtbanner}
                        alt=""
                        className="object-center object-cover w-full h-full"
                      />
                     
                    </div>
                  </div>
                </Slide>
                <Slide index={2}>
                  <div className="gallery-cell lg:mr-7 mr-6 lg:w-1/2 sm:w-96 w-full h-full">
                    <div className="relative w-full h-full lg:block hidden">
                      <img
                        src="https://www.creativefabrica.com/wp-content/uploads/2021/09/19/Streetwear-TShirt-Design-Graphics-17527427-1-1-580x387.jpg"
                        alt="chair"
                        className="object-center object-cover w-full h-full"
                      />
                      <div className="pl-6 pb-6 lg:pl-8 lg:pb-8 absolute left-0 bottom-0">
                        <h1 className="text-xl leading-5 lg:text-2xl lg:leading-normal font-medium text-white">
                          Lounge Interior
                        </h1>
                      </div>
                    </div>
                    <div className="relative w-full h-full lg:hidden">
                      <img
                        src="https://www.creativefabrica.com/wp-content/uploads/2021/09/19/Streetwear-TShirt-Design-Graphics-17527427-1-1-580x387.jpg"
                        alt="chair"
                        className="object-center object-cover w-full h-full"
                      />
                      
                    </div>
                  </div>
                </Slide>
              </Slider>
              <ButtonNext
                role="button"
                aria-label="slide forward"
                className="w-12 h-12 md:w-14 md:h-14 rounded-full flex justify-center items-center bg-white border border-gray-300 hover:bg-gray-400 absolute z-30 right-0 mr-8 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
                id="next"
              >
                <svg
                  width={8}
                  height={14}
                  viewBox="0 0 8 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1L7 7L1 13"
                    stroke="black"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </ButtonNext>
            </div>
          </CarouselProvider>

          {/* Carousel for Medium and Large-Sized Screen */}
          <CarouselProvider
            className="relative hidden sm:block"
            naturalSlideWidth={100}
            isIntrinsicHeight={true}
            totalSlides={3}
            visibleSlides={1}
            step={1}
            infinite={true}
            currentSlide={1}
          >
            <div className="js-flickity flex justify-center items-center">
              <ButtonBack
                role="button"
                aria-label="slide backward"
                className="w-12 h-12 md:w-14 md:h-14 rounded-full flex justify-center items-center bg-white border border-gray-300 hover:bg-gray-400 absolute z-30 left-0 ml-8 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 cursor-pointer"
                id="prev"
              >
                <svg
                  width={8}
                  height={14}
                  viewBox="0 0 8 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 1L1 7L7 13"
                    stroke="black"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </ButtonBack>
              <Slider className="carousel__sliderLarge">
                <Slide className="carousel__inner-slideLarge" index={0}>
                  <div className="gallery-cell w-full h-full">
                    <div className="relative w-full h-full lg:block hidden">
                      <img
                        src="https://spy.com/wp-content/uploads/2020/08/dfvdfgt.jpg?w=910&h=569&crop=1"
                        alt="sitting area"
                        className="object-center object-cover w-full h-full rounded-md"
                      />
                      <div className="pl-6 pb-6 lg:pl-8 lg:pb-8 absolute left-0 bottom-0">
                        <h1 className="text-xl leading-5 lg:text-3xl lg:leading-normal "></h1>
                      </div>
                    </div>
                    <div className="relative w-full h-full lg:hidden">
                      <img
                        src="https://spy.com/wp-content/uploads/2020/08/dfvdfgt.jpg?w=910&h=569&crop=1"
                        alt="sitting area"
                        className="object-center object-cover w-full h-full rounded-md"
                      />
                      <div className="pl-6 pb-6 lg:pl-8 lg:pb-8 absolute left-0 bottom-0">
                        <h1 className="text-xl leading-5 lg:text-2xl lg:leading-normal font-medium text-white">
                          Plain Tshirts
                        </h1>
                      </div>
                    </div>
                  </div>
                </Slide>
                <Slide className="carousel__inner-slideLarge" index={1}>
                  <div className="gallery-cell w-full h-full">
                    <div className="relative w-full h-full lg:block hidden">
                      <Image
                        alt=""
                        src={hoodiesbanner}
                        className="object-center object-cover w-full h-full rounded-md"
                      />
                      <Image
                        alt=""
                        src={tshirtbanner}
                        className="object-center object-cover w-full h-full rounded-md"
                      />
                    </div>
                    <div className="relative w-full h-full lg:hidden">
                      <Image
                        alt=""
                        src={hoodiesbanner}
                        className="object-center object-cover w-full h-full rounded-md"
                      />
                      <Image
                        alt=""
                        src={tshirtbanner}
                        className="object-center object-cover w-full h-full rounded-md"
                      />
                    </div>
                  </div>
                </Slide>
                <Slide className="carousel__inner-slideLarge" index={2}>
                  <div className="gallery-cell w-full h-full">
                    <div className="relative w-full h-full lg:block hidden">
                      <img
                        src="https://www.creativefabrica.com/wp-content/uploads/2021/09/19/Streetwear-TShirt-Design-Graphics-17527427-1-1-580x387.jpg"
                        alt="chairs"
                        className="object-center object-cover w-full h-full rounded-md"
                      />
                      <div className="pl-6 pb-6 lg:pl-8 lg:pb-8 absolute left-0 bottom-0">
                        <h1 className="text-xl leading-5 lg:text-2xl lg:leading-normal font-medium text-white"></h1>
                      </div>
                    </div>
                    <div className="relative w-full h-full lg:hidden">
                      <img
                        src="https://i.ibb.co/g74VYR2/Group-46.png"
                        alt="chairs"
                        className="object-center object-cover w-full h-full rounded-md"
                      />
                      <div className="pl-6 pb-6 lg:pl-8 lg:pb-8 absolute left-0 bottom-0">
                        <h1 className="text-xl leading-5 lg:text-2xl lg:leading-normal font-medium text-white">
                          Lounge Interior
                        </h1>
                      </div>
                    </div>
                  </div>
                </Slide>
              </Slider>
              <ButtonNext
                role="button"
                aria-label="slide forward"
                className="w-12 h-12 md:w-14 md:h-14 rounded-full flex justify-center items-center bg-white border border-gray-300 hover:bg-gray-400 absolute z-30 right-0 mr-8 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
                id="next"
              >
                <svg
                  width={8}
                  height={14}
                  viewBox="0 0 8 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1L7 7L1 13"
                    stroke="black"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </ButtonNext>
            </div>
          </CarouselProvider>
        </div>
      </div>
      {/* Latest Collection */}
      <div className="item-center justify-center text-center">
        <span className="before:block before:absolute before:-inset-2 before:-skew-y-3 before:bg-red-400 relative inline-block m-2 shadow-lg">
          <h2 className="relative text-white text-3xl text-center">
            Latest Collection!
          </h2>
        </span>
      </div>

      <div className="flex flex-wrap -m-4 justify-center mx-5 p-6">
        {Object.keys(products).map((item) => {
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

      <Content />
    </div>
  );
};

// fetching the data from the mongodb
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let products = await Product.find({ category: "tshirt" });
  // console.log(products);
  // tshirt is an object

  let tshirt = {};

  // looping through the product array
  for (let item of products) {
    //push the new item color & size in the tshirt array if it is not available
    // taking title as a key and tshirt as a value
    if (item.title in tshirt) {
      if (
        !tshirt[item.title].color.includes(item.color) &&
        item.availableQty > 0
      ) {
        tshirt[item.title].color.push(item.color);
      }
      // if (
      //   !tshirt[item.title].size.includes(item.size) &&
      //   item.availableQty > 0
      // ) {
      //   tshirt[item.title].size.push(item.size);
      // }
    }
    // display the tshirt if the color & size is availabel
    else {
      tshirt[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        tshirt[item.title].color = [item.color];
        tshirt[item.title].size = [item.size];
      }
    }
  }
  return {
    props: {
      // products: JSON.parse(JSON.stringify(products)),
      products: JSON.parse(JSON.stringify(tshirt)),
    }, // will be passed to the page component as props
  };
}
export default Home;
