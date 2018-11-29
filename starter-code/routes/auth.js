const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const mail = require("../mail/transporter");

router.get("/login",  ensureLoggedOut("/main"),(req, res, next) => {
  res.render("auth/login", { message: req.flash("error") });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/main",
    failureRedirect: "/auth/login",
    failureFlash: true,
    passReqToCallback: true
  })
);

router.get("/signup", ensureLoggedOut("/main"), (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", ensureLoggedOut(), (req, res, next) => {
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

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const characters =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let token = "";
    for (let i = 0; i < 25; i++) {
    token += characters[Math.floor(Math.random() * characters.length)];
    }


    const newUser = new User({
      username,
      password: hashPass,
      email: email,
      confirmationCode: token
    });

    newUser.save()
    .then(() => {
        mail
          .sendMail({
            from: "smvironhack@gmail.com",
            to: email,
            subject: "Email Verification",
            text: "Please click below to confirm your email address and get your access token:",
            html: `<b>http://localhost:3000/auth/confirm/${token}</b>`
          })
          .then(res.render("auth/verification"))
          .catch(error => console.log(error));
    
    })
    .catch(err => {
        res.render("auth/signup", { message: err });
      });
  });
});


router.get("/confirm/:confirmCode", (req, res, next) => {
    code = req.params.confirmCode;
  
    User.findOneAndUpdate({confirmationCode:code}, { $set: {status:'Active'} }, { new: true }).then(user=>{
        res.redirect("/");
    })
    
  });


router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
