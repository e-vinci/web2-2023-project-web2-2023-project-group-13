const express = require('express');
const { register, login } = require('../models/users');
const router = express.Router();

let Table = [];

/* GET users listing. */
router.get('/', (req, res) => {
  res.json({ users: [{ name: 'e-baron' }] });
});

router.post('/addUser', async (req,res) => {
  console.log('/addUser');
  register(firstname,lastname, email, password); 

})

module.exports = router;
