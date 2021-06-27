const path = require('path')
const express = require('express')
const router = express.Router()

const Product = require('../db_models/model_products')
const productValidation = require('./product_validation')

let getAllProducts = (req, res, next) => {
  if (req.app.locals.user.username != "adminTokoBaju") {
    res.status(404).send("Halaman tidak ditemukan!")
    return
  }

  new Promise((resolve, reject) => {
    Product.find((err, data) => {
      if (err) reject("Query Failed")
      if (data.length == 0) reject(1)
      resolve(data)
    })
  }).then(result => {
    req.data = result
    next()
  }).catch(err => {
    if (err === "No Data")
      req.data = []
    next()
  })
}

let getProductData = (req, res, next) => {
  Product.findOne({ 'id_produk': req.params.id_produk }, (err, data) => {
    req.data = data
    next()
  })
}

router.all('/', getAllProducts, (req, res) => {
  res.status(200).render('products_admin', { 'data': req.data })
})

router.get('/add/', (req, res) => {
  res.status(200).render('add_product', { 'action': 'tambah' })
})

router.post('/add/', [productValidation, getAllProducts], (req, res) => {
  console.log(req.status)
  if (req.status == "Query Failed") {
    res.status(404).sendFile(path.resolve(__dirname, '../public/html/error_page.html'))
    return
  } 
  else if (req.status == "Data Exists") {
    res.status(200).render('add_product', { 'action': 'tambah', 'status': req.status})
    return
  }
  res.status(200).render('products_admin', { 'data': req.data, 'status': req.status })
})

router.get('/update/:id_produk', getProductData, (req, res) => {
  res.status(200).render('add_product', { 'action': 'update', 'data': req.data })
})

router.put('/update/:id_produk', (req, res) => {
  console.log(req.body)
  Product.findOneAndUpdate({ 'id_produk': req.params.id_produk }, req.body)
    .then(result => {
      res.send('success')
    })
})

router.delete('/delete/:id_produk', (req, res) => {
  Product.findOneAndDelete({ 'id_produk': req.params.id_produk })
})

module.exports = router