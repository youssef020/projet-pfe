import express from 'express';
import { getExpenses, addExpenses, getExpenseById, editExpense, deleteExpense } from '../controller/expense-controller.js';


const route_expense= express.Router();







route_expense.get('/all-expenses', getExpenses)
route_expense.post('/add-expense', addExpenses)
route_expense.get('/all-expenses/:id', getExpenseById)
route_expense.put('/:id', editExpense)
route_expense.delete('/:id', deleteExpense)






export default route_expense ;