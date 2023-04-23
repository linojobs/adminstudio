import Express, { Request, Response } from "express";
import Account from "./model/account";

// don't change port
const port = 3000;
const app = Express();

app.get("/api", async function (req: Request, res: Response) {
    try {
        const account = Account();
        const finder = account.finder();
        const record = account.newRecord()
            .set("username", "admin")
            .set("passwd", "admin");
        await record.save();
        const results = await finder.fetchAll();
        res.json(results);
    } catch (error: any) {
        res.send(error.message);
    }
});

app.listen(port, function () {
    console.log(`server start at ${port}`);
});