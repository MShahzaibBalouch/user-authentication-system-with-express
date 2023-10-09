// isLoggedIn.js middleware
module.exports = function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next(); // User is authenticated, continue with the request
    }
    res.redirect('/api/login'); // User is not authenticated, redirect to the login page
  };
  