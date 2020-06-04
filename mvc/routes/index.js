var express = require('express');
var router = express.Router();

//Controller object
const ctrl = require('../controllers/index.js');
//Middleware
const { ensureAuthenticated } = require('./middleware/authorize.js');

// Main page router
router.get('/', ctrl.getHomePage);

//  Get routers for register page
router.get('/register_restaurant', ctrl.getRestaurantRegisterPage);
router.get('/register_user', ctrl.getUserRegisterPage);

// Get routers for login page
router.get('/login', ctrl.getLoginPage);

// Post routers for register pages
router.post("/register_user", ctrl.register);
router.post("/register_restaurant", ctrl.register);

// Post router for login
router.post("/login", ctrl.login);

//Routers for dashboards
router.get('/restaurant_dashboard', ensureAuthenticated, ctrl.getRestaurantDashboard);
router.get('/user_dashboard', ensureAuthenticated, ctrl.getUserDashboard);

// Logout router
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/login');
});

module.exports = router;
