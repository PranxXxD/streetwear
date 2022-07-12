import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../images/logo.png";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Forgotpwd = () => {
  // prevent user to get back to the forget page once the user is logged in
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [npassword, setNpassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  useEffect(() => {
    // console.log(router.query);
    if (localStorage.getItem("myuser")) {
      router.push("/");
    }
  }, []);

  const handleChange = async (e) => {
    e.preventDefault();
    if (e.target.name === "email") {
      setEmail(e.target.value);
    }
    if (e.target.name === "npassword") {
      setNpassword(e.target.value);
    }
    if (e.target.name === "cpassword") {
      setCpassword(e.target.value);
    }
  };

  const SendResetEmail = async () => {
    let data = {
      email,
      sendEmail: true,
    };
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    // console.log(data);
    let res = await a.json();
    if (res.success) {
      toast.success("Reset passsword mail has been sent", {
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
      toast.error("Some Error Ocurred", {
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
  };

  const resetPassword = async () => {
    if (npassword == cpassword) {
      let data = {
        npassword,
        sendEmail: false,
      };
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      // console.log(data);
      let res = await a.json();
      if (res.success) {
        toast.success("Your password has been reset Successfully", {
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
    } else {
      toast.error("Some Error Ocurred", {
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
  };

  return (
    <div>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div className="max-w-md w-full space-y-8">
          <div>
            <div className="flex justify-center ">
              <Image width={80} height={60} src={logo} />
            </div>
            <h2 className="mt-5 text-center text-3xl font-extrabold text-gray-900">
              Forgot your Password
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or
              <Link href={"/login"}>
                <a className="font-medium text-red-600 hover:text-red-500 mx-2">
                  Login
                </a>
              </Link>
            </p>
          </div>
          {router.query.token && (
            <form className="mt-8 space-y-3" action="#" method="POST">
              <input type="hidden" name="remember" value="true" />
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="npassword" className="sr-only">
                    New Password
                  </label>
                  <input
                    value={npassword}
                    onChange={handleChange}
                    id="npassword"
                    name="npassword"
                    type="password"
                    autocomplete="npassword"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none
                     focus:gray-red-500 focus:border-gray-500 focus:z-10 sm:text-sm"
                    placeholder="New password"
                  />
                </div>
              </div>
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="cpassword" className="sr-only">
                    Confirm Password
                  </label>
                  <input
                    value={cpassword}
                    onChange={handleChange}
                    id="cpassword"
                    name="cpassword"
                    type="password"
                    autocomplete="cpassword"
                    required
                    className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none ${
                      npassword != cpassword
                        ? "focus:ring-red-500 focus:border-red-500 focus:z-10"
                        : "focus:ring-green-500 focus:border-green-500 focus:z-10"
                    } sm:text-sm`}
                    placeholder="Confirm password"
                  />
                </div>
              </div>
              <div>
                <button
                  onClick={resetPassword}
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    {/* <!-- Heroicon name: solid/lock-closed --> */}
                    <svg
                      className="h-5 w-5 text-red-500 group-hover:text-red-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </span>
                  Continue
                </button>
              </div>
              {npassword != cpassword && (
                <span className="text-bold text-red-500 mt-3">
                  Password didn't match
                </span>
              )}
              {npassword && npassword == cpassword && (
                <span className="text-bold text-green-500 mt-3">
                  Passwords Match
                </span>
              )}
            </form>
          )}
          {!router.query.token && (
            <form className="mt-8 space-y-6" action="#" method="POST">
              <input type="hidden" name="remember" value="true" />
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    value={email}
                    onChange={handleChange}
                    id="email-address"
                    name="email"
                    type="email"
                    autocomplete="email"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                  />
                </div>
              </div>

              <div>
                <button
                  onClick={SendResetEmail}
                  disabled={!email}
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-red-300"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    {/* <!-- Heroicon name: solid/lock-closed --> */}
                    <svg
                      className="h-5 w-5 text-red-500 group-hover:text-red-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </span>
                  Continue
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Forgotpwd;
