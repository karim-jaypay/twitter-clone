import express from 'express';
import {Login ,createUser, secregisterUser, postt, verifyToken,} from '../controllers/users.js';

    const router = express.Router();


    router.post('/create', createUser)
    /* router.post('/login', Login) */
    router.post('/update', secregisterUser)

    router.post('/login', function(req, res) {
        
        passport.authenticate('local', function(err, user, info) {
            console.log(err,user,info)
            if(err) res.send(err)
            else {
                console.log(user)
                res.status(200).json({loggedIn: true});
            }
        })
    })


export default router;