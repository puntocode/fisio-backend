const {Schema, model} = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const PromotionSchema = Schema({
    url:{
        type: String,
        required: [true, 'La url es obligatoria']
    },
    title:{
        type: String,
        required: [true, 'El título es obligatorio'],
    },
    description: {
        type: String,
        required: [true, 'La descripción es obligatoria']
    },
    estado:{
        type: Boolean,
        default: true,
        required: true,
    },
});


PromotionSchema.methods.toJSON = function(){
    const {__v, estado, ...data} = this.toObject();
    return data;
};

PromotionSchema.plugin(mongoosePaginate);

module.exports = model('Promotion', PromotionSchema);