import React from "react";
import ReactDOM from "react-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App";
import AppRouter from "./Router";

ReactDOM.render(
    <React.StrictMode>
        <AppRouter>
            <App />
        </AppRouter>
    </React.StrictMode>,
    document.getElementById("root")
);
