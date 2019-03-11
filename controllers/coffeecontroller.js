const express = require('express'); 
const router = express.Router();  
const sequelize = require('../db');
const validateSession = require('../middleware/validate-session');
var Coffee = sequelize.import('../models/coffee');

router.post('/create', validateSession, (req, res) => {
  if (!req.errors) {
      const coffeeRequest = {
        name: req.body.name,
        location: req.body.location,
        favoriteDrink: req.body.favoriteDrink,
        note: req.body.note,
        owner: req.user.id
      }
      Coffee.create(coffeeRequest)
      .then(coffee => res.status(200).json(coffee))
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
    Coffee.findAll({ where: { owner: req.user.id }})
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
    if (!req.errors) {
      Coffee.destroy({ where: { id: req.params.id }})
      .then(coffee => res.status(200).json(coffee))
      .catch(err => res.json(req.errors))
  } else {
    res.status(500).json(req.errors)
  }
})
  
module.exports = router;