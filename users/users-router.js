const express = require("express");
const authenticate = require("../middleware/authenticate");
const usersModel = require("./users-model");

const router = express.Router();

router.get("/", authenticate(), async (req, res, next) => {
  try {
    const users = await usersModel.get();

    res.json(users);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
