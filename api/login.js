import { Router } from "express";
import bcrypt from "bcrypt";
import { User } from "../models";
import { sign } from "jsonwebtoken";

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
  let hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    email: email,
    password: hashedPassword,
  });

  res.redirect("/login");
});

//로그인
app.post("/auth/log", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const loginCheck = await User.findAll({
    where: { email: email },
  });

  if (loginCheck.length === 0) {
    return res.json({
      error: "User not exists",
    });
  } else if (loginCheck.length === 1) {
    const same = bcrypt.compareSync(password, loginCheck[0].password);
    if (same) {
      const token = sign(
        {
          id: loginCheck[0].id,
          email: loginCheck[0].email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "10m",
          issuer: "developer",
        }
      );

      res.setHeader("authorization", token);
      res.cookie("user", token);
      res.redirect("/index1");

      //   return res.json({
      //     code: 200,
      //     message: "토큰이 발급되었습니다. 10분",
      //     token,
      //   });
    } else {
      return res.json({
        error: "Passwords do not match",
      });
    }
  }
});

export default app;
