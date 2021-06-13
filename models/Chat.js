var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var chatSchema = new Schema({
    name:  {
        type : String,
        default: null
    },
    participants:[{
        type:Schema.Types.ObjectId,
		ref:'user'
    }]
},{
	timestamps: true
});

module.exports = mongoose.model('chat', chatSchema);
