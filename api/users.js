const express = require("express");
const router = express.Router();
const { users: ctrl } = require("../controllers");
const useAuth = require("./useAuth");

router.post("/signup", express.json(), ctrl.signup);
router.post("/login", express.json(), ctrl.login);
router.post("/getCurrent", useAuth, ctrl.getCurrent);
router.post("/logout", useAuth, ctrl.logout);

module.exports = router;
