import Supplier from '../models/supplier-model.js'


export const  getSuppliers = async(request,response) =>{
    
    try{
        let  supplier =  await Supplier.find();
        response.status(200).json(supplier);
    }catch( error ){
        response.status(404).json({ message: error.message })
    }
    
}

export const  addSuppliers = async (request,response) =>{
    const supplier = request.body;
    const newSupplier= new Supplier (supplier);

    try{
         await newSupplier.save();
        response.status(201).json(newSupplier);
    } catch (error){
        response.status(409).json({ message: error.message});     
    }

}

export const getSupplierById = async (request, response) => {
    try{
        const supplier = await Supplier.findById(request.params.id);
        response.status(200).json(supplier);
    }catch( error ){
        response.status(404).json({ message: error.message })
    }
}

export const editSupplier = async (request, response) => {
    let supplier = await Supplier.findById(request.params.id);
    supplier = request.body;

    const editSupplier = new Supplier(supplier);
    try{
        await Supplier.updateOne({_id: request.params.id}, editSupplier);
        response.status(201).json(editSupplier);
    } catch (error){
        response.status(409).json({ message: error.message});     
    }
}

export const deleteSupplier = async (request, response) => {
    try{
        await Supplier.deleteOne({_id: request.params.id});
        response.status(201).json("Supplier deleted Successfully");
    } catch (error){
        response.status(409).json({ message: error.message});     
    }
}

