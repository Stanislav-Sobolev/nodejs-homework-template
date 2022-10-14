const fs = require("fs/promises");
const path = require("path");

const dbPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const readFileContacts = await fs.readFile(dbPath, "utf-8");
  return JSON.parse(readFileContacts);
};

const getContactById = async (contactId) => {
  const getAllContacts = await listContacts();
  const [result] = getAllContacts.filter((el) => el.id === contactId);
  return result || null;
};

const removeContact = async (contactId) => {
  const idStringified = contactId.toString();
  const getAllContacts = await listContacts();

  const findIndexContact = getAllContacts.findIndex(
    (el) => el.id === idStringified
  );

  if (findIndexContact === -1) {
    return null;
  }

  const [removedContact] = getAllContacts.splice(findIndexContact, 1);
  await fs.writeFile(dbPath, JSON.stringify(getAllContacts, null, 2));

  return removedContact;
};

const addContact = async (body) => {
  const newContact = {
    id: Date.now().toString(),
    ...body,
  };

  const getAllContacts = await listContacts();

  getAllContacts.push(newContact);

  await fs.writeFile(dbPath, JSON.stringify(getAllContacts, null, 2));

  return newContact;
};

const changeContact = async (contactId, body) => {
  const idStringifyed = contactId.toString();

  const getAllContacts = await listContacts();

  const findedIndex = await getAllContacts.findIndex(
    (el) => el.id === idStringifyed
  );

  if (findedIndex === -1) {
    return null;
  }

  getAllContacts[findedIndex] = {
    id: contactId,
    ...body,
  };

  await fs.writeFile(dbPath, JSON.stringify(getAllContacts, null, 2));

  return getAllContacts[findedIndex];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  changeContact,
};
