import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";

const MyAccount = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [npassword, setNpassword] = useState("");
  const [user, setUser] = useState({ value: null });
  const router = useRouter();
  useEffect(() => {
    const myuser = JSON.parse(localStorage.getItem("myuser"));
    if (!myuser) {
      router.push("/");
    }
    if (myuser && myuser.token) {
      setUser(myuser);
      setEmail(myuser.email);
      fetchData(myuser.token);
    }
  }, []);

  const fetchData = async (token) => {
    let data = { token: token };
    // console.log(data);
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let res = await a.json();
    // console.log(res);

    setAddress(res.address);
    setName(res.name);
    setPhone(res.phone);
    setPincode(res.pincode);
  };

  const handleChange = async (e) => {
    e.preventDefault();
    if (e.target.name === "name") {
      setName(e.target.value);
    } else if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "phone") {
      setPhone(e.target.value);
    } else if (e.target.name === "address") {
      setAddress(e.target.value);
    } else if (e.target.name === "pincode") {
      setPincode(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    } else if (e.target.name === "cpassword") {
      setCpassword(e.target.value);
    } else if (e.target.name === "npassword") {
      setNpassword(e.target.value);
    }
  };

  // Updating user's details
  const handleUserSubmit = async () => {
    let data = { token: user.token, name, address, email, pincode, phone };
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuser`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let res = await a.json();
    // console.log(res);
    if (res.success) {
      toast.success("Successfully Updated Details!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        type: "success",
      });
    }
  };

  // Updating password
  const handlePasswordSubmit = async () => {
    let res;
    if (npassword == cpassword) {
      let data = { token: user.token, password, cpassword, npassword };
      let a = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/updatepassword`,
        {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      res = await a.json();
      // console.log(res);
    } else {
      res = { success: false };
    }
    if (res.success) {
      toast.success("Successfully Updated!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        type: "success",
      });
    } else {
      toast.error("Error in Updating password!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        type: "error",
      });
    }
    setPassword("");
    setCpassword("");
    setNpassword("");
  };
  return (
    <div className="container md:w-[72rem] p-2 sm:m-auto ">
      <Head>
        <title>streetWear.com</title>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
        />
      </Head>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <h2 className="text-xl mx-auto text-center my-6 font-bold">
        1. Update Details
      </h2>
      <div className="mx-auto flex">
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">
              Name
            </label>
            <input
              onChange={handleChange}
              value={name}
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
              Email (cannot be updated)
            </label>
            {user && user.token ? (
              <input
                value={user.email}
                type="email"
                id="email"
                name="email"
                className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                readOnly
              />
            ) : (
              <input
                onChange={handleChange}
                value={email}
                type="email"
                id="email"
                name="email"
                className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            )}
          </div>
        </div>
      </div>
      <div className=" mb-4">
        <label htmlFor="address" className="leading-7 text-sm text-gray-600">
          Address
        </label>
        <textarea
          onChange={handleChange}
          value={address}
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
              placeholder="Your 10 digit number"
              onChange={handleChange}
              value={phone}
              type="phone"
              id="phone"
              name="phone"
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
              onChange={handleChange}
              value={pincode}
              type="pincode"
              id="pincode"
              name="pincode"
              className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>
      <button
        className="flex mx-auto my-2 disabled:bg-red-300  text-white bg-red-500 border-0 p-3 focus:outline-none hover:bg-red-600 rounded-xl text-sm"
        onClick={handleUserSubmit}
      >
        Update
      </button>
      <div className="mx-auto flex">
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label
              htmlFor="password"
              className="leading-7 text-sm text-gray-600"
            >
              Password
            </label>
            <input
              onChange={handleChange}
              value={password}
              type="password"
              id="password"
              name="password"
              className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label
              htmlFor="npassword"
              className="leading-7 text-sm text-gray-600"
            >
              New Password
            </label>
            <input
              onChange={handleChange}
              value={npassword}
              type="password"
              id="npassword"
              name="npassword"
              className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label
              htmlFor="cpassword"
              className="leading-7 text-sm text-gray-600"
            >
              Confirm New Password
            </label>
            <input
              onChange={handleChange}
              value={cpassword}
              type="password"
              id="cpassword"
              name="cpassword"
              className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>
      <button
        className="flex mx-auto my-2 disabled:bg-red-300  text-white bg-red-500 border-0 p-3 focus:outline-none hover:bg-red-600 rounded-xl text-sm"
        onClick={handlePasswordSubmit}
      >
        Update
      </button>
    </div>
  );
};

export default MyAccount;
