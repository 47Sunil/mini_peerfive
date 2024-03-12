const express = require("express");
const router = express.Router();

const { createUser, editUser } = require("../controllers/userController");
const {
  transaction,
  //   deleteTransaction,
  getTransaction,

  getRewartPoints,
} = require("../controllers/userPointsController");

router.post("/users", createUser);
router.patch("/users/:id", editUser);

router.post("/p5", transaction);
// router.delete("/:id", deleteTransaction);
router.get("/transection/:id", getTransaction);
router.post("/rewordPoints", getRewartPoints);

module.exports = router;
