import React from "react";
import { createRoot } from "react-dom/client";
import UI from "@adminstudio/ui";

const root = createRoot(document.getElementById("app") as HTMLDivElement);
root.render(<UI />);
