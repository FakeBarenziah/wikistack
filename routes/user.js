const express = require("express");
const router = express.Router();
const addPage = require("../views/addPage");
const { db, Page, User } = require("../models");
const { userList, userPages } = require("../views");

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.send(userList(users));
  } catch (error) {
    next(error);
  }
});

router.get("/:userId", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    if (!user) throw "This person does not exist.";
    const pages = await Page.findAll({
      where: {
        authorId: req.params.userId
      }
    });
    res.send(userPages(user, pages));
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {});

router.put("/", async (req, res, next) => {
  res.send();
});

router.delete("/", async (req, res, next) => {
  res.send();
});

module.exports = router;
