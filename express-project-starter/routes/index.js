const express = require('express');
const router = express.Router();

// GET logged in front page
<<<<<<< HEAD
router.get('/', function(req, res, next) {
<<<<<<< HEAD
  res.render('index', { title: 'PacificPotion' });
=======
=======
router.get('/', function (req, res, next) {
>>>>>>> main

  // if logged in
  res.render('index', { title: 'Pacific Potion Home' });

>>>>>>> main
});

// GET not logged in front page
router.get('/notLoggedIn', function (req, res, next) {
  res.render('loggedOutHome', { title: 'Home' });
})

// GET inventory page
router.get('/inventory', function (req, res, next) {
  res.render('inventory', { title: 'inventory' });
})

// GET login page
router.get('/login', function (req, res, next) {
  res.render('login', { title: 'Login' });
})

// GET register page
router.get('/signup', function (req, res, next) {
  res.render('signup-form');
})

// GET search page
router.get('/search', function (req, res, next) {
  res.render('search', { title: 'search' });
})

module.exports = router;
