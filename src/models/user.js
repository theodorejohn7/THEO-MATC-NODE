const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Schema = mongoose.Schema;

const { JWT_SECRET } = process.env;
const { REFRESH_TOKEN_SECRET } = process.env;
const { ACCESS_EXPIRY } = process.env;
const { REFRESH_EXPIRY } = process.env;



const UserSchema = new Schema({
  name: {
    type: String,
  },
 
  eMail: {
    type: String,
  },
  password: {
    type: String,
  },

  token: {
    type: String,
  },

  refreshToken: {
    type: String,
  },

  userName: {
    type: String,
  },
  address: {
    type: String,
  },
  pincode: {
    type: Number,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
  secQuestion: {
    type: String,
  },
  secAnswer: {
    type: String,
  },
});

UserSchema.methods.generateAuthToken = function () {
  const User = this;
  const secret = JWT_SECRET;
  const token = jwt.sign({ _id: User._id }, secret, {
    expiresIn: `${ACCESS_EXPIRY}`,
  });

  User.token = token;

};

UserSchema.methods.generateRefreshToken = function () {
  const User = this;
 
  const secret = REFRESH_TOKEN_SECRET;
  const refreshToken = jwt.sign({ _id: User._id }, secret, {
    expiresIn: `${REFRESH_EXPIRY}`,
  });
  User.refreshToken = refreshToken;
  

};

UserSchema.pre("save", async function (next) {
  const User = this;
  if (User.isModified("password")) {
    User.password = await bcryptjs.hash(User.password, 12);
  }
  next();
});

const User = mongoose.model("user", UserSchema);
module.exports = User;
