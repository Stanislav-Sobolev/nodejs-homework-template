const express = require("express");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const result = await listContacts();
  res.status(200).json({
    status: "success",
    code: 201,
    data: { result },
  });
});

router.get("/:contactId", async (req, res, next) => {
  const result = await getContactById(req.params.contactId);

  if (result.length === 0) {
    res.status(404).json({ message: "Not found" });
    return;
  }

  res.status(200).json(result);
});

router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body;

  if (name && email && phone) {
    const result = await addContact(req.body);

    if (result.error) {
      res.status(400).json(result);
      return;
    }

    res.status(201).json(result);

    return;
  }

  res.status(400).json({ message: "missing required name field" });
});

router.delete("/:contactId", async (req, res, next) => {
  const result = await removeContact(req.params.contactId);

  if (result) {
    res.status(200).json({ message: "contact deleted" });

    return;
  }

  res.status(404).json({ message: "Not found" });
});

router.put("/:contactId", async (req, res, next) => {
  if (Object.entries(req.body).length === 0) {
    res.status(400).json({ message: "missing fields" });
    return;
  }

  const result = await updateContact(req.params.contactId, req.body);

  if (result.error) {
    res.status(400).json(result);
    return;
  }

  if (result) {
    res.status(200).json(result);
    return;
  }

  res.status(404).json({ message: "Not found" });
});

module.exports = router;
