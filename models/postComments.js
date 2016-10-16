var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentsSchema = new Schema({
    post: { type: Schema.Types.ObjectId, ref: 'Posts' },
    user: { type: Schema.Types.ObjectId,  ref: 'User' },
    text: { type: String, require : true, trim : true },
    likes: [ { _id: Schema.Types.ObjectId, ref: 'User' } ]
});

module.exports = mongoose.model('Comments', CommentsSchema);