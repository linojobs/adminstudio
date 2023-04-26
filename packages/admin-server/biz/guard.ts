import { Request, Response, Router } from "express";
import { find_by_username,passwd_verify } from "../model/account";
import { fail, ok } from "../lib/app";
import { USER_NOT_FOUND, USER_PWD_WRONG } from "./const/errno";

export default function(router:Router){
    router.post("/login",async function(req:Request,res:Response){
        const {username,password} = req.body;
        const user = await find_by_username(username);
        if(user.get("id") === undefined){
            return res.json(fail(USER_NOT_FOUND));
        }
        const pwd_equal = await passwd_verify(password,user.get("passwd") as string);
        if(pwd_equal){
            return res.json(ok(""));
        } else {
            return res.json(fail(USER_PWD_WRONG));
        }
    });
}