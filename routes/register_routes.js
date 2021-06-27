const path = require('path')
const express = require('express')
const router = express.Router()
const registerValidation = require('./register_validation')

router.get('/', (req, res) => {
  res.render('register')
})

router.post('/', registerValidation, (req, res) => {
  if (req.status == "Query Failed") {
    res.status(404).sendFile(path.resolve(__dirname, './public/html/error_page.html'))
    return
  }
  else if (req.status == 0) {
    res.app.locals.user = req.user
    res.status(200).sendFile(path.resolve(__dirname, './public/html/home.html'))
    return
  }
  res.status(200).render('register', { 'status' : req.status } )
})

module.exports = router