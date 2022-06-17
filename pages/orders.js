import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";

const orders = () => {
  const router = useRouter();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myorders`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: localStorage.getItem("token") }),
      });
      let res = await a.json();
      setOrders(res.orders);
    };
    if (!localStorage.getItem("token")) {
      router.push("/");
    } else {
      fetchOrders();
    }
  }, []);

  return (
    <div>
      <h1 className="text-center font-semibold p-8 text-xl">My Orders</h1>
      <div className="container mx-auto w-3/4">
        <div class="flex flex-col ">
          <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div class="overflow-hidden">
                <table class="min-w-full">
                  <thead class="bg-gray-200 border-b">
                    <tr>
                      <th
                        scope="col"
                        class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        #
                      </th>
                      <th
                        scope="col"
                        class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        email
                      </th>
                      <th
                        scope="col"
                        class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        amount
                      </th>
                      <th
                        scope="col"
                        class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Details
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((item) => {
                      return (
                        <tr
                          key={item._id}
                          class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                        >
                          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {item.orderId}
                          </td>
                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {item.email}
                          </td>
                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {item.price}
                          </td>
                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            <Link href={"/order?id=" + item.orderId}>
                              <a>Details</a>
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default orders;
