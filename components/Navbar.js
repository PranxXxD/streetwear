import React from "react";
import Image from "next/image";
import logo from "../images/logo.png";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";

const Navbar = () => {
  return (
    <div className="flex  flex-col md:flex-row md:justify-start justify-center items-center py-2 shadow-md ">
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
      <div className="cart absolute right-0 mx-5 top-4">
        <AiOutlineShoppingCart className="text-xl md:text-3xl" />
      </div>
    </div>
  );
};

export default Navbar;
