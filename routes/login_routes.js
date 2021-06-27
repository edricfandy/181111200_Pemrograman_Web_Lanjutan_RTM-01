const path = require('path')
const express = require('express')
const router = express.Router()
const loginValidation = require('./login_validation')

router.get('/', (req, res) => {
  res.status(200).render('login')
})

router.post('/', loginValidation, (req, res) => {
  if (req.status == "Query Failed") {
    res.status(404).sendFile(path.resolve(__dirname, './public/html/error_page.html'))
    return
  }  
  else if (req.status == "Login Successful") {
    res.app.locals.user = req.user
    res.redirect('/products_admin')
    return
  }

  let status = (req.status == "Account Doesn't Exists") ? 1 : 2 
  res.status(200).render('login', { 'status': status })
})

module.exports = router