import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import App from "./App";
import { Provider } from "react-redux";
import Store from "./Redux-Toolkit/Store";

const root = ReactDOM.createRoot(document.getElementById("root"));
console.log('index')
root.render(
  <Provider store={Store}>
    <App />
  </Provider>
);
