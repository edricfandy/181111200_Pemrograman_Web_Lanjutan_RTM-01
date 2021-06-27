const Customer = require('../db_models/model_customers')

const validate = (req, res, next) => {
  let loginDetails = req.body
  let usernameOrPhoneNum = loginDetails.username_or_phone_num
  let password = loginDetails.password

  new Promise((resolve, reject) => {
    Customer.find({ $or: [ { 'phone_num': usernameOrPhoneNum }, { 'username': usernameOrPhoneNum } ]}, (err, data) => {
      if (err) {
        resolve("Query Failed")
        return
      } 
      if (data.length > 0) {
        for (i of data) {
          if (password !== i.password) {
            resolve("Wrong Password")
            return
          } 
          req.user = i
        }
        resolve("Login Successful")
      }
      resolve("Account Doesn't Exists")
    })
  }).then(result => {
    req.status = result
    next()
  })
}

module.exports = validate