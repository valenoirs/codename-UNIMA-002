const router = require('express').Router()
const PeminjamController = require('../controllers/peminjam')

router.route('/')
.post(PeminjamController.addPeminjam)
.put(PeminjamController.editPeminjam)
.patch(PeminjamController.updatePeminjam)

router.route('/barang')
.delete(PeminjamController.deleteBarang)
.put(PeminjamController.addBarang)
module.exports = router