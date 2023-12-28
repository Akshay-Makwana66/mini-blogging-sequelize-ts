import {config} from "dotenv";
config();
import express from "express";
import db from "./models/index"
import routes from "./routes/routes";
const port = process.env.PORT;
const app = express();

app.use(express.json());  

app.use("/",routes)
app.listen(port,()=>{
    console.log(`server running on port ${port}`);
})        