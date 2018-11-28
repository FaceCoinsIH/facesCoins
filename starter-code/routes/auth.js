const express = require("express");

const passport = require("passport");
const router = express.Router();
const User = require("../models/User");
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");




// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.get("/login", ensureLoggedOut(), (req, res, next) => {
  res.render("auth/login", { message: req.flash("error") });
});

router.post(
  "/login",
  ensureLoggedOut(),
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
    failureFlash: true,
    passReqToCallback: true
  })
);

router.get("/signup", ensureLoggedOut(),(req, res, next) => {
  res.render("auth/signup");
});


router.post("/signup",ensureLoggedOut(), (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  if (username === "" || password === "" || email === "") {
    res.render("auth/signup", { message: "Please fully complete the form" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }

    User.findOne({ email }, "email", (err, email) => {
      if (email !== null) {
        res.render("auth/signup", { message: "The email already exists" });
        return;
      }
    });


            res.render("auth/signup", { message: "The username already exists" });
            return;
        }


    const newUser = new User({
      username,
      password: hashPass,
      email: email
    });

    newUser.save((err) => {
      if (err){ next(null, false, { message: newUser.errors }) }
      res.redirect("/");

    });
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;

