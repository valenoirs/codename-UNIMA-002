const router = require('express').Router()

const Barang = require('../models/barang')

router.get('/', (req, res) => {
    res.render('user/index', {title: 'Inventaris', layout: 'user/layout/main', error: req.flash('error')})
})

router.get('/barang', async (req, res) => {
    const barang = await Barang.find()

    res.render('user/barang', {title: 'Barang', layout: 'user/layout/main', error: req.flash('error'), barang})
})

module.exports = router