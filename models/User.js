var mongoose = require('mongoose');

// Import Helpers
const {randomInt} = require('../helpers');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    name:  {
        type : String,
        default: null
    },
    phone: String,
    password:   String,
    phone_verification_code:{
        type: Number,
        default: randomInt()
    },
    phone_verified_at : {
        type: Date,
        default: null
    },
    type:{
    	type:String,
    	enum:['admin','user'],
    	default:'user'
    },
    blocked:{
        type:Boolean,
        default:false
    }
},{
	timestamps: true
});

module.exports = mongoose.model('user', userSchema);
