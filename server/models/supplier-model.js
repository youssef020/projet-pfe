import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';


const supplierSchema = mongoose.Schema({
    name: String,
    username: String,
    email: String,
    phone: Number
},
{ collection: 'supplier-data' });

autoIncrement.initialize(mongoose.connection);
supplierSchema.plugin(autoIncrement.plugin, 'supplier');
const postSupplier = mongoose.model('supplier', supplierSchema);


export default postSupplier;