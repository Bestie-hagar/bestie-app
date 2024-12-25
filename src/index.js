// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";

// יצירת root בגרסת React 18
const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(<App />);
