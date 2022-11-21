import { Router } from "express";
import { Posts } from "../models";
import { verifyToken } from "./middlewares";

const app = Router();

//글 생성
app.post("/", verifyToken, async (req, res) => {
  const writer = req.decode.id;
  const post_list = await Posts.create({
    title: "title",
    content1: req.body.content_1,
    content2: req.body.content_2,
    content3: req.body.content_3,
    writer: writer,
  });

  res.redirect("/submitComplete");

  // res.sendFile(__dirname + '../views/formSubmitted.html');
});

export default app;
