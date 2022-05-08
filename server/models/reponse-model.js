import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';


const reponseSchema = mongoose.Schema({
    email: String,
    reponse: String,
},


{ collection: 'reponse-data' });

autoIncrement.initialize(mongoose.connection);
reponseSchema.plugin(autoIncrement.plugin, 'reponse');
const postReponse = mongoose.model('reponse', reponseSchema);


export default postReponse;