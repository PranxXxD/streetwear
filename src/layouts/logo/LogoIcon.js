import React from "react";
import { Link } from "@mui/material";
import Image from "next/image";
import logo from "../../../images/logo.png";
const LogoIcon = () => {
  return (
    <Link href="/">
      <Image width={150} height={110} src={logo} alt={logo} />
    </Link>
  );
};

export default LogoIcon;
