const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        isVerified: {
            type: Boolean,
            required: true,
            default: false,
        },
        fname: {
            type: String,
            required: true,
        },
        username: {    // Unique username which can be changed anytime
            type: String,
            required: true,
        },
        email: {
            type: String,
        },
        pNumber: {
            type: String,
        },
        signUpMethod: {
            type: String,
        },
        password: {
            type: String,
            // require: true,
        },
        isPremium: {
            type: Boolean,
            required: true,
            default: false
        },
        ipAddress: {
            type: Array,
            required:true,
        }

    },
    { timestamps: true }
);
const User = mongoose.model('user', userSchema);

module.exports = { User };
