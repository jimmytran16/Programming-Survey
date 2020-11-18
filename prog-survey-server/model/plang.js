const mongoose = require('mongoose');


var pLangSchema = mongoose.Schema({
    name: { type: String, required: true },
    count : { type: Number, required: true },
})

// get the Post object from the model and export it
var PLang = mongoose.model('PLang',pLangSchema);

module.exports = PLang;