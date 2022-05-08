import mongoose, { Schema } from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';
const {ObjectId} = mongoose.Schema;


const Gerant =  new mongoose.Schema(
    {
        name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		role: {
			type: String,
			default: "user",
			enum: ["user", "admin"]
		  },
		resetToken: { type: String},
		expireToken: { type: Date},
    // invoices:[{type:mongoose.Schema.Types.ObjectId,ref:'user'}],


    
 
},
);

autoIncrement.initialize(mongoose.connection);
Gerant.plugin(autoIncrement.plugin, 'gerants');
const postGerants = mongoose.model('gerants', Gerant);


export default postGerants;