import express from 'express';
import { createTweet, getAllTweets, /* getById  */} from '../controllers/tweets.js';

import { verifyUser } from '../authenticate.js';

const router = express.Router();


router.post('/create', verifyUser, createTweet)
router.post('/getalltweets', verifyUser, getAllTweets)
/*router.post('/get?=id', getById) */

export default router;