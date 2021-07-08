const express = require("express");
const router = express.Router();

const { users: ctrl } = require("../controllers");
const useAuth = require("./useAuth");

router.post("/signup", express.json(), ctrl.signup);

router.post("/login", express.json(), ctrl.login);

router.get("/getCurrent", useAuth, ctrl.getCurrent);

router.post("/logout", useAuth, ctrl.logout);

router.post(
  "/avatars",
  useAuth,
  ctrl.avatar.upload.single("avatar"),
  ctrl.avatar.avatarUpload
);

router.get("/verify/:verificationToken", ctrl.verify);

router.post("/verify", express.json(), ctrl.resendVerify);

module.exports = router;
