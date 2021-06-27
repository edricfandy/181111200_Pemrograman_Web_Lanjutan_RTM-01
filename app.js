const express = require('express')
const path = require('path')
const morgan = require('morgan')
const mongoose = require('mongoose')
const login_routes = require('./routes/login_routes')
const register_routes = require('./routes/register_routes')
const products_admin_routes = require('./routes/products_admin_routes')

const app = express()
const port = 3000

var connectionString = "mongodb+srv://web_lanjutan_181111200:181111200edricfandy@webprogrammingassignmen.ojurq.mongodb.net/TokoBaju?retryWrites=true&w=majority"

mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => console.log("Connected to DB"))
  .catch((err) => console.log(err))

app.set('views', path.resolve(__dirname, './views'))
app.set('view engine', 'pug')
  
app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, './public/html/home.html'))
})

app.get('/products', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, './public/html/product.html'))
})

app.get('/transactions', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, './public/html/transaction.html'))
})

app.get('/about', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, './public/html/about.html'))
})

// login routes
app.use('/login', login_routes)

// register routes
app.use('/register', register_routes)

// products_admin route
app.use('/products_admin', products_admin_routes)

app.all('*', (req, res) => {
  res.status(404).send('404 Not Found')
})

app.listen(port, () => {
  console.log('listening on port ' + port)
})