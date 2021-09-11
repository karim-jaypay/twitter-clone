import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import session from 'express-session'
import cookieParser from 'cookie-parser';

import passport from 'passport'
import initializePassport from './passport-config.js'

import UserRoutes from './routes/users.js';
import TweetsRoutes from './routes/tweets.js'
import UserMessage from './models/UserMessage.js';

/*-- initialize passport --*/
initializePassport(passport,
       email => UserMessage.findOne({email: email}),
       id => UserMessage.findOne({_id: _id})
)

const app = express();


app.use(express.json({ limit: "30mb", extended: true}));
app.use(express.urlencoded({ limit: "30mb", extended: true}));
app.use(cors({
       origin: ["http://localhost:3000"],
       methods: ["GET", "POST"],
       credentials: true
}));

app.use(cookieParser()) 

app.use(session({
       key: "user",
       secret: "sjaljfjcldjfs!@##sdlfjldkf",
       resave: false,
       saveUninitialized: false,
       cookie: {
              httpOnly: true,
              /* secure: true, */
              maxAge: 60 * 60 * 24, // expires in 24 hours
       }
}))

app.use(passport.initialize())
app.use(passport.session())


// API Routes
app.use('/register', UserRoutes)
app.post('/login',  (req, res) => {
       passport.authenticate('local', (err, user, info) => {
         if (err) {
           console.log(error)
         } else
         if (!user && info) {
            return res.send(info);
         } 
         if( user ) {
              req.session.user = user
              return res.send({LoggedIn: true})
         }
     
       })(req, res);
       })
       
app.use('/tweets', checkAuthenticated, TweetsRoutes)


function checkAuthenticated(req, res, next) {
       if(req.isAuthenticated()) {
              return next()
       } 
}

const CONNECTION_URL = 'mongodb+srv://karimdarakji:Karim@123@cluster0.aw1wt.mongodb.net/twitterclone?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
       .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
       .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);