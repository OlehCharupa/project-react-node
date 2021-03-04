import React from "react";
import ReactDOM from "react-dom";
import "./index.module.css";
import App from "./components/App.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store.js";
import { BrowserRouter } from "react-router-dom";
import Container from "./components/Container/Container";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Container>
          <App />
        </Container>
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
