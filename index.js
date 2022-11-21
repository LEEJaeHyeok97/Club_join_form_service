import express from "express";
import api from "./api";
require("dotenv").config();

const app = express();
const port = 3000;

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

const { sequelize } = require("./models");

sequelize
  .sync({ force: true })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api", api);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/join.html");
});

app.get("/submitComplete", (req, res) => {
  res.sendFile(__dirname + "/views/formSubmitted.html");
});

app.get("/index1", (req, res) => {
  res.sendFile(__dirname + "/views/index1.html");
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/views/loginPage.html");
});

// app.post('/', (req,res) => {
//     res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
//     res.write('<style>* {background-color: black;color: white;}</style>');
//     res.write('<h1>Hello Node!</h1>');
//     res.write(req.body.content_1);
//     res.write('<br>');
//     res.write(req.body.content_2);
//     res.write(req.body.content_3);
//     res.write('<h2>바닥</h2>');
//   });

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
