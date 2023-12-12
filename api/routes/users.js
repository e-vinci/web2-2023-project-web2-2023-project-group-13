const express = require('express');
const { register, login, readOneUserFromUsername } = require('../models/users');
const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
  res.json({ users: [{ name: 'e-baron' }] });
});

router.post('/addUser', async (req,res) => {
  const firstname = req?.body?.firstname?.length !== 0 ? req.body.firstname : undefined;
  const lastname = req?.body?.lastname?.length !== 0 ? req.body.lastname : undefined;
  const email = req?.body?.email?.length !== 0 ? req.body.email : undefined;
  const password = req?.body?.password?.length !== 0 ? req.body.password : undefined;
  console.log(firstname);
  console.log(lastname);
  console.log(email);
  console.log(password);

  if (!firstname || !lastname || !email || !password) return res.sendStatus(400); // 400 Bad Request

  if (readOneUserFromUsername(email) === undefined) {
    const authenticatedUser = await register(firstname, lastname, email, password);
    console.log(authenticatedUser);
    return res.json(authenticatedUser);
  } else {
    return res.status(404).json({ error: 'User already registered' });
  }
});

router.post('/loginUser', async (req,res) => {
  const email = req?.body?.email?.length !== 0 ? req.body.email : undefined;
  const password = req?.body?.password?.length !== 0 ? req.body.password : undefined;

  console.log(email);
  console.log(password);

  if (!email || !password) return res.sendStatus(404).send("Le champ email ou password est vide"); // 400 Bad Request

  const authenticatedUser = await login(email, password);
  if (authenticatedUser === undefined){
    return res.status(404).json({ error: "Le mot de passe ou l'email n'est pas correct"});
  }
  console.log('New user registered : ', authenticatedUser);
  return res.json(authenticatedUser);x
});

module.exports = router;
