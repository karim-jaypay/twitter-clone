import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const Session = new mongoose.Schema({
  refreshToken: {
    type: String,
    default: "",
    expires: 60 * 60 * 24 * 30,
  },
});

const User = mongoose.Schema({
  name: {
    type: String,
    min: 2,
  },
  username: {
    type: String,
    min: 6,
    default: undefined,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  birthDate: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  active: {
    type: Number,
    default: 0,
  },
  picture: {
    type: String,
    default: undefined,
  },
  refreshToken: {
    type: [Session],
  },
});

//Remove refreshToken from the response
User.set("toJSON", {
  transform: function (doc, ret, options) {
    delete ret.refreshToken;
    return ret;
  },
});

User.plugin(passportLocalMongoose);

const UserMessage = mongoose.model("UserMessage", User);

export default UserMessage;
