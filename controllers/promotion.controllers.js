const { response } = require("express");
const Promotion = require('../models/Promotion');
const cloudinary = require('../utils/cloudinary');


const index = async(req, res = response) => {
    try{
        const query = {estado: true};
        const {page = 0} = req.query;

        const promotions = await Promotion.paginate(query, {page, limit:10});
        res.json(promotions)
    }catch(err){
        res.status(500).json(err);
    }
}



const store = async(req, res = response) => {
    try{
        const result = await cloudinary.uploader.upload(req.file.path, {folder: 'promotions'});
        const {title, description} = req.body;
        const data = {title, description, url: result.url}
        
        const promotion = new Promotion(data);
        await promotion.save();
        
        res.status(201).json(promotion);
    }catch(err){
        res.status(500).json(err);
    }
}


const update = async(req, res = response) => {
    try{
        const promotion = req.body;
        
        const promotionDB = await Promotion.findById( promotion._id );
        if ( !promotionDB ) {
            return res.status(404).json({ msg: 'Promocion no encontrada por id'});
        }

        await Promotion.findByIdAndUpdate( promotion._id, promotion, { new: true } );
        res.json(promotion);
    }catch(err){
        console.log(err)
        res.status(500).json(err);
    }
}





module.exports = { index, store, update }