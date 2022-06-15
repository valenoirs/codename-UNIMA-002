const Peminjam = require("../models/peminjam")

module.exports.addPeminjam = (req, res) => {
    try{
        const newPeminjam = new Peminjam(req.body)

        console.log(newPeminjam)
        newPeminjam.save()

        console.log('Peminjam added')
        return res.redirect('/peminjam')
    }
    catch (e){
        console.error('adding peminjam error!', e)
        req.flash('error', 'Gagal menambahkan peminjam, silahkan coba lagi.')
        return res.redirect('/peminjam')
    }
}

exports.editPeminjam = async (req, res) => {
    console.log(req.body)
    try{
        const {instansi, noSurat, name, tujuan, status, id} = req.body

        await Peminjam.findByIdAndUpdate(id, {
            $set: {
                instansi,
                noSurat,
                name,
                tujuan,
                status,
            }
        })

        console.log('peminjam update')
        return res.redirect('/peminjam')
    }
    catch (e){
        console.error('editing peminjam error!')
        req.flash('error', 'Gagal mengubah peminjam, silahkan coba lagi.')
        return res.redirect('/peminjam')
    }
}

exports.addBarang = async (req, res) => {
    console.log(req.body)
    try{
        const {code, quantity, id} = req.body

        await Peminjam.findByIdAndUpdate(id, {
            $set: {
                barang: {
                    code,
                    quantity
                }
            }
        })

        console.log('barang peminjam update')
        return res.redirect('/peminjam')
    }
    catch (e){
        console.error('tambah barang peminjam error!')
        req.flash('error', 'Gagal menambah barang peminjam, silahkan coba lagi.')
        return res.redirect('/peminjam')
    }
}