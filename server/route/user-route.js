import express from 'express';
import { getUsers, addUsers, getUserById, editUser, deleteUser } from '../controller/user-controller.js';


const routes= express.Router();




routes.get('/all-users', getUsers)
routes.post('/add', addUsers)
routes.get('/:id', getUserById)
routes.put('/:id', editUser)
routes.delete('/:id', deleteUser)









export default routes ;