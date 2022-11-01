import { Router } from "express";
import Posts from "./posts";


const app = Router();


app.use("/posts", Posts);



export default app;