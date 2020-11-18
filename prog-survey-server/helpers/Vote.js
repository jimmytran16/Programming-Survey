const mongoose = require('mongoose');
const PLang = require('../model/plang');

// function to update the language count in the database
const saveVoteOntoDatabase = (option, cb) => {
    PLang.findOneAndUpdate({ name: option } , {$inc: { count:1 }}, function (err,response) {
        if (err) {
            cb(err,null)
        }else {
            cb(null,response)
        }
    })
}

// export the function
module.exports = {
    saveVoteOntoDatabase:saveVoteOntoDatabase
}