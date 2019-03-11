const jwt = require('jsonwebtoken')
const User = require('../db').import('../models/user')

const validateSession = (req, res, next) => { //This is an express function to make sure you have a token//
const token = req.headers.authorization    //Next is the backdoor to your next file//

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        //verify token, decode it with .env file, return err, or decodedtoken//
      if (!err && decodedToken) {
        User.findOne({ where: { id: decodedToken.id }})
          .then(user => {
            if (!user) throw 'err'
            req.user = user
            return next()
          })
          .catch(err => next(err))
      } else {
        req.errors = err
        return next()
      }
    })
  }
  
  module.exports = validateSession