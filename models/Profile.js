const mongoose = require('mongoose');
const schema = mongoose.Schema;

const profileSchema = new schema({
    user: {
        type: schema.Types.ObjectId,
        ref: 'users'
    },
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
    // phone: {
    //     type: String
    // },
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
        user: {
            type: schema.Types.ObjectId,
            ref: 'users'
        },
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
        user: {
            type: schema.Types.ObjectId,
            ref: 'users'
        },
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

    social: {
        youtube: {
            type: String
        },
        twitter: {
            type: String
        },
        facebook: {
            type: String
        }
    }

});

module.exports = Profile = mongoose.model('profiles', profileSchema);