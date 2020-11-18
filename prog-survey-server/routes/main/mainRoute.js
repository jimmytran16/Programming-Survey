const express = require('express');
const router = express.Router();
const PLang = require('../../model/plang');
const Vote = require('../../helpers/Vote');

router.get('/', (req,res) => {
    // retrieve all of the data from mongodb
    PLang.find({},(err,data) => {
        if(err) { console.log(err); return null; }
        else {
            res.status(200).json({
                data: data === null ? 'Error getting retrieving data' : data
            })
        }
    })
})

router.post('/submitVote', (req,res) => {
    console.log(req.body);
    Vote.saveVoteOntoDatabase(req.body.option, (err,response) => {
        if (err) {
            res.json({
                success: true,
                message: err
            })
        }
        else{
            res.json({
                success: false,
                message: 'successfully counted the vote!'
            })
        }
    })
})

module.exports = router;