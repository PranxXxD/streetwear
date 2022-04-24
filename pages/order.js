import React from "react";
import { FaRupeeSign } from "react-icons/fa";

const Order = () => {
  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                StreetWear.com
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
                Order id : #1223444
              </h1>

              <p className="leading-relaxed mb-4">
                Your order has been confirmed
              </p>

              <div class="flex mb-4 text-center">
                <a class="flex-grow text-red-500  border-red-500 py-2 text-lg px-1">
                  Item Description
                </a>
                <a class="flex-grow  border-gray-300 py-2 text-lg px-1">Qty</a>
                <a class="flex-grow  border-gray-300 py-2 text-lg px-1">
                  Item price
                </a>
              </div>
              <div className="flex border-t border-gray-200 py-2">
                <span className="text-gray-500">The Catcher in the Rye</span>
                <span className="ml-auto text-gray-900">1</span>
                <span className="ml-auto text-gray-900">499</span>
              </div>
              <div className="flex border-t border-gray-200 py-2">
                <span className="text-gray-500">The Catcher in the Rye</span>
                <span className="ml-auto text-gray-900">1</span>
                <span className="ml-auto text-gray-900">499</span>
              </div>
              <div className="flex border-t border-b mb-6 border-gray-200 py-2">
                <span className="text-gray-500">The Catcher in the Rye</span>
                <span className="ml-auto text-gray-900">1</span>
                <span className="ml-auto text-gray-900">499</span>
              </div>
              <div className="flex title-font font-medium text-2xl text-gray-900">
                {/* <span className="title-font font-medium text-2xl text-gray-900"> */}
                SubTotal :- <FaRupeeSign className="my-2 mx-1 text-sm" />
                998
                {/* </span> */}
              </div>
              <button className="flex text-white bg-red-500 border-0 py-2 my-5 px-3 focus:outline-none hover:bg-red-600 rounded">
                Track Order
              </button>
            </div>
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              src="https://dummyimage.com/400x400"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Order;
