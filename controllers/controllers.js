const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  changeContact,
} = require("../models/contacts");

const getAllContacts = async (req, res, next) => {
  const result = await listContacts();
  res.status(200).json({
    status: "success",
    code: 201,
    data: { result },
  });
};

const getContact = async (req, res, next) => {
  const result = await getContactById(req.params.contactId);

  if (!result) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.json({
    status: "success",
    code: 200,
    data: { contacts: result },
  });
};

const createContact = async (req, res, next) => {
  const result = await addContact(req.body);

  res.status(201).json({
    status: "success",
    code: 201,
    data: result,
  });
};

const deleteContact = async (req, res, next) => {
  const result = await removeContact(req.params.contactId);

  if (!result) {
    res.status(404).json({ message: "Not found" });
    return;
  }

  res.json({
    status: "success",
    code: 200,
    data: { contacts: result },
  });
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await changeContact(contactId, req.body);

  if (result) {
    res.json({
      status: "success",
      code: 200,
      data: { contacts: result },
    });
    return;
  }
  res.status(404).json({
    status: "error",
    code: 404,
    message: `Not found task id: ${contactId}`,
    data: "Not Found",
  });
};

module.exports = {
  getAllContacts,
  getContact,
  createContact,
  deleteContact,
  updateContact,
};
