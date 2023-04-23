import React from "react";
import { createDispatchHook, createSelectorHook } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import reducers from "./reducers";

export { Provider, connect } from "react-redux";
export const OSContext = React.createContext<any>(null);
export const useDispatch = createDispatchHook(OSContext);
export const useSelector = createSelectorHook(OSContext);

export default configureStore({
    reducer: reducers
});