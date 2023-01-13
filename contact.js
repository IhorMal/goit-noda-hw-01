
const fs = require("fs").promises;
const path = require('path');
var uniqid = require('uniqid');
const contactsPath = path.join(__dirname.split('contacts')[0], '/db/contact.json');


 async function listContacts() {
  try {
    const js = await fs.readFile(contactsPath);
    return JSON.parse(js)
  } catch (error) {
    console.error(error)
  }
 
  }
  
  async function getContactById(contactId) {
    try {
    const contact = await fs.readFile(contactsPath)
    const json =  JSON.parse(contact);
    return json.find(element => {
    return  String(contactId) === element.id
    }) 
    } catch (error) {
      console.error(error)
    }

  }
  
  async function removeContact(contactId) {
   try {
    const contact = await fs.readFile(contactsPath);
    const json =  JSON.parse(contact);
    const searchСontact = json.findIndex(element => String(contactId) === element.id)

    if (searchСontact === -1) {
      return null
    }

    const removeContact = json.splice(searchСontact, 1);
    fs.writeFile(contactsPath, JSON.stringify(json));;
    return removeContact

   } catch (error) {
    console.error(error)
   }
  }
  
  async function addContact(name, email, phone) {
   try {
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
   } catch (error) {
    console.error(error)
   }
 
  }
 

 module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
 }