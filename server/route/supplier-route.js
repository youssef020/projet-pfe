import express from 'express';
import { getSuppliers, addSuppliers, getSupplierById, editSupplier, deleteSupplier } from '../controller/supplier-controller.js';


const route_supplier= express.Router();







route_supplier.get('/all-suppliers', getSuppliers)
route_supplier.post('/add-supplier', addSuppliers)
route_supplier.get('/all-suppliers/:id', getSupplierById)
route_supplier.put('/:id', editSupplier)
route_supplier.delete('/:id', deleteSupplier)






export default route_supplier ;