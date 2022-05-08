import express from 'express';
import { getMessages, addMessages, getMessageById, editMessage, deleteMessage } from '../controller/message-controller.js';


const route_message= express.Router();







route_message.get('/all-messages', getMessages)
route_message.post('/add-message', addMessages)
route_message.get('/all-messages/:id', getMessageById)
route_message.put('/:id', editMessage)
route_message.delete('/:id', deleteMessage)






export default route_message ;