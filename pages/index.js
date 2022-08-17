import Head from "next/head";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Image from "next/image";
import Content from "../components/content";
import mongoose from "mongoose";
import Product from "../models/Product";

// import slider from "../images/musician.jpg";

export default function Home({ products }) {
  // console.log(products);
  return (
    <div>
      <Head>
        <title>streetWear.com</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex w-auto m-3 md:justify-center md:items-center ">
        {/* <Image src={slider} alt="" height={800} /> */}
        {products &&
          products.map((product) => {
            <div
              key={product.id}
              className="carousel carousel-center max-w-md p-4 space-x-4 bg-neutral rounded-box"
            >
              <div className="carousel-item">
                <Image src={product.img} className="rounded-box" />
              </div>
            </div>;
          })}
      </div>
      <div className="container mx-auto py-9 md:py-12 px-4 md:px-6">
        <div className="flex items-strech justify-center flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 lg:space-x-8">
          <div className="flex flex-col md:flex-row items-strech justify-between bg-gray-50 py-6 px-6 md:py-12 lg:px-12 md:w-8/12 lg:w-7/12 xl:w-8/12 2xl:w-9/12">
            <div className="flex flex-col justify-center md:w-1/2">
              <h1 className="text-3xl lg:text-4xl font-semibold text-gray-800">
                Best Deal
              </h1>
              <p className="text-base lg:text-xl text-gray-800 mt-2">
                Save upto <span className="font-bold">50%</span>
              </p>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center md:justify-end">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0ReoKNd5g029hylmzar2NPQFr8oYmM-OOJQ&usqp=CAU"
                alt=""
              />
              {/* <img src="https://i.ibb.co/J2BtZdg/Rectangle-56-1.png" alt="" /> */}
            </div>
          </div>
          <div className="md:w-4/12 lg:w-5/12 xl:w-4/12 2xl:w-3/12 bg-gray-50 py-6 px-6 md:py-0 md:px-4 lg:px-6 flex flex-col justify-center relative">
            <div className="flex flex-col justify-center">
              <h1 className="text-3xl lg:text-4xl font-semibold text-gray-800">
                Game Console
              </h1>
              <p className="text-base lg:text-xl text-gray-800">
                Save Upto <span className="font-bold">30%</span>
              </p>
            </div>
            <div className="flex justify-end md:absolute md:bottom-4 md:right-4 lg:bottom-0 lg:right-0">
              <img
                src="https://i.ibb.co/rGfP7mp/Rectangle-59-1.png"
                alt=""
                className="md:w-20 md:h-20 lg:w-full lg:h-full"
              />
            </div>
          </div>
        </div>
      </div>
      <Content />
    </div>
  );
}

export async function getServerSideProps() {
  // Fetch data from external API
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  const products = await Product.find();

  // Pass data to the page via props
  return { props: { products: JSON.parse(JSON.stringify(products)) } };
}
