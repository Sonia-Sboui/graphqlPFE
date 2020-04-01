const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//const Role = "admin" | "dentiste" | "prothesiste" | "etudiant" | "annonceur" | "grand public"|"user";
 //const roles = ["admin", "dentiste", "prothesiste", "etudiant", "annonceur", "grand public","user"];
const User = new Schema({
    email : {
        type : String,
        required : true,
        match: /^\S+@\S+\.\S+$/,
        unique: true, 
        trim: true, 
        lowercase: true 
            },
    password :{
        type : String,
        required: true,
        minlength:8,
        maxlength:128
    },
    nom :{
        type: String,
        required: true,
        maxlength:128,
        trim:true,
        index:true
    },
    prenom :{
        type: String,
        required: true,
        maxlength:128,
        trim:true,
        index:true
    },
    nationalite :{
        type: String,
        required: true,
        maxlength:128,
        trim:true,
        index:true
    },
    civilite :{
        type: String,
        required: true,
        maxlength:1,
        trim:true,
        index:true
    },
    telFixe:{
         type: Number,
         require:false,
         trim:true,
         index:true
        },
    telMobile:{ 
        type:Number,
        require:true,
        trim:true,
        index:true
    },

    // adresse: [
    //     {
    //       pays: {String,require:true,maxlength:128,trim:true,index:true},
    //       gouvernerat: {String,require:true,maxlength:128,trim:true,index:true},
    //       delegation: {String,require:true,maxlength:128,trim:true,index:true},
    //       codePostal: {Number,require:true,trim:true,index:true},
    //     }
    //   ],
//      numTel: [
//     {
//       telFixe: number,require:true,trim:true,index:true,
//       telMobile: number,require:true,trim:true,index:true,
//     }
//   ],
  // role: { type: String, enum: roles},
   createdEvent : [
    {
        type : Schema.Types.ObjectId,
        ref: 'Event' // fait ref au Event dans event.js

    }]
});
module.exports = mongoose.model('User',User)