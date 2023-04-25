import { NextFunction, Request, Response } from "express";

export default function gurad(){
    return function(req:Request,res:Response,next:NextFunction){
        next();
    };
}