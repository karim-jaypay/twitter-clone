import React from "react";
import ReactDOM from "react-dom";
import Helmet from "react-helmet";

import { Provider } from "react-redux";
import { configureStore } from "./redux/store";

import App from "./App";
import "./App.scss";

ReactDOM.render(
  <Provider store={configureStore()}>
    <Helmet>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
    </Helmet>
    <App />
  </Provider>,
  document.getElementById("root")
);
