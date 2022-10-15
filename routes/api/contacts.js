const express = require("express");
const {
  getAllContacts,
  getContact,
  createContact,
  deleteContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/controllers");
const validationBody = require("../../middlewares/validationBody");
const ctrlWrapper = require("../../middlewares/ctrlWrapper");
const {
  schemaContact,
  schemaContactFavorite,
} = require("../../models/contactModel");

const router = express.Router();

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
