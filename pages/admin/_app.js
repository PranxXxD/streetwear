import * as React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "../src/createEmotionCache";
import "../styles/style.css";
import { useRouter } from "next/router";
import LoadingBar from "react-top-loading-bar";
import Menuitems from "../../src/layouts/sidebar/MenuItems";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [admin, setAdmin] = useState({ value: null });
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const myadmin = JSON.parse(localStorage.getItem("myadmin"));
    if (myadmin) {
      setAdmin({ value: myadmin.token, email: myadmin.email });
      setKey(Math.random());
    }
    router.events.on("routeChangeStart", () => {
      setProgress(40);
    });
    router.events.on("routeChangeComplete", () => {
      setProgress(100);
    });
  }, [router.query]);

  const logout = () => {
    localStorage.removeItem("myadmin");
    setUser({ value: null });
    setKey(Math.random);
    router.push("/adminlogin");
  };

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>streetWear.com:admin</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <LoadingBar
        // color="#f11946"
        // color="EB4747"
        progress={progress}
        waitingTime={200}
        onLoaderFinished={() => setProgress(0)}
      />
      <Menuitems admin={admin} logout={logout} />
      <Component {...pageProps} />
      <CssBaseline />
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
