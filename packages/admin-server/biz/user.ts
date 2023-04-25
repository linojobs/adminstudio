import { NextFunction, Request, Response } from "express";

export function useradd(){
    return async function(req:Request,res:Response,next:NextFunction){
        const {cmd} = req.params;
        next();
    };
}