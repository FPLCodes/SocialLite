const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  photoURL: {
    type: String,
    required: true,
  },
  uid: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  friendRequests: {
    type: Array,
  },
});

const UserProfile = model("userProfile", UserSchema);

module.exports = UserProfile;
