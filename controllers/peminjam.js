const Peminjam = require('../models/peminjam')
const Barang = require('../models/barang')

module.exports.addPeminjam = async (req, res) => {
    try{
        const newPeminjam = new Peminjam(req.body)

        console.log(newPeminjam)
        await newPeminjam.save()

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

exports.updatePeminjam = async (req, res) => {
    try{
        const {id, code, quantity} = req.body
        const isArray = Array.isArray(code)

        await Peminjam.findByIdAndUpdate(id, {
            $set: {
                status: 'Dikembalikan',
                dikembalikan: new Date(Date.now())
            }
        })

        if(isArray){
            code.forEach(async (e,i) => {
                const barang = await Barang.findOne({code : e})
                const newStock = barang.stock + parseInt(quantity[i])
                await Barang.updateOne({code: e}, {
                    $set: {
                        stock: newStock
                    }
                })
            })
        }
        else{
            const barang = await Barang.findOne({code})
            const newStock = barang.stock + parseInt(quantity)
            await Barang.updateOne({code}, {
                $set: {
                    stock: newStock
                }
            })
        }


        console.log('peminjam update')
        return res.redirect('/peminjam')
    }
    catch (e){
        console.error('updating peminjam error!', e)
        req.flash('error', 'Gagal mengupdate status peminjam, silahkan coba lagi.')
        return res.redirect('/peminjam')
    }
}

exports.addBarang = async (req, res) => {
    console.log(req.body)
    try{
        const {code, quantity, id} = req.body

        const barang = await Barang.findOne({code})

        if(barang.stock < quantity){
            console.error('stock barang tidak cukup!')
            req.flash('error', 'Gagal menambah barang peminjam, stock barang tidak cukup.')
            return res.redirect('/peminjam')
        }

        const newStock = barang.stock - quantity

        await Peminjam.findByIdAndUpdate(id, {
            $push: {
                barang: {
                    code,
                    quantity
                }
            }
        })

        await Barang.updateOne({code}, {
            $set: {
                stock: newStock
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

exports.deleteBarang = async (req, res) => {
    console.log(req.body)
    try{
        const {id, idBarang, quantity, code} = req.body

        const barang = await Barang.findOne({code})

        await Peminjam.findByIdAndUpdate(id, {
            $pull: {
                barang: {
                    _id: idBarang
                }
            }
        })

        const newStock = barang.stock + parseInt(quantity)

        await Barang.updateOne({code}, {
            $set: {
                stock: newStock
            }
        })

        console.log('barang peminjam dihapus')
        return res.redirect('/peminjam')
    }
    catch (e){
        console.error('hapus barang peminjam error!', e)
        req.flash('error', 'Gagal menghapus barang peminjam, silahkan coba lagi.')
        return res.redirect('/peminjam')
    }
}