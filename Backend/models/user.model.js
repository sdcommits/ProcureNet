const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    personalDetails: {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        dob: {
            type: Date,
            // required: true,
        }, 
        phoneNumber: {
            type: String,
            // required: true,
        },
        // residentialAddress: {
        //     type: String,
        //     // required: true,
        // },
        password:{
            type: String,
            required: true,
        },
        userId:{
            type:String,
            required:true
        }
      
    },
    authenticationDetails: {
        aadharCardNumber: {
            type: String,
            required: true,
        },
        // panCardNumber: {
        //     type: String,
        //     required: true,
        // }
    }
});

const User = mongoose.model('user', userSchema);
module.exports = User;