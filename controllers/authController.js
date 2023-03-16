const Users = require("../models/userModel");
const handleError = require("../errorHandlers/errorHandler");

async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      res.status(400);
      throw Error("both empty");
    }
    await Users.login(email, password);
  } catch (err) {
    const error = handleError(err);
    res.status(400).json({ error });
  }
}

async function signupUser(req, res) {
  const credentials = req.body;
  let errorArr = [];
  for (let key in credentials) {
    if (!credentials[key]) {
      errorArr.push(key);
    }
  }

  try {
    if (errorArr.length > 0) {
      res.status(400);
      throw Error(errorArr);
    }

    const users = await Users.find();
    if (users.includes(credentials.email)) {
      res.status(409);
      throw Error("This email address already exists");
    }
    const { email, password } = credentials;
    const user = await Users.create({ email, password });

    res.status(201).json(user);
  } catch (err) {
    const error = handleError(err);
    res.status(400).json({ error });
  }
}

module.exports = { loginUser, signupUser };
