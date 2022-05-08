import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';


const messageSchema = mongoose.Schema({
    name: String,
    email: String,
    message: String,
    etat: String,
        
},


{ collection: 'message-data' });

autoIncrement.initialize(mongoose.connection);
messageSchema.plugin(autoIncrement.plugin, 'message');
const postMessage = mongoose.model('message', messageSchema);


export default postMessage;