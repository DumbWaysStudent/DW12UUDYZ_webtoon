const jwt = require('jsonwebtoken');
const models = require('../models');
const User = models.users;

exports.login = (req, res) => {
  //check if email and pass match in db tbl user
  const email = req.body.email;
  const password = req.body.password; //use encryption in real world case!

  User.findOne({ where: { email, password } }).then(user => {
    if (user) {
      const token = jwt.sign({ userId: user.id }, 'my-secret-key');
      res.send({
        success: true,
        message: 'User logged in successfully',
        email,
        token,
      });
    } else {
      res.send({
        error: true,
        message: 'Wrong Email or Password!',
      });
    }
  });
};

exports.register = (req, res) => {
  User.create(req.body).then(user => {
    const token = jwt.sign({ userId: user.id }, 'my-secret-key');
    res.send({
      success: true,
      message: 'User logged in successfully',
      data: { user },
      token,
    });
  });
};
