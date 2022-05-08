import express from 'express';
import { getInvoices, addInvoices, getInvoiceById, editInvoice, deleteInvoice } from '../controller/invoice-controller.js';


const route= express.Router();




route.get('/', getInvoices)
route.post('/add', addInvoices)
route.get('/:id', getInvoiceById)
route.put('/:id', editInvoice)
route.delete('/:id', deleteInvoice)









export default route ;