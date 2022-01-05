const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phonenumber: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      default: null,
    },
    tokens: [{ token: { type: String } }],
  },

  {
    timestamps: true,
  }
);

// userSchema.methods.ganerateAuthToken = async function () {
//   try {
//     console.log(this._id);
//     const token = jwt.sign(
//       { _id: this._id.toString() },
//       process.env.SECRET_KEY
//     );
//     this.tokens = this.tokens.concat({ token: token });
//     await this.save();
//     return token;
//   } catch (error) {
//     console.log();
//     `the error part      ${error}`;
//   }
// };

// // validate Password
// userSchema.methods.isValidPassword = async function (password) {
//   try {
//     return await bcrypt.compare(password, this.password);
//   } catch (error) {
//     console.log("in catch of validpassword");
//     console.log(error);
//     throw error;
//   }
// };
var User = mongoose.model("user", userSchema);
module.exports = User;
