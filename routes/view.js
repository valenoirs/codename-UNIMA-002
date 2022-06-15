const router = require('express').Router()

router.get('/', (req, res) => {
    res.render('user/index', {title: 'Inventaris', layout: 'user/layout/main', error: req.flash('error')})
})

router.get('/barang', (req, res) => {
    res.render('user/barang', {title: 'Barang', layout: 'user/layout/main', error: req.flash('error')})
})

module.exports = router