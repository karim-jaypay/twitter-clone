import express from 'express';
import { /* getAll , */createTweet, /* getById  */} from '../controllers/tweets.js';

const router = express.Router();


router.post('/create', createTweet)
/* router.post('/getAll', getAll)
router.post('/get?=id', getById) */

/* router.post('/post', verifyToken, postt) */

export default router;