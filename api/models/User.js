const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const path = require('node:path');
const { parse, serialize } = require('../utils/json');

const jwtSecret = 'catio';
const lifetimeJwt = 24 * 60 * 60 * 1000; // in ms : 24 * 60 * 60 * 1000 = 24h

const saltRounds = 10;

const jsonDbPath = path.join(__dirname, '/../data/users.json');

const defaultUsers = [
  {
    id: 1,
    username: 'admin',
    password: bcrypt.hashSync('admin', saltRounds),
  },
];

async function login(email, password) {
  const userFound = readOneUserFromUsername(email);
  if (!userFound) return undefined;

  const passwordFound = await bcrypt.compare(password, userFound.password);
  if (!passwordFound) return undefined;

  const token = jwt.sign(
    {email}, // session data added to the payload (payload : part 2 of a JWT)
    jwtSecret, // secret used for the signature (signature part 3 of a JWT)
    { expiresIn: lifetimeJwt }, // lifetime of the JWT (added to the JWT payload)
  );

  const authenticatedUser = {
    email,
    token,
  };

  return authenticatedUser;
}

async function register(firstname,lastname,email, password) {
  const userFound = readOneUserFromUsername(email);
  if (userFound) return undefined;

  await createOneUser(firstname, lastname, email, password);

  const token = jwt.sign(
    {email}, // session data added to the payload (payload : part 2 of a JWT)
    jwtSecret, // secret used for the signature (signature part 3 of a JWT)
    { expiresIn: lifetimeJwt }, // lifetime of the JWT (added to the JWT payload)
  );

  const authenticatedUser = {
    email,
    token,
  };

  return authenticatedUser;
}

async function deleteUser(email){
  const userFound = readOneUserFromUsername(email);
  console.log(userFound); 
  if (userFound === undefined) return undefined;
  console.log(email)
  const userDeleted = await deleteAccount(email);
  console.log(userDeleted);
  return userDeleted;
}

async function deleteAccount(email){
  const users = parse(jsonDbPath, defaultUsers);
  const indexOfUserFound = users.findIndex((user) => user.email === email);

  console.log('Index of user to delete:', indexOfUserFound);

  if (indexOfUserFound !== -1) {
    const accountDeleted = users[indexOfUserFound];
    users.splice(indexOfUserFound, 1);
    serialize(jsonDbPath, users);
    console.log('User successfully deleted.');
    return accountDeleted;
  } else {
    console.log('User not found for deletion:', email);
    return null;
  }
}

function readOneUserFromUsername(email) {
  const users = parse(jsonDbPath,defaultUsers);
  const indexOfUserFound = users.findIndex((user) => user.email === email);
  if (indexOfUserFound < 0) return undefined;
  return users[indexOfUserFound];
}

async function createOneUser(firstname,lastname,email,password) {
  const users = parse(jsonDbPath, defaultUsers);

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const createdUser = {
    id: getNextId(),
    firstname,
    lastname,
    email,
    password: hashedPassword,
  };

  users.push(createdUser);

  serialize(jsonDbPath, users);

  return createdUser;
}

function getNextId() {
  const users = parse(jsonDbPath, defaultUsers);
  const lastItemIndex = users?.length !== 0 ? users.length - 1 : undefined;
  if (lastItemIndex === undefined) return 1;
  const lastId = users[lastItemIndex]?.id;
  const nextId = lastId + 1;
  return nextId;
}

module.exports = {
  login,
  register,
  readOneUserFromUsername,
  deleteUser
};
