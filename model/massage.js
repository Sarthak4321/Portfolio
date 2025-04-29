const mongoose = require ('mongoose');
const { string } = require('postcss-selector-parser');

const massageSchema = new mongoose.Schema({
    email:{
        type:string,
        required:true
    },
    text:{
        type:String,
    }
});

const Massage = mongoose.model('Massage', massageSchema);
module.exports = Massage;