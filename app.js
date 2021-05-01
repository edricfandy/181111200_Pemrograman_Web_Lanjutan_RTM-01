const express = require('express')
const path = require('path')
const morgan = require('morgan')

const app = express()
const port = 3000

const data = [
  {
    id: 1,
    nama: 'Batik Cap Pekalongan Merek Runa Batik SD. YASMIN HDT',
    jenis: 'SD',
    warna: 'merah, hitam, kuning, hijau, biru',
    harga: 95000
  },
  {
    id: 2,
    nama: 'Batik Cap Pekalongan Merek Runa Batik LD. DAHLIA',
    jenis: 'LD',
    warna: 'merah, hitam, kuning, hijau, biru',
    harga: 100000
  },
  {
    id: 3,
    nama: 'Batik Cap Pekalongan Merek Runa Batik DS. TANIA KLOK KANCING',
    jenis: 'DS',
    warna: 'merah, hitam, kuning, hijau, biru',
    harga: 85000
  },
  {
    id: 4,
    nama: 'Batik Cap Pekalongan Merek Runa Batik CP. 3/4',
    jenis: 'CP',
    warna: 'merah, hitam, kuning, hijau, biru',
    harga: 95000
  }
]

app.use(express.static('./public'))
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, './public/html/home.html'))
})

app.get('/products', (req, res) => {
  // res.json(data)
  let {filter, searchString} = req.params
  
  res.status(200).sendFile(path.resolve(__dirname, './public/html/product.html'))
})

app.get('/transactions', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, './public/html/transaction.html'))
})

app.get('/about', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, './public/html/about.html'))
})

app.all('*', (req, res) => {
  res.status(404).send('404 Not Found')
})

app.listen(port, () => {
  console.log('listening on port ' + port)
})