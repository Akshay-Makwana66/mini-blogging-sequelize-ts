import express from "express";
require("./models/index")

import routes from "./routes/routes";
const app = express();

app.use(express.json());


app.use("/",routes)
app.listen(3000,()=>{
    console.log("server running on port 3000");
})  