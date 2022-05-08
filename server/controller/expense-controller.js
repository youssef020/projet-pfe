import Expense from '../models/expense-model.js'


export const  getExpenses = async(request,response) =>{
    
    try{
        let  expense =  await Expense.find();
        response.status(200).json(expense);
    }catch( error ){
        response.status(404).json({ message: error.message })
    }
    
}

export const  addExpenses = async (request,response) =>{
    const expense = request.body;
    const newExpense= new Expense (expense);

    try{
         await newExpense.save();
        response.status(201).json(newExpense);
    } catch (error){
        response.status(409).json({ message: error.message});     
    }

}

export const getExpenseById = async (request, response) => {
    try{
        const expense = await Expense.findById(request.params.id);
        response.status(200).json(expense);
    }catch( error ){
        response.status(404).json({ message: error.message })
    }
}

export const editExpense = async (request, response) => {
    let expense = await Expense.findById(request.params.id);
    expense = request.body;

    const editExpense = new Expense(expense);
    try{
        await Expense.updateOne({_id: request.params.id}, editExpense);
        response.status(201).json(editExpense);
    } catch (error){
        response.status(409).json({ message: error.message});     
    }
}

export const deleteExpense = async (request, response) => {
    try{
        await Expense.deleteOne({_id: request.params.id});
        response.status(201).json("Expense deleted Successfully");
    } catch (error){
        response.status(409).json({ message: error.message});     
    }
}

