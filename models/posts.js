var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', require : true },
    text: { type: String, require : true, trim : true },
    image: { type: String , trim : true },
    likes: [ { _id: Schema.Types.ObjectId, ref: 'User', name : String } ],
    commnents: [{ type: Schema.Types.ObjectId,  ref: 'User' }]
});

module.exports = mongoose.model('Posts', PostSchema);