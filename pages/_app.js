import { useState } from "react";
import { useEffect } from "react";
import Content from "../components/content";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [cart, setCart] = useState({}); //using cart as an object
  const [subTotal, setSubTotal] = useState(0); //use to set the total of items added to the cart

  // using useEffect to save the cart data in localstorage so that if the page accidentally refresh then also items will available in cart
  useEffect(() => {
    // console.log("Local storage from app.js");
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")));
      }
    } catch (error) {
      // console.log(error);
      localStorage.clear();
    }
  }, []);

  const saveCart = (myCart) => {
    // save the item data in the json form in localstorage
    localStorage.setItem("cart", JSON.stringify(myCart));
    let subt = 0;
    let keys = Object.keys(cart);
    for (let i = 0; i < keys.length; i++) {
      subt += myCart[keys[i]].price * myCart[keys[i]].qty;
    }
    setSubTotal(subt);
  };

  //funtion for adding a item to cart
  const addToCart = (itemCode, qty, price, name, size, vairant) => {
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty + qty;
    } else {
      newCart[itemCode] = { qty: 1, price, name, size, vairant };
    }

    setCart(newCart);
    saveCart(newCart);
  };

  //funtion for removing a item from cart
  const removeFromCart = (itemCode, qty, price, name, size, vairant) => {
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty - qty;
    }
    if (newCart[itemCode].qty <= 0) {
      delete newCart[itemCode];
    }

    setCart(newCart);
    saveCart(newCart);
  };

  const clrCart = () => {
    setCart({}); // request for set the cart empty
    saveCart({}); // makes the cart not to display the old cart
  };

  return (
    <>
      <Navbar
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clrCart={clrCart}
        subTotal={subTotal}
      />
      <Component
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clrCart={clrCart}
        subTotal={subTotal}
        {...pageProps}
      />
      <Content />

      <Footer />
    </>
  );
}

export default MyApp;
