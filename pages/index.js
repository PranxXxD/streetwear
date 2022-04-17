import Head from "next/head";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Image from "next/image";

import slider from "../images/musician.jpg";
import Content from "../components/content";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex w-auto m-3 md:justify-center md:items-center ">
        <Image src={slider} alt="" />
      </div>
    </div>
  );
}
