var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PetSchema   = new Schema({
    name: String,
    cost:Number,
});

module.exports = mongoose.model('Pet', PetSchema);