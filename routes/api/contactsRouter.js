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

router.get("/", authorization, ctrlWrapper(getAllContacts));

router.get("/:contactId", authorization, ctrlWrapper(getContact));

router.post(
  "/",
  authorization,
  validationBody(schemaContact),
  ctrlWrapper(createContact)
);

router.delete("/:contactId", authorization, ctrlWrapper(deleteContact));

router.put(
  "/:contactId",
  authorization,
  validationBody(schemaContact),
  ctrlWrapper(updateContact)
);

router.patch(
  "/:contactId/favorite",
  authorization,
  validationBody(schemaContactFavorite),
  ctrlWrapper(updateStatusContact)
);

module.exports = router;
