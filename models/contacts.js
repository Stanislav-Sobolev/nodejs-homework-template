const fs = require("fs/promises");
const path = require("path");
const db = require("./contacts.json");
const dbPath = path.join(__dirname, "contacts.json");
const Joi = require("joi");

const listContacts = async () => {
  return await db;
};

const getContactById = async (contactId) => {
  const [result] = await db.filter((el) => el.id === contactId);
  return result;
};

const removeContact = async (contactId) => {
  const idStringified = contactId.toString();

  const findIndexContact = await db.findIndex((el) => el.id === idStringified);

  if (findIndexContact === -1) {
    return null;
  }

  const [removedContact] = db.splice(findIndexContact, 1);
  await fs.writeFile(dbPath, JSON.stringify(db, null, 2));

  return removedContact;
};

const addContact = async (body) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    phone: Joi.number().min(3).required(),
  });

  const validateResult = schema.validate(body);

  if (validateResult.error) {
    return { error: validateResult.error.details };
  }

  const newContact = {
    id: Date.now().toString(),
    ...body,
  };

  await db.push(newContact);

  await fs.writeFile(dbPath, JSON.stringify(db, null, 2));

  return newContact;
};

const updateContact = async (contactId, body) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    phone: Joi.number().min(3),
  });

  const validateResult = schema.validate(body);

  if (validateResult.error) {
    return { error: validateResult.error.details };
  }

  const idStringifyed = contactId.toString();

  const findedIndex = await db.findIndex((el) => el.id === idStringifyed);

  if (findedIndex === -1) {
    return null;
  }

  db[findedIndex] = {
    id: contactId,
    ...body,
  };

  await fs.writeFile(dbPath, JSON.stringify(db, null, 2));

  return db[findedIndex];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
