import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import { HiTicket } from "react-icons/hi";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [incident, setIncident] = useState("");
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
    } else if (e.target.name === "incident") {
      setIncident(e.target.value);
    }
  };

  // Updating user's details
  const handleUserSubmit = async () => {
    let data = { token: user.token, name, address, email, incident, phone };
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/userincident`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let res = await a.json();
    // console.log(res);
    if (res.success) {
      toast.success("Your issue sucessfully submited!", {
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
      <h1 className="text-3xl mx-auto text-center mt-6 font-bold">
        Complaint Registration!
      </h1>
      <h4 className="text-xl mx-auto text-center mb-12 m-2 font-md">
        We are here to assist you. Fill the form to raise a ticket.
      </h4>
      <div className="flex-col mx-auto items-center justify-center w-1/2">
        <div className="mx-auto flex">
          <div className="px-2 ">
            <div className=" mb-4">
              <label
                htmlFor="name"
                className="leading-7 text-xl font-semibold text-gray-600"
              >
                Name
              </label>
              <input
                onChange={handleChange}
                value={name}
                type="name"
                id="name"
                name="name"
                placeholder="Enter your Full Name"
                className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <div className="px-2">
            <div className=" mb-4">
              <label
                htmlFor="email"
                className="leading-7 text-xl font-semibold text-gray-600"
              >
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
        <div className=" mb-4 flex ">
          <div className="px-2">
            <label
              htmlFor="address"
              className="leading-7 text-xl font-semibold text-gray-600"
            >
              Address
            </label>
            <textarea
              onChange={handleChange}
              value={address}
              id="address"
              name="address"
              rows="2"
              cols="25"
              placeholder="Enter your address"
              className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 h-auto text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
            ></textarea>
          </div>
          <div className="px-2">
            <label
              htmlFor="phone"
              className="leading-7 text-xl font-semibold text-gray-600"
            >
              Phone
            </label>
            <input
              placeholder="Enter Your Phone Number"
              onChange={handleChange}
              value={phone}
              type="phone"
              id="phone"
              name="phone"
              className="w-full h-14 bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className=" mb-4">
          <div className="px-2">
            <label
              htmlFor="address"
              className="leading-7 text-xl font-semibold text-gray-600"
            >
              Issue/Problem details
            </label>
            <textarea
              onChange={handleChange}
              value={incident}
              id="incident"
              name="incident"
              cols="30"
              rows="2"
              placeholder="Enter your problem details"
              className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 h-24 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
            ></textarea>
          </div>
        </div>
      </div>
      <button
        className="flex w-1/6 mx-auto my-2 disabled:bg-red-300 text-white bg-red-400 border-0 py-2 px-2 focus:outline-none hover:bg-red-600 rounded-3xl text-md justify-center"
        onClick={handleUserSubmit}
      >
        <HiTicket className="m-1" />
        Submit
      </button>
    </div>
  );
};

export default Contact;
