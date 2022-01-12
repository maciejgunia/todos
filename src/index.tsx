import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
    <React.StrictMode>
        <Auth0Provider
            domain="dev-boefz5w6.us.auth0.com"
            clientId="7tdOTvmqbhn7xxeMw4O8j1utxq9Sd277"
            redirectUri={window.location.origin}
            audience="https://dev-boefz5w6.us.auth0.com/api/v2/"
            scope="read:current_user update:current_user_metadata"
        >
            <App />
        </Auth0Provider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
