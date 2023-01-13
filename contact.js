
const fs = require("fs").promises;
const path = require('path');
var uniqid = require('uniqid');
const contactsPath = path.join(__dirname.split('contacts')[0], '/db/contact.json');


 async function listContacts() {
  const js = await fs.readFile(contactsPath);
  return JSON.parse(js)
  }
  
  async function getContactById(contactId) {
    const contact = await fs.readFile(contactsPath)
    const json =  JSON.parse(contact);

    return json.find(element => {
    return  Number(contactId) === element.id
    }) 
  }
  
  async function removeContact(contactId) {
    const contact = await fs.readFile(contactsPath);
    const json =  JSON.parse(contact);
    const searchСontact = json.findIndex(element => Number(contactId) === element.id)
    if (searchСontact === -1) {
      return null
    }
    const removeContact = json.splice(searchСontact, 1);
    fs.writeFile(contactsPath, JSON.stringify(json));;
    return removeContact
  }
  
  async function addContact(name, email, phone) {
    const contacts = await fs.readFile(contactsPath);
    const json =  JSON.parse(contacts);
    const contact = {
      "id": uniqid(),
      "name": name,
      "email": email,
      "phone": phone,
    }
    json.push(contact)
    fs.writeFile(contactsPath, JSON.stringify(json));
    return contact
    
  }
 

 module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
 }