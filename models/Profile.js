const mongoose = require('mongoose');
const schema = mongoose.Schema;

const profileSchema = new schema({
    name: {
        type: String
    },
    avatar: {
        type: String
    },
    handle: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    website: {
        type: String,
    },
    bio: {
        type: String,
        max: 300
    },
    location: {
        type: String
    },
    hobbies: {
        type: [String]
    },
    countries: {
        type: [String]
    },
    places: {
        type: [String]
    },

    following: [{
        handle: {
            type: String
        },
        name: {
            type: String
        },
        avatar: {
            type: String
        },
        dateCreated: {
            type: Date,
            default: Date.now()
        }
    }],

    followers: [{
        handle: {
            type: String
        },
        name: {
            type: String
        },
        avatar: {
            type: String
        },
        dateCreated: {
            type: Date,
            default: Date.now()
        }
    }]

});

module.exports = Profile = mongoose.model('profiles', profileSchema);