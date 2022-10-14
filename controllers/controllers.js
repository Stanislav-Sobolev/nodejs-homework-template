const Contact = require("../models/contactModel");

const getAllContacts = async (req, res, next) => {
  const result = await Contact.find();
  res.status(200).json({
    status: "success",
    code: 201,
    data: { result },
  });
};

const getContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findOne({ _id: contactId });

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

  res.status(201).json({
    status: "success",
    code: 201,
    data: result,
  });
};

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findOneAndRemove({ _id: contactId });

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
  const result = await Contact.findByIdAndUpdate({ _id: contactId }, req.body);

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

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(
    { _id: contactId },
    { $set: { favorite: req.body.favorite } },
    { new: true }
  );

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
    message: `Not found contact id: ${contactId}`,
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
