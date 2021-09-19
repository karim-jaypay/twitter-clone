import mongoose from 'mongoose';
import passportLocalMongoose from "passport-local-mongoose";

const Session = new mongoose.Schema({
    refreshToken: {
      type: String,
      default: "",
    },
  })

const User = mongoose.Schema({
    name: {
        type: String,
        min: 2,
    },
    username: {
        type: String,
        min: 6,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
       
    },
    birth: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    active: {
        type: Number,
    },
    refreshToken: {
        type: [Session],
    },
});

//Remove refreshToken from the response
User.set("toJSON", {
    transform: function (doc, ret, options) {
      delete ret.refreshToken
      return ret
    },
  })
  
User.plugin(passportLocalMongoose)

const UserMessage = mongoose.model('UserMessage', User);

export default UserMessage;