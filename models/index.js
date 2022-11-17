const { Sequelize } = require("sequelize");

//1
const Posts = require("./posts");
const Users = require("./user");

const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

const sequelize = new Sequelize( //config의 db정보와 연결
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;

//2
db.Posts = Posts;
db.Users = User;

//3
Posts.init(sequelize);
Users.init(sequelize);

//4
Posts.associate(db);
Users.associate(db);

module.exports = db;