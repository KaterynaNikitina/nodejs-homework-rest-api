import fs from 'fs/promises';
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("models", "contacts.json");

const updateContacts = (contacts) => 
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  return result || null;   
}

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone
  }
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex((item) => item.id === contactId);

  if (contactIndex === -1) {
    return null;
  }
  contacts[contactIndex] = { contactId, ... body };
  await updateContacts(contacts);
  return contacts[contactIndex];
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const indexToRemove = contacts.findIndex((item) => item.id === contactId)
  if (indexToRemove === -1) {
    return null;
  }
  const [result] = contacts.splice(indexToRemove, 1);
  await updateContacts(contacts);
  return result;
}

export default {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
}
