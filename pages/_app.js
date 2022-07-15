import { useState } from "react";
import { useEffect } from "react";
import Content from "../components/content";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../styles/globals.css";
import { useRouter } from "next/router";
import LoadingBar from "react-top-loading-bar";

function MyApp({ Component, pageProps }) {
  const [cart, setCart] = useState({}); //using cart as an object
  const [subTotal, setSubTotal] = useState(0); //use to set the total of items added to the cart
  // top loading bar
  const [progress, setProgress] = useState(0);
  // use to set the user session in local storage
  const [user, setUser] = useState({ value: null });
  const [key, setKey] = useState(0);
  const router = useRouter();
  // using useEffect to save the cart data in localstorage so that if the page accidentally refresh then also items will available in cart
  useEffect(() => {
    // console.log("Local storage from app.js");
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")));
        saveCart(JSON.parse(localStorage.getItem("cart")));
      }
    } catch (error) {
      // console.log(error);
      localStorage.clear();
    }
    const myuser = JSON.parse(localStorage.getItem("myuser"));
    if (myuser) {
      setUser({ value: myuser.token, email: myuser.email });
      setKey(Math.random());
    }
    // to set the progress bar when user route through the pages
    router.events.on("routeChangeStart", () => {
      setProgress(40);
    });
    router.events.on("routeChangeComplete", () => {
      setProgress(100);
    });
  }, [router.query]);

  const logout = () => {
    localStorage.removeItem("myuser");
    setUser({ value: null });
    setKey(Math.random);
    router.push("/");
  };

  const saveCart = (myCart) => {
    // save the item data in the json form in localstorage
    localStorage.setItem("cart", JSON.stringify(myCart));
    let subt = 0;
    let keys = Object.keys(myCart);
    for (let i = 0; i < keys.length; i++) {
      subt += myCart[keys[i]].price * myCart[keys[i]].qty;
    }
    setSubTotal(subt);
  };

  //funtion for adding a item to cart
  const addToCart = (itemCode, qty, price, name, size, variant) => {
    if (Object.keys(cart).length == 0) {
      setCart(Math.random());
    }
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty + qty;
    } else {
      newCart[itemCode] = { qty: 1, price, name, size, variant };
    }

    setCart(newCart);
    saveCart(newCart);
  };
  // buyNow functionality which clr the existing cart and direct redirect to checkout page
  const buyNow = (itemCode, qty, price, name, size, variant) => {
    let newCart = {};
    newCart[itemCode] = { qty: 1, price, name, size, variant };

    setCart(newCart);
    saveCart(newCart);
    router.push("/checkout");
  };

  //funtion for removing a item from cart
  const removeFromCart = (itemCode, qty, price, name, size, variant) => {
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
      <LoadingBar
        // color="#f11946"
        // color="EB4747"
        progress={progress}
        waitingTime={200}
        onLoaderFinished={() => setProgress(0)}
      />
      {
        <Navbar
          logout={logout}
          user={user}
          key={key}
          cart={cart}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          clrCart={clrCart}
          subTotal={subTotal}
        />
      }{" "}
      <Component
        cart={cart}
        buyNow={buyNow}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clrCart={clrCart}
        subTotal={subTotal}
        {...pageProps}
      />
      <Footer />
    </>
  );
}

export default MyApp;
