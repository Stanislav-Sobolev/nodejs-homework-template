const express = require("express");
const {
  getAllContacts,
  getContact,
  createContact,
  deleteContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contactCtrl");
const validationBody = require("../../middlewares/validationBody");
const ctrlWrapper = require("../../middlewares/ctrlWrapper");
const {
  schemaContact,
  schemaContactFavorite,
} = require("../../models/contactModel");
const authorization = require("../../middlewares/authorization");

const router = express.Router();

router.all("/", authorization);

router.get("/", ctrlWrapper(getAllContacts));

router.get("/:contactId", ctrlWrapper(getContact));

router.post("/", validationBody(schemaContact), ctrlWrapper(createContact));

router.delete("/:contactId", ctrlWrapper(deleteContact));

router.put(
  "/:contactId",
  validationBody(schemaContact),
  ctrlWrapper(updateContact)
);

router.patch(
  "/:contactId/favorite",
  validationBody(schemaContactFavorite),
  ctrlWrapper(updateStatusContact)
);

module.exports = router;
