import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";

const MyAccount = () => {
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("myuser")) {
      router.push("/");
    }
  }, []);

  return <div>MyAccount</div>;
};

export default MyAccount;
