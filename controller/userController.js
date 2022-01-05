const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../Model/userModel");
var nodemailer = require("nodemailer");
const app = express();

// user registered

exports.register = async (req, res, next) => {
  try {
    // const salt = await bcrypt.genSalt(10);
    // const hash = await bcrypt.hash(req.body.password, salt);
    var user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    const token = await user.ganerateAuthToken();
    user.save(function (err) {
      res.json({
        message: "Record Registerd Successfully",
        data: user,
      });
    });
  } catch (error) {
    res.json({
      message: "Error find in when registerd the record",
    });
  }
};

// user login

exports.login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await Admin.findOne({ email: email });
    const isMatch = await bcrypt.compare(password, user.password);
    const token = await user.ganerateAuthToken();

    if (isMatch) {
      res.json({
        message: "You successfully login",
        data: user,
      });
    } else {
      res.json({
        message: "Invalid Password Details",
      });
    }
  } catch (error) {
    return res.send(error);
  }
};

let mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "shadabakhtar476@gmail.com",
    pass: "razaraza",
  },
});
exports.mailSend = async (req, res) => {
  email = req.body.email;
  const user = await User.findOne({ email: email });
  try {
    if (user) {
      var mailOptions = {
        to: req.body.email,
        subject: "email check for mail sent or not",
        html:
          "<h4>email for  varification</h4>" +
          "<h1 style='font-weight:bold;'>" +
          " http://localhost:3000/forget-password=" +
          req.body.email +
          "</h1>",
      };
      mailTransporter.sendMail(mailOptions, (error, info) => {
        res.json({
          message: "Your mail sent successfully",
        });
      });
    } else {
      res.json({
        message: "Please Enter the valid email address",
      });
    }
  } catch (error) {}
};
