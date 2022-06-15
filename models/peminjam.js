const mongoose = require('mongoose');

const schemaBarang = new mongoose.Schema({
    code: {type:String, unique:true, required:true},
    quantity: {type:Number, required:true}
})

const Peminjam = mongoose.model('Peminjam', new mongoose.Schema({
    name: {type:String, required:true},
    instansi: {type:String, required:true},
    noSurat: {type:String, required:true},
    tujuan: {type:String, required:true},
    barang: {type:[schemaBarang], default: []}
}))

module.exports = Peminjam;