const express = require("express");
const {
  getAllContacts,
  getContact,
  createContact,
  deleteContact,
  updateContact,
} = require("../../controllers/controllers");
const validationBody = require("../../middlewares/validationBody");
const ctrlWrapper = require("../../middlewares/ctrlWrapper");
const schemaProduct = require("../../schemas/productSchema");

const validateWrapper = validationBody(schemaProduct);

const router = express.Router();

router.get("/", ctrlWrapper(getAllContacts));

router.get("/:contactId", ctrlWrapper(getContact));

router.post("/", validateWrapper, ctrlWrapper(createContact));

router.delete("/:contactId", ctrlWrapper(deleteContact));

router.put("/:contactId", validateWrapper, ctrlWrapper(updateContact));

module.exports = router;
