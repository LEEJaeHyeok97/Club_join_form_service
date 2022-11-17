import { Router } from "express";
import Posts from "./posts";
import Login from "./login";


const app = Router();


app.use("/posts", Posts);
app.use("/login", Login);



export default app;