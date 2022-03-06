import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
//provider
import { AuthProvider } from "./provider";

ReactDOM.render(
  <AuthProvider>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </AuthProvider>,
  document.getElementById("root")
);
