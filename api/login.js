import { Router } from "express";
import { Users } from "../models";
import bcrypt from "bcrypt";
import { User } from "../models";

const app = Router();

//회원가입
app.post("/auth/register", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const loginCheck = User.findAll({
    where: { email },
  });

  if (loginCheck === 1) {
    return res.json({
      Error: "User already exits",
    });
  }

  //단방향 암호화 후 DB에 create
  let hashedPassword = await bcrypt.hash(password, 1);
  const newUser = await User.create({
    email: email,
    password: hashedPassword,
  });
  res.json({
    data: {
      user: {
        id: newUser.id,
        emai: newUser.email,
      },
    },
  });
});

//로그인

export default app;
