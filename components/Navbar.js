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
      "/checkout",
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
      "/admin/add",
      "/admin/allproducts",
      "/admin/allorders",
      "/admin/imageuploader",
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
          className="absolute right-11 top-6 z-30 cursor-pointer"
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
              className="fixed right-14 bg-white shadow-lg border-2 top-9 py-4 rounded-md px-6 w-32 z-30"
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
              <Image width={60} height={60} src={logo} />
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
        {user.value && (
          <div className="absolute right-0 flex justify-start items-center p-3 mx-20 top-1 md:top-2">
            <input
              className="text-xs md:text-sm bg-none leading-none text-left text-gray-600 w-full px-4 py-3 border border-gray-300 outline-none rounded-2xl "
              type="text"
              placeholder="Search"
            />
            <svg
              className="absolute right-3 z-10 cursor-pointer m-2"
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
        )}
        <div className="cart absolute items-center right-0 mx-5 top-6 cursor-pointer flex">
          {!user.value && (
            <>
              <Link href={"/login"}>
                <a>
                  <button className="flex text-center w-19 text-white bg-red-500 border-0 py-1 px-3 focus:outline-none hover:bg-red-400 rounded-md text-sm">
                    Login
                  </button>
                </a>
              </Link>
            </>
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
              <div className=" my-4 font-normal ">
                <span className="font-semibold first-letter: text-2xl">
                  Oops!
                </span>
                , No items present in the cart please add Some items to checkout
                😊
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
