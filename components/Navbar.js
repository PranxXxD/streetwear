import React from "react";
import Image from "next/image";
import logo from "../images/logo.png";
import Link from "next/link";
import {
  AiOutlineShoppingCart,
  AiFillPlusCircle,
  AiFillMinusCircle,
  AiOutlineClear,
  AiOutlineSearch,
} from "react-icons/ai";
import { FaWindowClose, FaRupeeSign } from "react-icons/fa";
// import { GrClearOption } from "react-icons/gr";
import { FiShoppingBag } from "react-icons/fi";
import { MdAccountCircle } from "react-icons/md";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Navbar = ({
  logout,
  user,
  cart,
  addToCart,
  removeFromCart,
  clrCart,
  subTotal,
}) => {
  // console.log(cart, addToCart, removeFromCart, clrCart, subTotal);
  const [dropDown, setDropDown] = useState(false);
  const [sidebar, setSidebar] = useState(false);

  const router = useRouter();
  useEffect(() => {
    Object.keys(cart).length !== 0 && setSidebar(true);
    const exempted = [
      "checkout",
      "/order",
      "/orders",
      "/",
      "/myaccount",
      "/tshirts",
      "/shirts",
      "/hoodies",
      "/mugs",
      "/checkout",
      "/admin",
    ];
    if (exempted.includes(router.pathname)) {
      setSidebar(false);
    }
  }, []);

  const toggleCart = () => {
    setSidebar(!sidebar);

    // if (ref.current.classList.contains("translate-x-full")) {
    //   ref.current.classList.remove("translate-x-full");
    //   ref.current.classList.add("translate-x-0");
    // } else if (!ref.current.classList.contains("translate-x-full")) {
    //   ref.current.classList.remove("translate-x-0");
    //   ref.current.classList.add("translate-x-full");
    // }
  };

  const ref = useRef();

  return (
    <>
      {!sidebar && (
        <span
          className="absolute right-11 top-4 z-30 cursor-pointer"
          onMouseOver={() => {
            setDropDown(true);
          }}
          onMouseLeave={() => {
            setDropDown(false);
          }}
        >
          {dropDown && (
            <div
              onMouseOver={() => {
                setDropDown(true);
              }}
              onMouseLeave={() => {
                setDropDown(false);
              }}
              className="fixed right-6 bg-white shadow-lg border-2 top-4 py-4 rounded-md px-5 w-32 z-30"
            >
              <ul>
                <Link href={"/myaccount"}>
                  <a>
                    <li className="py-2 hover:text-red-400 text-black text-sm font-medium">
                      My Account
                    </li>
                  </a>
                </Link>
                <Link href={"/orders"}>
                  <li className="py-2 hover:text-red-400  text-black text-sm font-medium">
                    My Orders
                  </li>
                </Link>
                <Link href={"/login"}>
                  <li
                    onClick={logout}
                    className="py-2 hover:text-red-400 text-black text-sm font-medium"
                  >
                    Logout
                  </li>
                </Link>
              </ul>
            </div>
          )}

          {user.value && (
            <MdAccountCircle className="text-xl md:text-3xl mx-2" />
          )}
        </span>
      )}
      <div
        className={`sticky flex flex-col md:flex-row md:justify-start justify-center items-center py-2 shadow-md top-0 bg-white z-10 ${
          !sidebar && "overflow-hidden"
        }`}
      >
        <div className="logo mr-auto md:mx-5">
          <Link href={"/"}>
            <a>
              <Image width={60} height={50} src={logo} />
            </a>
          </Link>
        </div>
        <div className="nav ">
          <ul className="flex items-center space-x-3 font-bold md:text-md ">
            <Link href={"/tshirts"}>
              <a className="hover:text-red-600">
                <li>Tshirts</li>
              </a>
            </Link>
            <Link href={"/hoodies"}>
              <a className="hover:text-red-600">
                <li>Hoodies</li>
              </a>
            </Link>
            <Link href={"/shirts"}>
              <a className="hover:text-red-600">
                <li>Shirts</li>
              </a>
            </Link>
            <Link href={"/mugs"}>
              <a className="hover:text-red-600">
                <li>Mugs</li>
              </a>
            </Link>
          </ul>
        </div>
        <div className="h-[2.5rem] absolute right-0 mx-20 p-2.5 top-1 rounded-[2.5rem] w-0 hover:w-56 hover:pb-1">
          <input
            className="border-none bg-none float-left p-0 text-gray-400 leading-10 w-0 hover:w-56 hover:bg-red-500 transition:0.4ms hover:pb-1"
            type="text"
            placeholder="Search"
            id="input"
          />
          <button className="hover:bg-red-500 hover:text-black text-white border-2 float-right w-10 h-10 rounded-[50%] bg-red-400 flex justify-center items-center transition:0.4ms">
            <AiOutlineSearch id="Search" />
          </button>
        </div>
        <div className="cart absolute items-center right-0 mx-5 top-4 cursor-pointer flex">
          {!user.value && (
            <Link href={"/login"}>
              <a>
                <button className="flex text-center w-19 mx-2 text-white bg-red-500 border-0 py-1 px-2 focus:outline-none hover:bg-red-400 rounded-md text-sm">
                  Login
                </button>
              </a>
            </Link>
          )}
          <AiOutlineShoppingCart
            onClick={toggleCart}
            className="text-xl md:text-3xl"
          />
        </div>
        {/* side bar */}
        <div
          ref={ref}
          className={`w-64 h-[100vh] sideCart overflow-y-scroll overflow-x-hidden top-0 absolute bg-red-200 px-8 py-10  transition-all ${
            sidebar ? "right-0" : "-right-96"
          }`}
        >
          <h2 className="font-bold text-xl text-center my-6">
            This the streetwear cart
          </h2>
          <span
            onClick={toggleCart}
            className="top-5 right-4 absolute cursor-pointer text-2xl md:text-3xl text-red-500 "
          >
            <FaWindowClose />
          </span>
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
                  <div className="flex items-center my-6 ">
                    <span className="w-auto text-sm flex font-semibold ">
                      {cart[k].name}({cart[k].size})/({cart[k].variant})
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
                        className="cursor-pointer text-red-500 "
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
          <div className="flex w-48 space-x-1">
            <Link href={"/checkout"}>
              <button
                disabled={Object.keys(cart).length == 0}
                className="disabled:bg-red-300 flex mx-auto text-center mt-4 w-19  text-white bg-red-500 border-0 py-1 px-2 focus:outline-none hover:bg-red-600 rounded text-xs"
              >
                <FiShoppingBag className="my-1 mx-1 text-center" />
                Checkout
              </button>
            </Link>
            <button
              disabled={Object.keys(cart).length == 0}
              onClick={clrCart}
              className="disabled:bg-red-300 flex mx-auto mt-4 text-center text-white bg-red-500 border-0 py-1 px-2 focus:outline-none hover:bg-red-600 rounded text-xs"
            >
              <AiOutlineClear className="m-1 text-center" />
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
