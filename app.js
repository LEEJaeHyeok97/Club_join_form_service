import express from "express";
import api from "./api";




const app = express();
const port = 3000;


let nextId = 4; // posts 변수에 id를 설정합니다

let posts = [ // posts 배열
  { // posts[0]
    id: 1,
    content: 'A',
    writer: 1,
  },
  { // posts [1]
    id: 2,
    content: 'B',
    writer: 2,
  },
  { // posts [2]
    id: 3,
    content: 'C',
    writer: 3,
  },
];

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));

app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', (req,res) => {
    console.log("요청받음"); 
    console.log(req.body.content);
    const id = req.header("X-User-Id"); //user ID       
    const { content } = req.body.content;
    const postCount = posts.push({
      id: nextId++,
      content,
      writer: id,
    });
    return res.json({
      data: {
        post: {
          id: postCount,
        },
      },
    });
  });

app.use("/api", api);

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});