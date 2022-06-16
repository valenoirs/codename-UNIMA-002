const Barang = require('../models/barang')

module.exports.addBarang = async (req, res) => {
    try{
        const newBarang = new Barang(req.body)

        console.log(newBarang)
        await newBarang.save()

        console.log('barang baru ditambahkan')
        return res.redirect('/barang')
    }
    catch (e){
        console.error('adding barang error!')
        req.flash('error', 'Gagal menambahkan barang, silahkan coba lagi.')
        return res.redirect('/barang')
    }
}

exports.editBarang = async (req, res) => {
    try{
        const {name, code, brand, category, stock, id} = req.body
        const barang = await Barang.findById(id)

        if(!barang){
            console.error('barang not found!')
            req.flash('error', 'Barang yang akan diubah tidak ditemukan.')
            return res.redirect('/barang')
        }

        await Barang.findByIdAndUpdate(id, {
            $set: {
                name,
                code,
                brand,
                category,
                stock,
            }
        })

        console.log('Barang edited!')
        // req.flash('error', 'Barang berhasil diubah.')
        return res.redirect('/barang')
    }
    catch (e) {
        console.error('editing barang error!')
        req.flash('error', 'Gagal mengubah barang, silahkan coba lagi.')
        return res.redirect('/barang')
    }
}

exports.deleteBarang = async (req, res) => {
    try{
        const {id} = req.body
        const barang = await Barang.findById(id)

        console.log(req.body)
        console.log(barang)

        if(!barang){
            console.error('barang not found!')
            req.flash('error', 'Barang yang akan diubah tidak ditemukan.')
            return res.redirect('/barang')
        }
        
        await Barang.findByIdAndDelete(id)
        
        console.log('Barang deleted!')
        // req.flash('error', 'Satu barang berhasil dihapus.')
        return res.redirect('/barang')
    }
    catch (e) {
        console.error('deleting barang error!')
        req.flash('error', 'Gagal menghapus barang, silahkan coba lagi.')
        return res.redirect('/barang')
    }
}