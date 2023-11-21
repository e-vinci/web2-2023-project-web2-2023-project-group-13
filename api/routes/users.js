const express = require('express');

const router = express.Router();

let Table = [];

/* GET users listing. */
router.get('/', (req, res) => {
  res.json({ users: [{ name: 'e-baron' }] });
});

router.post('/addUser', (req,res) => {

  const lastItemIndex = Table?.length !== 0 ? Table.length - 1 : undefined;
  const lastId = lastItemIndex !== undefined ? Table[lastItemIndex]?.id : 0;
  const nextId = lastId + 1;

  const newUser = {
    id : nextId,
    firstname : firstname,
    lastname : lastname,
    email : email,
    password : password
  };
  Table.push(newUser);

  res.json(newUser);
  console.log(Table[nextId]);
})

module.exports = router;
