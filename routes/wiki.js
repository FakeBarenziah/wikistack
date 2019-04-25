const express = require("express");
const router = express.Router();
const { addPage, wikiPage, main } = require("../views");
const { db, Page, User } = require("../models");

router.get("/", async (req, res, next) => {
  res.send(main(await Page.findAll()));
});

router.post("/", async (req, res, next) => {
  const page = new Page({
    title: req.body.title,
    content: req.body.content,
    status: req.body.status
  });

  try {
    await page.save();
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) {
    next(error);
  }
});

router.get("/add", (req, res, next) => {
  console.log("made it to wiki");
  res.send(addPage());
});

router.get("/:slug", async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug
      }
    });
    res.send(wikiPage(page));
    // res.json(page);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
