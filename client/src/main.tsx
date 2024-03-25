import { GoogleOAuthProvider } from "@react-oauth/google";
import { ConfigProvider } from "antd";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { store } from "./store/index.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="886062611278-j96irk5c6udfurhdf656svr969me1l3d.apps.googleusercontent.com">
      <Provider store={store}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#ff8e3c",
              borderRadius: 5,
              colorBgContainer: "white",
              colorSplit: "#f1f5f9",
            },
          }}
        >
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ConfigProvider>
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
