import express from 'express';
import { getReponses, addReponses, getReponseById, editReponse, deleteReponse,addMail } from '../controller/reponse-controller';


const route_reponse= express.Router();







route_reponse.get('/all-reponses', getReponses)
route_reponse.post('/add-reponse', addReponses)
route_reponse.post('/add-mail', addMail)
route_reponse.get('/all-reponses/:id', getReponseById)
route_reponse.put('/:id', editReponse)
route_reponse.delete('/:id', deleteReponse)






export default route_reponse ;