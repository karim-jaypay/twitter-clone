import tweets from '../models/tweets.js'
import UserMessage from '../models/UserMessage.js'

import mongoose from 'mongoose'

export const createTweet = async (req, res) => {

    const data = req.body
    const tweet = new tweets(data)
    
    try {
        await UserMessage.findOne({
            _id: { $in: [
                mongoose.Types.ObjectId(data.user_id)
            ]}
        }, function( error, user) {
            if(user){

                tweet.save()
                res.status(200).send('tweet sent')
            } else res.send({message: 'user not found'})
            }
        );

    } catch (error) {
        res.status(404).json({ message: error.message });
        
    }
} 

export const getAllTweets = async (req, res) => {

    const { userid } = req.body

    try {
        const alltweets = await tweets.find({ userid })

        if(alltweets)
            res.status(200).json({ alltweets })
        else res.status(200).json({ message: 'no tweets' })
    } catch (error) {
        console.log(error)
    }
}