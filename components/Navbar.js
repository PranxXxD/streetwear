import React from "react";
import Image from "next/image";
import logo from "../images/logo.png";
import Link from "next/link";
import {
  AiOutlineShoppingCart,
  AiFillPlusCircle,
  AiFillMinusCircle,
  AiOutlineClear,
} from "react-icons/ai";
import { FaWindowClose, FaRupeeSign } from "react-icons/fa";
// import { GrClearOption } from "react-icons/gr";
import { FiShoppingBag } from "react-icons/fi";
import { MdAccountCircle } from "react-icons/md";
import { useRef } from "react";

const Navbar = ({ cart, addToCart, removeFromCart, clrCart, subTotal }) => {
  // console.log(cart, addToCart, removeFromCart, clrCart, subTotal);

  const toggleCart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");
      ref.current.classList.add("translate-x-0");
    } else if (!ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-0");
      ref.current.classList.add("translate-x-full");
    }
  };

  const ref = useRef();

  return (
    <div className="flex flex-col md:flex-row md:justify-start justify-center items-center py-2 shadow-md sticky top-0 bg-white z-10">
      <div className="logo mx-5">
        <Link href={"/"}>
          <Image width={60} height={50} src={logo} />
        </Link>
      </div>
      <div className="nav ">
        <ul className="flex items-center space-x-3 font-bold md:text-md">
          <Link href={"/tshirts "}>
            <a>
              <li>Tshirts</li>
            </a>
          </Link>
          <Link href={"/hoodies "}>
            <a>
              <li>Hoodies</li>
            </a>
          </Link>
          <Link href={"/shirts "}>
            <a>
              <li>Shirts</li>
            </a>
          </Link>
          <Link href={"/mugs "}>
            <a>
              <li>Mugs</li>
            </a>
          </Link>
        </ul>
      </div>
      <div className="cart absolute right-0 mx-5 top-4 cursor-pointer flex">
        <Link href={"/login"}>
          <MdAccountCircle className="text-xl md:text-3xl mx-2" />
        </Link>
        <AiOutlineShoppingCart
          onClick={toggleCart}
          className="text-xl md:text-3xl"
        />
      </div>

      <div
        ref={ref}
        className={`w-60 h-[100vh] sideCart top-0 right-0 absolute bg-red-200 px-8 py-10 transform transition-transform ${
          Object.keys(cart).length !== 0 ? "translate-x-0" : "translate-x-full"
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
                <div className="flex items my-6 ">
                  <span className="w-2/3 flex font-semibold ">
                    {cart[k].name}
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
        <div className="flex w-48 space-x-1">
          <Link href={"/checkout"}>
            <button className="flex mx-auto text-center mt-4 w-19  text-white bg-red-500 border-0 py-1 px-2 focus:outline-none hover:bg-red-600 rounded text-xs">
              <FiShoppingBag className="my-1 mx-1 text-center" />
              Checkout
            </button>
          </Link>
          <button
            onClick={clrCart}
            className="flex mx-auto mt-4 text-center text-white bg-red-500 border-0 py-1 px-2 focus:outline-none hover:bg-red-600 rounded text-xs"
          >
            <AiOutlineClear className="m-1 text-center" />
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
