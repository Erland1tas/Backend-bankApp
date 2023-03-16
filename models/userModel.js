const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const usersSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "email required"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "enter correct email"],
  },
  password: {
    type: String,
    required: [true, "password required"],
    minlength: 6,
  },
});

usersSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
});

usersSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  console.log(user);
};

module.exports = mongoose.model("Users", usersSchema);
