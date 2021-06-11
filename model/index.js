const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "/contacts.json");

// const contacts = require('./contacts.json')
// getAll ===============================================================
const listContacts = async () => {
  try {
    const dataContacts = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
    // return console.table(dataContacts);
    return dataContacts;
  } catch (error) {
    throw error;
  }
};
// console.log(listContacts());
// getOne ===============================================================
const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contact =
      contacts.find(({ id }) => id === contactId) ||
      `Contact ID ${contactId} not found`;

    // return console.table(contact);
    return contact;
  } catch (error) {
    throw error;
  }
};
// console.log(getContactById(5));
// del ===============================================================
const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const filteredContacts = contacts.filter(({ id }) => id === contactId);
    const newContacts = JSON.stringify(filteredContacts);
    fs.writeFile(contactsPath, newContacts);

    return newContacts;
  } catch (error) {
    throw error;
  }
};
// add ===============================================================
const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const newContact = { id: v4(), ...body };
    const updatedContacts = [...contacts, newContact];
    const newListContacts = JSON.stringify(updatedContacts);
    fs.writeFile(contactsPath, newListContacts);

    return newContact;
  } catch (error) {
    throw error;
  }
};
// update ===============================================================
const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(({ id }) => contactId === id);
    if (index === -1) return;
    contacts[index] = { ...contacts[index], ...body };
    const updatedContact = JSON.stringify(contacts);
    await fs.writeFile(contactsPath, updatedContact);

    return contacts[index];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
