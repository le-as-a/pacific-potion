const express = require('express');
const { csrfProtection, asyncHandler } = require('./utils');
const db = require('../db/models');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const { loginUser, logoutUser } = require('../auth')
const { userValidators, loginValidators } = require('./authValidations')
const router = express.Router();


/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

/********************** USER REGISTRATION ********************************/

router.get('/user/register', csrfProtection, (req, res) => {
  //connect to user database
  const user = db.User.build();

  //show the user signup form and fill user information if necessary
  res.render('signup-form', {
    title: 'Register',
    user,
    csrfToken: req.csrfToken()
  });
});

router.post('/user/register', userValidators, csrfProtection, asyncHandler(async (req, res) => {
  //destructur user inputs
  const {
    username,
    role,
    email,
    password
  } = req.body;

  //connect to user database and stage inputs
  const user = await db.User.build({
    username,
    role,
    email
  });

  //check user input validation
  const validatorErrors = validationResult(req);

  if (validatorErrors.isEmpty()) {
    //hash password for storage
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    //save user inputs into database
    await user.save();
    //keep user logged in
    loginUser(req, res, user)
    res.redirect('/');
  } else {
    //resubmit to signup for with errors explained
    const errors = validatorErrors.array().map(error => error.msg);
    res.render('signup-form', {
      title: 'Register',
      user,
      errors,
      csrfToken: req.csrfToken()
    });
  };
}));



/********************** USER LOGIN ********************************/

router.get('/user/login', csrfProtection, (req, res) => {
  //navigate to the login page
  res.render('login', {
    title: 'Login',
    csrfToken: req.csrfToken(),
  });
});

router.post('/user/login', csrfProtection, loginValidators, asyncHandler(async (req, res) => {
  //destructure user inputs
  const {
    username,
    password,
  } = req.body;

  //check for errors and setup for custom errors
  let errors = [];
  const validatorErrors = validationResult(req);

  if (validatorErrors.isEmpty()) {
    //find user in the database
    const user = await db.User.findOne({ where: { username } });

    //user found in database
    if (user !== null) {
      //verify password hash
      const passwordMatch = await bcrypt.compare(password, user.password.toString());
      if (passwordMatch) {
        //keep user logged in
        loginUser(req, res, user)
        return res.redirect('/');
      }
    }
    //handle login failure
    errors.push('Login failed for the provided email address and password');

  } else {
    //handle input error validation
    errors = validatorErrors.array().map((error) => error.msg);
  }

  //display the login page again with errors 
  res.render('login', {
    title: 'Login',
    username,
    errors,
    csrfToken: req.csrfToken(),
  });
}));



/********************** USER LOGOUT ********************************/

router.post('/user/logout', (req, res) => {
  logoutUser(req, res);
  res.redirect('/user/login');
});

module.exports = router;
