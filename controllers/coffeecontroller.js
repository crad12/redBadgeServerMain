const express = require('express'); 
const router = express.Router();  
const sequelize = require('../db');
const validateSession = require('../middleware/validate-session');
// var Coffee = sequelize.import('../models/coffee');
var Comment = sequelize.model('comment');
var Coffee = sequelize.model('coffee');

router.post('/create', validateSession, (req, res) => {
  let fullName = req.user.firstName + ' ' + req.user.lastName;
  if (!req.errors) {
      const coffeeRequest = {
        name: req.body.name,
        location: req.body.location,
        favoriteDrink: req.body.favoriteDrink,
        note: req.body.note,
        userId: req.user.id,
        owner: fullName
      }
      Coffee.create(coffeeRequest)
      .then(newCoffee => {
        res.json({
          coffee: newCoffee
        })
      })
      .catch(err => {
        res.json({
          error: err.message
        })
      })
  } else {
    console.log('It didnt even make it');
  }
})

router.get('/:id', validateSession, (req, res) => {
  Coffee.findOne({ 
    where: { id: req.params.id },
    include: [
      {
      model: Comment,
      where:{ coffeeId: req.params.id }
      }
    ]
  })
    .then(coffee => {
      // If no comments
      if (coffee === null) {
        Coffee.findOne({
          where: {id: req.params.id}
        })
        .then(coffee => {
          res.json({
            coffee: coffee
          })
        })
        .catch(err => {
          res.json({
            error: err.message
          })
        })
      } else {
        res.json({
          coffee: coffee
        })
      }
    })
    .catch(err => res.status(500).json({ error: err}))
})


router.get('/owner', validateSession, (req, res) => {
    Coffee.findAll({ where: { owner: req.user.id }})
        .then(coffee => res.status(200).json(coffee))
        .catch(err => res.status(500).json({error: err}))
})

router.get('/', validateSession, (req, res) => {
  Coffee.findAll()
      .then(coffee => res.status(200).json(coffee))
      .catch(err => res.status(500).json({error: err}))
})

router.put('/:id', validateSession, (req, res) => {
  if (!req.errors) {
    Coffee.update(req.body.coffee, { where: { id: req.params.id }})
      .then(coffee => res.status(200).json(coffee))
      .catch(err => res.json(req.errors))
  } else {
    res.status(500).json(req.errors)
  }
})

router.delete('/:id', validateSession, (req, res) => {
  // matched coffeeId to param id
    if (!req.errors) {
      Coffee.destroy({ where: { userId: req.user.id, id: req.params.id}})
      .then(coffee => res.status(200).json(coffee))
      .catch(err => res.json(req.errors))
  } else {
    res.status(500).json(req.errors)
  }
})

router.delete('/:id/admin', validateSession, (req, res) => {
  if (req.user.role === 'admin') {
    if (!req.errors) {
      Coffee.destroy({ where: { id: req.params.id }})
      .then(coffee => res.status(200).json(coffee))
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