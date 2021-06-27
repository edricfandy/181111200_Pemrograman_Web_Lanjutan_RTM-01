const Product = require('../db_models/model_products')

const validate = (req, res, next) => {
  let data = req.body

  new Promise((resolve, reject) => {
    Product.find({ 'id_produk': data.id_produk }, (err, result) => {
      if (err) {
        reject("Query Failed")
        return
      } 
      if (result.length > 0) {
        reject("Data Exists")
        return
      } 
      
      let product = new Product({
        id_produk: data.id_produk,
        nama_produk: data.nama_produk,
        tipe_produk: data.tipe_produk,
        panjang_lengan: data.panjang_lengan,
        merk_produk: data.merk_produk,
        harga_produk: Number(data.harga_produk),
        stok_produk: Number(data.stok_produk)
      })
      product.save()
      resolve("Save Successful")
    })
  }).then(result => {
    req.status = result
    next()
  }).catch(message => {
    req.status = message
    next()
  })
}

module.exports = validate