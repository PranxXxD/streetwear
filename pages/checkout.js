import React from "react";
import Link from "next/link";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { FaRupeeSign } from "react-icons/fa";
import Head from "next/head";
import Script from "next/script";

const Checkout = ({ cart, addToCart, removeFromCart, subTotal }) => {
  const initiatePayment = async () => {
    let oid = Math.floor(Math.random() * Date.now());

    // get a transaction token
    const data = { cart, subTotal, oid, email: "email" };

    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let txnRes = await a.json();
    console.log(txnRes);
    let txnToken = txnRes.txnToken;

    var config = {
      root: "",
      flow: "DEFAULT",
      data: {
        orderId: oid /* update order id */,
        token: txnToken /* update token value */,
        tokenType: "TXN_TOKEN",
        amount: subTotal /* update amount */,
      },
      handler: {
        notifyMerchant: function (eventName, data) {
          console.log("notifyMerchant handler function called");
          console.log("eventName => ", eventName);
          console.log("data => ", data);
        },
      },
    };

    window.Paytm.CheckoutJS.init(config)
      .then(function onSuccess() {
        // console.log(init);

        // after successfully updating configuration, invoke JS Checkout
        window.Paytm.CheckoutJS.invoke();
      })
      .catch(function onError(error) {
        console.log("error => ", error);
      });
  };

  return (
    <div className="container md:w-[72rem] p-2 sm:m-auto ">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
        />
      </Head>
      <Script
        type="application/javascript"
        crossorigin="anonymous"
        src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_MID}.js`}
      />
      <h1 className="font-bold my-8 text-center text-3xl">Checkout</h1>
      <h2 className="text-xl font-bold">1. Delivery Details</h2>
      <div className="mx-auto flex">
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">
              Name
            </label>
            <input
              type="name"
              id="name"
              name="name"
              className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>
      <div className=" mb-4">
        <label htmlFor="address" className="leading-7 text-sm text-gray-600">
          Address
        </label>
        <textarea
          id="address"
          name="address"
          cols="30"
          rows="2"
          className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 h-24 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
        ></textarea>
      </div>
      <div className="mx-auto flex">
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">
              Phone
            </label>
            <input
              type="phone"
              id="phone"
              name="phone"
              className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label htmlFor="city" className="leading-7 text-sm text-gray-600">
              City
            </label>
            <input
              type="city"
              id="city"
              name="city"
              className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>
      <div className="mx-auto flex">
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label htmlFor="state" className="leading-7 text-sm text-gray-600">
              State
            </label>
            <input
              type="state"
              id="state"
              name="state"
              className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label
              htmlFor="pincode"
              className="leading-7 text-sm text-gray-600"
            >
              Pincode
            </label>
            <input
              type="pincode"
              id="pincode"
              name="pincode"
              className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>
      {/* Review cart component start here  */}
      <h2 className="text-xl font-semibold">2. Review cart items</h2>
      <div className="sideCart  bg-red-100 p-6 m-2">
        <ol className="list-decimal font-semibold">
          {/* display if the cart is empty */}
          {Object.keys(cart).length == 0 && (
            <div className="my-4 font-normal">
              Oops!, No items present in the cart please add Some items to
              checkout 😊
            </div>
          )}
          {/* display the item which added to the cart  */}
          {Object.keys(cart).map((k) => {
            return (
              <li key={k}>
                <div className="flex items my-6 ">
                  <span className=" flex font-semibold ">
                    {cart[k].name} - {cart[k].size}/{cart[k].variant}
                  </span>
                  <span className="w-1/3 flex font-semibold items-center justify-center">
                    <AiFillMinusCircle
                      onClick={() =>
                        removeFromCart(
                          k,
                          1,
                          cart[k].price,
                          cart[k].name,
                          cart[k].size,
                          cart[k].variant
                        )
                      }
                      className="cursor-pointer text-red-500"
                    />
                    <span className="mx-2 text-sm">{cart[k].qty}</span>
                    <AiFillPlusCircle
                      onClick={() =>
                        addToCart(
                          k,
                          1,
                          cart[k].price,
                          cart[k].name,
                          cart[k].size,
                          cart[k].variant
                        )
                      }
                      className="cursor-pointer text-red-500"
                    />
                  </span>
                </div>
              </li>
            );
          })}
        </ol>
        <div className="flex ">
          <span className="flex px-2 font-semibold">
            SubTotal : <FaRupeeSign className="my-1 px-1" /> {subTotal}
          </span>
        </div>
      </div>
      <div className="flex">
        <button
          className="flex mx-auto my-2  text-white bg-red-500 border-0 py-2 px-2 focus:outline-none hover:bg-red-600 rounded text-sm"
          onClick={initiatePayment}
        >
          Pay <FaRupeeSign className="my-1 px-1" /> {subTotal}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
