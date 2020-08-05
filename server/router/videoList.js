const express = require("express")
const router = express.Router()

const VideoDetails = require('../models/videoDetails');

router.get('/', (req, res, next) => {
    VideoDetails.find().exec().then(docs => {
        res.status(200).json(docs)
    }).catch(error => {
        res.status(500).json({error: error})
    })
    
})

module.exports = router