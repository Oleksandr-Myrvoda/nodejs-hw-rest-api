const express = require("express");
const router = express.Router();

const { contacts: ctrl } = require("../controllers");

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getOne);

router.post("/", express.json(), ctrl.add);

router.put("/:contactId", express.json(), ctrl.updateOne);

router.patch("/:contactId/favorite", express.json(), ctrl.updateStatus);

router.delete("/:contactId", ctrl.del);

module.exports = router;
