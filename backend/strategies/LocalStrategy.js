import passport from "passport"
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt'

import User from '../models/UserMessage.js'

//Called during login/sign up.
const authenticateUser = async (email, password, done) => {
    
    const user = await User.findOne({email: email})

    if(user == null) {
        return done(null, false, { message: 'No user with that email'})
    }
    bcrypt.compare(password, user.password, function(err, resp) { 
        if(resp)
        return done(null, user)
    else {
        return done(null, false, { message: 'Password incorrect'})
    }
    })

}

passport.use(new LocalStrategy({ usernameField: 'email' },
authenticateUser))
/*-- called to put data in req.user --*/
passport.serializeUser((user, done) => done(null, user._id))
passport.deserializeUser((id, done) => {
    return done(null, getUserById(id))
}
)
