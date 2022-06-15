const mongoose = require('mongoose')

const Barang = mongoose.model('Barang', new mongoose.Schema({
    name: {type:String, required:true},
    code: {type:String, required:true, unique:true},
    category: {type:String, required:true},
    brand: {type:String, required:true},
    stock: {type:Number, required:true},
}))

module.exports = Barang