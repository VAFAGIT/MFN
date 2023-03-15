const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    author:{
        type: String,
        required: true,
    },

    ICE: {
        type: String,
        required: true,
        unique: true,
    },

    latitude: {
        type: String,
        required: true,
    },
    
    longitude: {
        type: String,
        required: true,
    },

    password: {
        type: String,   
        required: true,
    },
},
{
    timestamps: true,
});

module.exports = mongoose.model("users", userSchema);
