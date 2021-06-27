const mongoose = require('mongoose')
const Schema = mongoose.Schema

var productSchema = new Schema({
  id_produk: {
    type: String,
    required: true
  },
  nama_produk: {
    type: String,
    required: true
  },
  tipe_produk: {
    type: String,
    required: true
  },
  panjang_lengan: {
    type: String,
    required: true
  },
  merk_produk: {
    type: String,
    required: true
  },
  harga_produk: {
    type: Number,
    required: true
  },
  stok_produk: {
    type: Number,
    required: true
  }
})

var Product = mongoose.model('Product', productSchema)

module.exports = Product