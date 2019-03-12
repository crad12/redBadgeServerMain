const express = require('express'); 
const router = express.Router();  
const sequelize = require('../db');
const validateSession = require('../middleware/validate-session');
// var Comment = sequelize.import('../models/comment');
var Comment = sequelize.model('comment');

router.post('/create', validateSession, (req, res) => {
  if (!req.errors) {
      const commentRequest = {
        name: req.body.name,
        comment: req.body.comment,
        rating: req.body.rating,
        owner: req.user.id
      }
      Comment.create(commentRequest)
      .then(comment => res.status(200).json(comment))
      .catch(err => res.json(req.errors))
  } else {
    res.status(500).json(req.errors)
  }
})

// router.get('/:name', validateSession, (req, res) => {
//   Log.findOne({ where: { nameOfLog: req.params.name }})
//     .then(log => res.status(200).json(log))
//     .catch(err => res.status(500).json({ error: err}))
// })

router.get('/owner', validateSession, (req, res) => {
    Comment.findAll({ where: { owner: req.user.id }})
        .then(comment => res.status(200).json(comment))
        .catch(err => res.status(500).json({error: err}))
})

router.put('/:id', validateSession, (req, res) => {
  if (!req.errors) {
    Comment.update(req.body.comment, { where: { id: req.params.id }})
      .then(comment => res.status(200).json(comment))
      .catch(err => res.json(req.errors))
  } else {
    res.status(500).json(req.errors)
  }
})

router.delete('/:id', validateSession, (req, res) => {
    if (!req.errors) {
      Comment.destroy({ where: { id: req.params.id }})
      .then(comment => res.status(200).json(comment))
      .catch(err => res.json(req.errors))
  } else {
    res.status(500).json(req.errors)
  }
})
  
module.exports = router;