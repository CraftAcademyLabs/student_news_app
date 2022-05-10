import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./state/store/configureStore";
import App from "./App";
import "semantic-ui-css/semantic.min.css";
import "./styles/index.css";
import axios from "axios";
import "./i18n";
import { StripeProvider } from "react-stripe-elements";

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  axios.defaults.baseURL = "http://localhost:3000";
} else {
  axios.defaults.baseURL = " https://news-in-progress-fh.herokuapp.com/";
}

window.store = store;
ReactDOM.render(
  <Provider store={store}>
    <StripeProvider apiKey="pk_test_QicERB8w3kyqaYW3hUUQylRH">
      <App />
    </StripeProvider>
  </Provider>,
  document.getElementById("root")
);
