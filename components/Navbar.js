import React from "react";
import Image from "next/image";
import logo from "../images/logo.png";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";

const Navbar = () => {
  return (
    <div className="flex  flex-col md:flex-row md:justify-start justify-center items-center ">
      <div className="logo mx-5">
        <Image width={60} height={50} src={logo} />
      </div>
      <div className="nav ">
        <ul className="flex items-center space-x-3 font-bold md:text-xl">
          <Link href={"/ "}>
            <a>
              <li>Tshirts</li>
            </a>
          </Link>
          <Link href={"/ "}>
            <a>
              <li>Hoodies</li>
            </a>
          </Link>
          <Link href={"/ "}>
            <a>
              <li>Shirts</li>
            </a>
          </Link>
          <Link href={"/ "}>
            <a>
              <li>Shorts</li>
            </a>
          </Link>
        </ul>
      </div>
      <div className="cart absolute right-0 mx-5 top-4">
        <AiOutlineShoppingCart className="text-xl md:text-3xl" />
      </div>
    </div>
  );
};

export default Navbar;
