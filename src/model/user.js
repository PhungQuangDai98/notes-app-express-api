const {model, Schema, SchemaTypes} = require("mongoose");

const UserSchema = Schema({
  username: {
    type: SchemaTypes.String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: SchemaTypes.String,
    required: true,
    trim: true
  }
}, {timestamps: true});

const UserModel = model("user", UserSchema, "user");

module.exports = UserModel;
