import { Request, Response, Router } from "express";

export default function(router:Router){
    router.post("/user",async function(req:Request,res:Response){
        const {cmd} = req.params;
    });
}