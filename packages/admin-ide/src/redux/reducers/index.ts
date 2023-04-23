import {combineReducers} from "redux";
import guard from "./guard";
import usr from "./usr";
import boot from "./boot";

export default combineReducers({
    guard,
    usr,
    boot
});