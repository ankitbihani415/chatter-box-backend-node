var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var messageSchema = new Schema({
    message:  {
        type : String,
        required: true
    },
    chat_id:[{
        type:Schema.Types.ObjectId,
		ref:'chat'
    }],
    sender_id:{
        type:Schema.Types.ObjectId,
        ref:'user'
    }
},{
	timestamps: true
});

module.exports = mongoose.model('message', messageSchema);
