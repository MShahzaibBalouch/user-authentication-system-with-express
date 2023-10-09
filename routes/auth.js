const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');
const isLoggedIn = require('./isLoggedIn');

// Registration
router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      res.redirect('/api/login');
    });
  } catch (err) {
    console.error(err);
    res.redirect('/api/register');
  }
});

// Login
router.get('/login', (req, res) => {
  res.render('login');
});

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/api/dashboard',
    failureRedirect: '/api/login',
  })
);
router.get('/dashboard', isLoggedIn, (req, res) => {
  res.render('dashboard', { user: req.user });
});

// Logout
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/api'); 
  });
});

router.get('/',(req, res) => {
  res.render('home');
})

module.exports = router;
