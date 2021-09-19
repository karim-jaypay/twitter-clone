import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

import {createUser, secregisterUser, Logout } from '../controllers/users.js';

import UserMessage from '../models/UserMessage.js';

import { getToken, getRefreshToken, COOKIE_OPTIONS, verifyUser } from '../authenticate.js';

/*-- function to encode user info --*/
import crypto from 'crypto'
import { Buffer } from 'buffer'
const key = Buffer.from(process.env.EN_KEY,'base64'); 

function encrypt(text) {
   const iv = crypto.randomBytes(16);
   let cipher = crypto.createCipheriv( 
       'AES-128-CBC', key, iv);
   let encrypted = cipher.update(JSON.stringify(text));
   encrypted = Buffer.concat([iv, encrypted, cipher.final()]); 
   return encrypted.toString('hex');
}
/*---------------------------------*/

const router = express.Router();

router.get("/me", verifyUser, (req, res, next) => {
    res.send(req.user)
  })


    /*-- register user first step --*/
    router.post('/create', createUser)
    /*-- register user second step --*/
    router.post('/update', secregisterUser)

    /*-- login with passport local and passport jwt integration --*/
    router.post('/login', function(req,res,next) {

        passport.authenticate('local', function (err,user,info) {
        /*-- if error --*/
        if (err) { return next(err); }
        /*-- if email or pass incorrect --*/
        if(info) { 
            res.statusCode = 500
            res.send({message: info})
        }

        if(user) {
            const token = getToken({ _id: user._id })
            const refreshToken = getRefreshToken({ _id: user._id })

            user.refreshToken.push({ refreshToken })

                user.save((err, user) => {

                    if (err) {
                      res.statusCode = 500
                      res.send(err)
                    } else {
                      const userInfo = {id: user._id, name: user.name, username: user.username, email: user.email, active: user.active, token}
                      const data = encrypt(userInfo)
                      res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
                      res.send({ success: true, data })
                    }
                })
            }        
        })(req,res,next)
    })


    /*-- refresh token api --*/
    router.post("/refreshToken", (req, res, next) => {

        /*-- retrieve refresh token from signed cookies --*/
        const { signedCookies = {} } = req
        const { refreshToken } = signedCookies
      
        if (refreshToken) {
          try {

            /*-- we verify the refresh token against the secret used to create the token and extract payload--*/
            const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
            const userId = payload._id

            UserMessage.findOne({ _id: userId }).then(
              user => {
                if (user) {
                  // Find the refresh token against the user record in database
                  const tokenIndex = user.refreshToken.findIndex(
                    item => item.refreshToken === refreshToken
                  )
      
                  if (tokenIndex === -1) {
                    res.statusCode = 401
                    res.send("Unauthorized, token not found")
                  } else {
                    const token = getToken({ _id: userId })
                    // If the refresh token exists, then create new one and replace it.
                    const newRefreshToken = getRefreshToken({ _id: userId })
                    user.refreshToken[tokenIndex] = { refreshToken: newRefreshToken }

                    user.save((err, user) => {
                      if (err) {
                        res.statusCode = 500
                        res.send(err)
                      } else {
                        const userInfo = {id: user._id, name: user.name, username: user.username, email: user.email, active: user.active, token}
                        const data = encrypt(userInfo)
                        res.cookie("refreshToken", newRefreshToken, COOKIE_OPTIONS)
                        res.send({ success: true, data })
                      }
                    })
                  }
                } else {
                  res.statusCode = 401
                  res.send("Unauthorized, user not found")
                }
              },
              err => next(err)
            )
          } catch (err) {
            res.statusCode = 401
            res.send("Unauthorized,"+ err)
          }
        } else {
          res.statusCode = 401
          res.send("Unauthorized, no refresh token")
        }
      })

    /*-- logout user --*/
    router.get('/logout', verifyUser, Logout)

export default router;