import { Router } from "express";
import { Posts } from "../models";

const router = Router();

//글 생성
router.post("/", async (req, res) => {
  const post_list = await Posts.create({
    title: "1",
    content1: req.body.content_1,
    content2: req.body.content_2,
    content3: req.body.content_3,
    writer: "1",
  });

  res.redirect("/submitComplete");

  // res.sendFile(__dirname + '../views/formSubmitted.html');
});

export default router;
