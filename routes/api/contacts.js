const express = require("express");

const {
  getAllContacts,
  getContact,
  createContact,
  deleteContact,
  changeContact,
} = require("../../controls/controls");

const router = express.Router();

router.get("/", getAllContacts);

router.get("/:contactId", getContact);

router.post("/", createContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", changeContact);

module.exports = router;
