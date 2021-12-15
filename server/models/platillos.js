const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Categoria = require('./categoria');

let PlatillosSchema = new mongoose.Schema({

    idCategoria: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Categoria',
    },

    strNombre:{
        type: String,
        unique:true,
        uniqueCaseInsensitive:true
    },
    strDescripcion:{
        type:String
    },
    strIngredientes:{
        type:String
    },
    nmbPiezas:{
        type:Number
    },
    nmbPrecio:{
        type:Number
    },
    blnActivo: {
        type: Boolean
    },
});

PlatillosSchema.plugin(uniqueValidator,{
    message:'{VALUE} Debe de ser unico'
});

module.exports = mongoose.model('Platillos', PlatillosSchema);