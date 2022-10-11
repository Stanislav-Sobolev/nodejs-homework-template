const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");

const getAllContacts = async (req, res, next) => {
  try {
    const result = await listContacts();
    res.status(200).json({
      status: "success",
      code: 201,
      data: { result },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getContact = async (req, res, next) => {
  try {
    const result = await getContactById(req.params.contactId);

    if (result.length === 0) {
      res.status(404).json({ message: "Not found" });
      return;
    }

    res.json({
      status: "success",
      code: 200,
      data: {
        contacts: result,
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const createContact = async (req, res, next) => {
  try {
    const result = await addContact(req.body);

    res.status(201).json({
      status: "success",
      code: 201,
      data: result,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const result = await removeContact(req.params.contactId);
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: { contacts: result },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found task id: ${req.params.contactId}`,
        data: "Not Found",
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const changeContact = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const result = await updateContact(contactId, req.body);

    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: { contacts: result },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found task id: ${contactId}`,
        data: "Not Found",
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = {
  getAllContacts,
  getContact,
  createContact,
  deleteContact,
  changeContact,
  updateContact,
};
