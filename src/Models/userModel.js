const{conn, mongoose} = require('../services/mongoose');

let UserSchema = new mongoose.Schema({
    firstName: {
        required: true,
        type: String
    },
    lastName: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true,
    },
    gender: {
        type: Boolean,
    },
    dob:{
        type : String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    token:{
        type : String,
    },
});
module.exports = UserModel = mongoose.model('User', UserSchema);