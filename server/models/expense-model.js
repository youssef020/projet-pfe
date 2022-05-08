import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';


const expenseSchema = mongoose.Schema({
    Categorie: String,
    Date_paie: Date,
    Etat_paie: String,
    Prix: Number
},
{ collection: 'expense-data' });

autoIncrement.initialize(mongoose.connection);
expenseSchema.plugin(autoIncrement.plugin, 'expense');
const postExpense = mongoose.model('expense', expenseSchema);


export default postExpense;