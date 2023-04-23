import Express from "express";

const port = 3000;
const app = Express();

app.listen(port,()=>{
    console.log(`Server listen at ${port}`);
});