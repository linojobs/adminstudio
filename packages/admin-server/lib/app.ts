import Express,{Request,Response,Router} from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import session from "express-session";
const app = Express();
const router = Router();

app.disable("x-powered-by");
app.use(session({
    secret:"whosyourdaddy?",
    name:"whoareyou"
}));
app.use(helmet());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// custom 404
app.use((req:Request, res:Response) => {
    res.status(404).send("Sorry can't find that!");
});
  
// custom error handler
app.use((err:any, req:Request, res:Response) => {
    res.status(500).send("Something broke!");
});


export function ok(data:any){
    return {
        code:0,
        data
    };
}

export function fail(err:(string|number)[]){
    return {
        code:err[0],
        msg:err[1]
    };
}

export default function(port:number,biz:(router:Router)=>void){
    biz(router);
    app.use("/api",router);
    app.listen(port, function () {
        console.log(`server start at ${port}`);
    });
}