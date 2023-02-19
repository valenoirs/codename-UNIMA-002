const mongoose = require('mongoose');

const schemaBarang = new mongoose.Schema({
    code: {type:String, required:true},
    quantity: {type:Number, required:true}
})

const Peminjam = mongoose.model('Peminjam', new mongoose.Schema({
    name: {type:String, required:true},
    instansi: {type:String, required:true},
    noSurat: {type:String, required:true},
    tujuan: {type:String, required:true},
    status: {type:String, required:true, default:'Dipinjam'},
    barang: {type:[schemaBarang], default: []},
    dikembalikan: {type:Date, default: null}
}))

module.exports = Peminjam;