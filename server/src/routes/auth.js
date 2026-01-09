const express = require('express');
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");


router.post(
  "/register",
  body("username").notEmpty().withMessage("Enter your username"),
  body("username")
    .isLength({ min: 3, max: 15 })
    .withMessage("Must be between 3-15 characters"),
  body("email")
    .notEmpty().withMessage("Enter email")
    .isEmail().withMessage("Enter valid email"),
  body("password").notEmpty().withMessage("Enter a strong password"),
  body("password")
    .isLength({ min: 8, max: 32 })
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/\d/)
    .withMessage("Password must constain at least one number")
    .matches(/[^A-Za-z0-9]/)
    .withMessage("Password must contain at least one special character"),
  body("confirmPassword").notEmpty().withMessage("Enter a strong password"),

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(), old: req.body });
    }

    try {
      const { username, email, password, confirmPassword } = req.body;

      const existingUser = await User.findOne({
        $or: [
          { email: email.trim().toLowerCase() },
          { username: username.trim().toLowerCase() },
        ],
      });

      if (existingUser) {
        if (existingUser.email === email.trim().toLowerCase()) {
          return res
            .status(409)
            .json({ errors: [{ msg: "Email already exists" }], old: req.body });
        }
        if (existingUser.username === username.trim().toLowerCase()) {
          return res
            .status(409)
            .json({ errors: [{ msg: "Username taken" }], old: req.body });
        }
      }

      if (confirmPassword !== password) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Passwords don't match" }], old: req.body });
      }

      const hash = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        username,
        email,
        password: hash,
      });

      console.log(`User created, here are the details:\nUser: ${username}\nEmail:${email}\nPassword: ${hash}`)

      req.session.user = {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      };

      req.session.success = "Registered Successfully";
      res.status(201).json({ msg: "Registered Successfully" });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({
          errors: "Registration Failed, Please try again",
          old: req.body 
    });
    }
  }
);

router.post(
  "/login/",
  body("email")
    .notEmpty()
    .withMessage("Enter Your Email")
    .isEmail()
    .withMessage("Invalid Email Entered"),
  body("password").notEmpty().withMessage("Enter Your Password"),

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(), old: req.body });
    }

    try {
      const { email, password } = req.body;

      // include password explicitly because schema sets `select: false`
      const user = await User.findOne({ email: email.trim().toLowerCase() }).select('+password');

      if (!user) {
        return res.status(400).json({
          errors: [{ msg: "Invalid Email or Password" }],
          old: req.body,
        });
      }

      if (user.email !== email.trim().toLowerCase()) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Email doesn't exists" }] });
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return res.status(400).json({ errors: [{ msg: "Invalid Password" }], old: req.body });
      }

      req.session.user = {
        _id: user._id,
        username:user.username,
        email:user.email
      };
      req.session.success = 'Welcome Back!';
      res.status(200).json({msg: 'Log in Successful'})

    } catch (err) {
      console.error(err);
      res.status(500).json({errors: [{msg: "Login Failed! Try again later"}], old: req.body})
    }
  }
);

router.get('/logout',(req, res)=>{
  req.session.destroy(()=>{
    res.status(204);
  })
})

module.exports = router;
