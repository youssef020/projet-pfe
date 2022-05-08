import Message from '../models/message-model.js'


export const  getMessages = async(request,response) =>{
    
    try{
        let  message =  await Message.find();
        response.status(200).json(message);
    }catch( error ){
        response.status(404).json({ message: error.message })
    }
    
}

export const  addMessages = async (request,response) =>{
    const message = request.body;
    const newMessage= new Message (message);

    try{
         await newMessage.save();
        response.status(201).json(newMessage);
    } catch (error){
        response.status(409).json({ message: error.message});     
    }

}

export const getMessageById = async (request, response) => {
    try{
        const message = await Message.findById(request.params.id);
        response.status(200).json(message);
    }catch( error ){
        response.status(404).json({ message: error.message })
    }
}

export const editMessage = async (request, response) => {
    let message = await Message.findById(request.params.id);
    message = request.body;

    const editMessage = new Message(message);
    try{
        await Message.updateOne({_id: request.params.id}, editMessage);
        response.status(201).json(editMessage);
    } catch (error){
        response.status(409).json({ message: error.message});     
    }
}

export const deleteMessage = async (request, response) => {
    try{
        await Message.deleteOne({_id: request.params.id});
        response.status(201).json("Message deleted Successfully");
    } catch (error){
        response.status(409).json({ message: error.message});     
    }
}

