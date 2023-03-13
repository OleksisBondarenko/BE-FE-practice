const User = require("../models/user")
const bcrypt = require("bcryptjs");
const { formatedDate } = require("../services/date");

const addUser = (req, res) => {
  const { name, email, password } = req.body;

  console.log(name, email, password);
  User.findOne({ email: email }).then((user) => {
    if (user) {
      res.status(400);
      res.json("This email exists");
    }
  });

  const newUser = {
    name,
    email,
    password,
  };

  newUser.activatedDate = formatedDate(Date.now());
  console.log(newUser);
  User.insertMany([newUser]).then(result => {
    res.send(result)
  })
};

const checkUser = (req, res) => {
  const { email, password } = req.body;
  //   bcrypt.genSalt(10, (err, salt) =>
  //   bcrypt.hash(password, salt, (err, hashPassword) => {
  //     if (err) throw err;
  //     // password = hashPassword;
  //     console.log(hashPassword);
  //   })
  // );
  // User.findOne({ email: email, password: password }).then((user) => {
  // User.findOne({ password: password }).then((user) => {

   User.findOne({ $or: [ { name: email }, { email: email  } ], password: password }).then((user) => {
    if (user) {
      

      res.json(user);
    } else {
      res.status(400) 
      res.json("User wasnt found")
    }
  });
};
  

const updateUser = (req, res)  => {
  const { id, user: newUser } = req.body;
  console.log(req.body);
  
  newUser.buyedProducts = JSON.stringify(newUser.buyedProducts);
  newUser.cartProducts = JSON.stringify(newUser.cartProducts);

  User.updateOne({
    _id: id,
  }, {...newUser})
  .then(result => res.send(result))
  .catch(err => { 
    res.status(400)
    res.send(err)
  })    
}

const registerUser = (req, res) => {
  addUser(req, res);
};

const loginUser = (req, res) => {
  checkUser(req, res)
};

const users = (req, res) => {
  User.find({}).then(user => {
    res.json(user)
  })
}

const deleteUser = (req, res) => {
  const filter = req.body;

  User.deleteMany(filter).then(result => {
    res.send(result)
  })
}


module.exports = {
  registerUser,
  loginUser,
  updateUser,
  users,
  deleteUser
};