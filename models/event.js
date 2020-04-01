const mongoose = require("mongoose");
const Schema = mongoose.Schema; // instancier Schema

const eventShema = new Schema( {
        titre : {
            type : String,
            maxlength:128,
            index:true,
            trim:true,
            required : true
        },

        description : {
            type : String,
            required: true,
            maxlength:520,
            index:true,
            trim:true
        },

        sujet : {
            type: String,
            required: true,
            maxlength:1024,
            index:true,
            trim:true
        },

        date : {
            type: Date,
            required: true 
        },
        lieu:{
            type:String,
            maxlength:128,
            index:true,
            trim:true 
        },
        fraisInsc:{
            type:Number,
            required:true
        },
        creator:{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }
);


module.exports= mongoose.model('Event', eventShema);