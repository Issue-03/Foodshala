const passport = require("passport");
const User = require("../models/user.js");
const Restaurant = require("../models/restaurant.js");


// Register controller for both 
const register = function (req, res) {
  if (req.url == "/register_user") {
    const { name, email, password, preference, contact } = req.body;
    let errors = [];
    if (
      !name ||
      !email ||
      !password ||
      !preference ||
      !contact
    ) {
      errors.push({ message: "All Fields are required." });
    }

    if (password.length < 6) {
      errors.push({ msg: 'Password must be at least 6 characters' });
    }

    if (errors.length > 0) {
      res.render('user_register', {
        errors,
        title: 'User',
        name,
        email,
        password,
        preference,
        contact
      });
    } else {

      User.findOne({ email: email }).then(user => {
        if (user) {
          errors.push({ msg: 'Email already exists' });
          res.render('user_register', {
            errors,
            title: 'User',
            name,
            email,
            password,
            preference,
            contact
          });
        } else {

          const user = new User();

          user.name = name.trim();
          user.email = email;
          user.preference = preference;
          user.contact = contact;
          user.setPassword(password);

          user.save().then(user => {
            req.flash(
              'success_msg',
              'You are now registered and can log in'
            );
            res.redirect('/register_user');
          }).catch(err => console.log(err));

        }
      })

    }

  }
  else if (req.url == "/register_restaurant") {
    const { name, restaurant_name, email, password, contact } = req.body;
    let errors = [];
    if (
      !name ||
      !email ||
      !password ||
      !restaurant_name ||
      !contact
    ) {
      errors.push({ message: "All Fields are required." });
    }

    if (password.length < 6) {
      errors.push({ msg: 'Password must be at least 6 characters' });
    }

    if (errors.length > 0) {
      res.render('restaurant_register', {
        errors,
        title: '',
        name,
        email,
        password,
        restaurant_name,
        contact
      });
    } else {

      Restaurant.findOne({ email: email }).then(rest => {
        if (rest) {
          errors.push({ msg: 'Email already exists' });
          res.render('restaurant_register', {
            errors,
            title: 'Restaurant',
            name,
            email,
            password,
            restaurant_name,
            contact
          });
        } else {

          const rest = new Restaurant();

          rest.name = name.trim();
          rest.email = email;
          rest.restaurant_name = restaurant_name;
          rest.contact = contact;
          rest.setPassword(password);

          rest.save().then(rest => {
            req.flash(
              'success_msg',
              'You are now registered and can log in'
            );
            res.redirect('/register_restaurant');
          }).catch(err => console.log(err));
        }
      })

    }
  }
}

// Login controller for both
const login = (req, res, next) => {
  passport.authenticate("user", function (err, user, info) {
    if (err) { return next(err); }
    if (!user) {
      if(info)
      req.flash('error_msg', info.message);

      return res.redirect('/login');
    }
    req.logIn(user, function (err) {
      if (err) { return next(err); }
      if (user.role == 'USER')
        return res.redirect('user_dashboard');
      else
        return res.redirect('restaurant_dashboard');
    });
  })(req, res, next);
}

// Controllers for getting different pages
const getHomePage = function (req, res, next) {
  res.render('index', { title: 'Foodshala' });
}

const getRestaurantRegisterPage = function (req, res, next) {
  res.render('restaurant_register', { title: 'Restaurant' });
}

const getUserRegisterPage = function (req, res, next) {
  res.render('user_register', { title: 'User' });
}

const getLoginPage = function (req, res, next) {
  res.render('login', { title: 'Login' });
}

// Controllers of dashboards for both
const getUserDashboard = function (req, res, next) {
  res.render('user_dashboard', { title: 'Dashboard', name: req.user.name });
}

const getRestaurantDashboard = function (req, res, next) {
  res.render('restaurant_dashboard', { title: 'Dashboard', name: req.user.name });
}



module.exports = {
  register,
  login,
  getHomePage,
  getUserRegisterPage,
  getRestaurantRegisterPage,
  getLoginPage,
  getUserDashboard,
  getRestaurantDashboard,
}