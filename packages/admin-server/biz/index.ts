import { Router } from "express";
import guard from "./guard";
import user from "./user";

export default function(router:Router){
    guard(router);
    user(router);
}