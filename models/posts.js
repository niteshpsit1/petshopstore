var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'Users', require : true },
    text: { type: String, require : true, trim : true },
    image: { type: String , trim : true },
    likes: [ { _id: { type: Schema.Types.ObjectId, ref: 'Users'}, name : String } ],
    commnents: [{ type: Schema.Types.ObjectId,  ref: 'Users' }]
});

module.exports = mongoose.model('Posts', PostSchema);