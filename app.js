const express = require("express");
const morgan = require("morgan");
const app = express();
const layout = require("./views/layout");
const { db, Page, User } = require("./models");
app.use(express.static(__dirname + `/public`));
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

const init = async () => {
  await db.sync({ force: true });
  app.listen(3001, () => {
    console.log("db server is listening");
  });
};

init();

app.get("/", (req, res) => {
  res.send(layout(""));
});

// db.authenticate().then(() => {
//   console.log("connected to the db");
// });

// app.listen(3000, console.log("working"));
