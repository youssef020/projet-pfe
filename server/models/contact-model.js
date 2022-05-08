import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';


const contactSchema = mongoose.Schema({
    nom: String,
    prenom: String,
    entreprise: String,
    telephone: Number,
    email: String,
    adresse: String,
},
{ collection: 'contact-data' });

autoIncrement.initialize(mongoose.connection);
contactSchema.plugin(autoIncrement.plugin, 'contact');
const postContact = mongoose.model('contact', contactSchema);


export default postContact;