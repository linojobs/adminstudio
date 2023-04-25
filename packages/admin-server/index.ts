import Express, { Request, Response } from "express";
import * as user from "./biz/user";
import guard from "./biz/guard";

// don't change port
const port = 3000;
const app = Express();

app.use(guard());
app.use(user.useradd());

app.post("/api", async function (req: Request, res: Response) {
    res.json();
});

app.listen(port, function () {
    console.log(`server start at ${port}`);
});