const router = require('express').Router()
const PeminjamController = require('../controllers/peminjam')

router.route('/')
.post(PeminjamController.addPeminjam)
.put(PeminjamController.addBarang)
.patch(PeminjamController.editPeminjam)

module.exports = router