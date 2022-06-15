const router = require('express').Router()
const BarangController = require('../controllers/barang')

router.route('/')
.post(BarangController.addBarang)
.put(BarangController.editBarang)
.delete(BarangController.deleteBarang)

module.exports = router