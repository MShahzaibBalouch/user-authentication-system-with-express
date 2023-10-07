const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');

// Connect to MongoDB (Make sure you have MongoDB installed and running)
mongoose.connect('mongodb://localhost/user-authentication-system', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Express middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(require('express-session')({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
}));

// Passport configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routes
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
