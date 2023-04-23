import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./style/index.less";

const root = createRoot(document.getElementById("app") as HTMLDivElement);
root.render(<App />);
