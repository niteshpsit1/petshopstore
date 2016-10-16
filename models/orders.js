var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
    customer: { id :{ type: Schema.Types.ObjectId, ref: 'User' }, name: String },
    pets: [{ type: Schema.Types.ObjectId, ref: 'Pet' }],
    total:{ type: Number, required: true, unique: true },
});

module.exports = mongoose.model('Orders', OrderSchema);