const express = require('express'); 
const router = express.Router();  
const sequelize = require('../db');
const validateSession = require('../middleware/validate-session');
// var Comment = sequelize.import('../models/comment');
var Comment = sequelize.model('comment');

router.post('/coffee/:coffeeId/comment/create', validateSession, (req, res) => {
  let fullName = req.user.firstName + ' ' + req.user.lastName
  if (!req.errors) {
      const commentRequest = {
        name: fullName,
        comment: req.body.comment,
        rating: req.body.rating,
        owner: req.user.id,
        coffeeId: req.params.coffeeId
      }
      Comment.create(commentRequest)
      .then(comment => res.status(200).json(comment))
      .catch(err => res.json(req.errors))
  } else {
    res.status(500).json(req.errors)
  }
})

// router.get('/owner', validateSession, (req, res) => {
//   Coffee.findAll({ where: { owner: req.user.id }})
//       .then(coffee => res.status(200).json(coffee))
//       .catch(err => res.status(500).json({error: err}))
// })

// router.get('/', validateSession, (req, res) => {
// Coffee.findAll()
//     .then(coffee => res.status(200).json(coffee))
//     .catch(err => res.status(500).json({error: err}))
// })

router.put('/comment/:id', validateSession, (req, res) => {
  if (!req.errors) {
    Comment.update(req.body.comment, { where: { id: req.params.id }})
      .then(comment => res.status(200).json(comment))
      .catch(err => res.json(req.errors))
  } else {
    res.status(500).json(req.errors)
  }
})

router.delete('/comment/:id', validateSession, (req, res) => {
    if (!req.errors) {
      Comment.destroy({ where: { id: req.user.id }})
      .then(comment => res.status(200).json(comment))
      .catch(err => res.json(req.errors))
  } else {
    res.status(500).json(req.errors)
  }
})

router.delete('/comment/:id/admin', validateSession, (req, res) => {
  if (req.user.role === 'admin') {
    if (!req.errors) {
      Comment.destroy({ where: { id: req.params.id }})
      .then(comment => res.status(200).json(comment))
      .catch(err => res.json(req.errors))
    } else {
      res.status(500).json(req.errors)
    }
  } else {
    res.json({
      message: 'You do not have permission to access this data!'
    })
  }
})
  
module.exports = router;