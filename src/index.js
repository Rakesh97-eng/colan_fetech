import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import App from "./pages/App";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorBoundary from "./components/errorBoundary";
import 'react-phone-number-input/style.css';
import "react-quill/dist/quill.snow.css";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Route>
    <ErrorBoundary>
      <ToastContainer />
      <App />
    </ErrorBoundary>
  </Route>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
