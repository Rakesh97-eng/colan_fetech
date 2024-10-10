import { BrowserRouter as Router, Routes, useRoutes } from "react-router-dom";
import "../styles/App.css";
import { getRoutes } from "../layout/routes/index";
import LazyLoader from "../components/lazyLoader";
import { Provider } from "react-redux";
import { NodeContextProvider } from "../nodecontext/nodeContext";
import store from "../redux/store";
import { useEffect } from "react";
import { useState } from "react";
import { ThemeProvider } from "@mui/material";
import { theme } from "../styles/globalTheme";

function App() {
  // const[routerType,setRouterType] = useState(0)
  const userRole =
  typeof window !== "undefined" ? sessionStorage.getItem("ur") : null;
  const routeType =userRole !== null ? userRole : 0
  const router = useRoutes(getRoutes(routeType));

  return (
    <>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <NodeContextProvider>
          {/* {router} */}
          <LazyLoader>{router}</LazyLoader>
        </NodeContextProvider>
      </Provider>
      
    </ThemeProvider>
    </>
  );
}

export default App;
