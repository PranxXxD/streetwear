import React from "react";
import { FaRupeeSign } from "react-icons/fa";
import mongoose from "mongoose";
import Order from "../models/Order";
import Image from "next/image";
import order_ from "../images/order_.jpg";

const MyOrder = ({ order }) => {
  // console.log(order);
  const products = order.products;
  // console.log(order.products);

  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                StreetWear.com
              </h2>
              <h1 className="text-gray-900 text-xl md:text-3xl title-font font-medium mb-4">
                Order id : #{order.orderId}
              </h1>
              <p className="leading-relaxed mb-4">
                Your order has been confirmed and the payment status is :
                {order.status}
              </p>
              <div className="flex mb-4 text-center">
                <a className="flex-grow text-red-500  border-red-500 py-2 text-lg px-1">
                  Item Description
                </a>
                <a className="flex-grow border-gray-300 py-2 text-lg px-1">
                  Qty
                </a>
                <a className="flex-grow border-gray-300 py-2 text-lg px-1">
                  Item price
                </a>
              </div>
              {Object.keys(products).map((key) => {
                return (
                  <div key={key} className="flex border-t border-gray-200 py-2">
                    <span className="text-gray-500">
                      {products[key].name} (
                      {products[key].size / products[key].variant})
                    </span>
                    <span className=" m-auto text-gray-900">
                      {products[key].qty}
                    </span>
                    <span className=" m-auto text-gray-900">
                      {products[key].price}
                    </span>
                  </div>
                );
              })}

              <div className="flex title-font font-medium text-2xl text-gray-900">
                {/* <span className="title-font font-medium text-2xl text-gray-900"> */}
                SubTotal :- <FaRupeeSign className="my-2 mx-1 text-sm" />
                {order.amount}
                {/* </span> */}
              </div>
              <button className="flex text-white bg-red-500 border-0 py-2 my-5 px-3 focus:outline-none hover:bg-red-600 rounded">
                Track Order
              </button>
            </div>
            <Image
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              src={order_}
              width={370}
              height={50}
            />
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
  // fetch the single item with the unique slug
  let order = await Order.findById(context.query.id);
  // console.log(context.query.id);
  return {
    props: {
      order: JSON.parse(JSON.stringify(order)),
    }, // will be passed to the page component as props
  };
}

export default MyOrder;
