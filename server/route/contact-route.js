import express from 'express';
import { getContacts, addContacts, getContactById, editContact, deleteContact } from '../controller/contact-controller.js';


const route_contact= express.Router();







route_contact.get('/all-contacts', getContacts)
route_contact.post('/add-contact', addContacts)
route_contact.get('/all-contacts/:id', getContactById)
route_contact.put('/:id', editContact)
route_contact.delete('/:id', deleteContact)






export default route_contact ;