const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


let Schema = mongoose.Schema;

let categoriaSchema = new Schema({
    strNombre:{
        type:String,
        unique:true,
        uniqueCaseInsensitive:true
    },
    strDescripcion:{
        type:String
    },
    blnActivo: {
        type: Boolean
    }
});

categoriaSchema.plugin(uniqueValidator, {
    message: '{VALUE} Debe ser unico y diferente'
});


module.exports = mongoose.model('Categoria', categoriaSchema);