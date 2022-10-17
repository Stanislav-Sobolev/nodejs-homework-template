const { Contact } = require("../models/contactModel");

const getAllContacts = async (req, res, next) => {
  const result = await Contact.find();

  res.json({
    status: "success",
    code: 200,
    data: { contacts: result },
  });
};

const getContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);

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
  const result = await Contact.create(req.body);

  res.json({
    status: "success",
    code: 201,
    data: { contacts: result },
  });
};

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);

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
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    res.status(404).json({
      status: "error",
      message: `Not found contact id: ${contactId}`,
    });

    return;
  }

  res.json({
    status: "success",
    code: 200,
    data: { contacts: result },
  });
};

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(
    { _id: contactId },
    { $set: { favorite: req.body.favorite } },
    { new: true }
  );

  if (!result) {
    res.status(404).json({
      status: "error",
      message: `Not found contact id: ${contactId}`,
    });

    return;
  }
  res.json({
    status: "success",
    code: 200,
    data: { contacts: result },
  });
};

module.exports = {
  getAllContacts,
  getContact,
  createContact,
  deleteContact,
  updateContact,
  updateStatusContact,
};
