const Customer = require('../db_models/model_customers')

const validate = (req, res, next) => {
  let data = req.body

  new Promise((resolve, reject) => {
    Customer.find({ $or: [ { 'phone_num': data.phone_num} , {'username': data.username} ] }, (err, result) => {
      if (err) {
        reject("Query Failed")
        return
      } 
      if (result.length <= 0) {
        resolve(0)
        return
      }
      for (let i = 0; i < result.length; i++) {
        if (result[i].phone_num === data.phone_num) {
          reject(1)
          return
        }
        else if (result[i].username === data.username) {
          reject(2)
          return
        }
      }
    })
  }).then(result => {
    let customer = new Customer({
      username: data.username,
      password: data.password,
      name: data.name,
      phone_num: data.phone_num
    })
    customer.save()
    req.user = customer
    req.status = result
    next()
  }).catch(message => { 
    req.status = message
    next()
  })
}

module.exports = validate