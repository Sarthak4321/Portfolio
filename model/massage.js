const mongoose = require ('mongoose');

const massageSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    text:{
        type:String,
    }
});

const Massage = mongoose.model('Massage', massageSchema);
module.exports = Massage;