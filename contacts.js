const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "db/contacts.json");


async function listContacts() {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
    }

async function getContactById(contactId) {
    const allContacts = await listContacts();
    const result = allContacts.find(item => item.id === contactId);
    if (!result) {
        return null;
    }
    return result;
}

async function removeContact(contactId) {
    const allContacts = await listContacts();
    const idx = allContacts.findIndex(item => item.id === contactId);
    if (idx === -1) {
        return null;
    }
    const [removeContact] = allContacts.splice(idx, 1);

    await fs.writeFile(contactsPath, JSON.stringify(allContacts));
    return removeContact;
 }

async function addContact(name, email, phone) {
    const allContacts = await listContacts();
    const newContact = {
        id: v4(),
        name: name,
        email: email,
        phone: phone,
    };
    allContacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(allContacts));
    return newContact;
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}