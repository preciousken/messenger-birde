// importing the required modules
const { default: mongoose } = require('mongoose');
const { User } = require('../model/user');
const bcrypt = require('bcrypt');
const useragent = require('useragent');
var jwt = require('jsonwebtoken');


const registerUser = async (req, res) => {

    // getting the ipAddress
    let ipAddress = req.ipAddress

    try {
        // creating the error object
        var error;
        // getting the form data
        const body = req.body;

        // attaching the ipAddress to the body Object
        body.ipAddress = ipAddress



        // checking for error in the form data
        if (!body.email) {
            error = 'DATA_ERROR';
            res.status(400).json({
                status: false,
                message: "Provide your Email",
                error: error,
            });
            return;
        }

        if (!body.pNumber) {
            error = 'DATA_ERROR';
            res.status(400).json({
                status: false,
                message: "Provide your phone number",
                error: error,
            });
            return;
        }

        // Ensure that the phone is sent from client as a string
        if (typeof body.pNumber !== "string") {
            error = 'VALIDATION_ERROR';
            res.status(400).json({
                status: false,
                message: "Provide your phone number as a string",
                error: error,
            });
            return;
        }

        if (!body.fname) {
            error = 'DATA_ERROR';
            res.status(400).json({
                status: false,
                message: "Provide your name",
                error: error,
            });
            return;
        }
        if (!body.username) {
            error = 'DATA_ERROR';
            res.status(400).json({
                status: false,
                message: "Provide your username",
                error: error,
            });
            return;
        }

        // making the form data case insensitive
        body.email = body.email.toLowerCase();
        body.fname = body.fname.toLowerCase();
        body.username = body.username.toLowerCase();


        // check if he is already a user

        const eUserExist = await User.findOne({ email: body.email });;
        const pNumberUserExist = await User.findOne({ pNumber: body.pNumber });
        const usernUserExist = await User.findOne({ username: body.username });


        // handling error if the user already exist
        if (eUserExist || pNumberUserExist || usernUserExist) {
            error = "DUPLICATE_USER_ERROR"
            res.status(401).json({
                status: false,
                message: "You've got some errors",
                error: error
            })
            return;
        }

        if (!body.password) {
            error = 'DATA_ERROR';
            res.status(400).json({
                status: false,
                message: "Provide your password",
                error: error,
            });
            return;
        }


        // add user to the database

        // hashing the password and saving to the db
        bcrypt.genSalt(10, async function (err, salt) {
            bcrypt.hash(body.password, salt, async function (err, hash) {
                // Store hash in your password DB.
                // attaching the _id to body object
                body._id = new mongoose.Types.ObjectId;
                // attaching the hash to body object
                body.password = hash
                const user = new User(body);
                const savedUser = await user.save();
                const filtered = savedUser.toObject();

                delete filtered.password;


                res.status(200).json({
                    status: true,
                    message: "Signed Up successfully, Go and confirm your email",
                    data: filtered
                })
                return;
            });
        });


    } catch (error) {
        console.log(error);
        error = 'UNKNOWN_ERROR';
        res.status(400).json({
            status: false,
            message: "You've got some errors.",
            error: error,
        });
        return;
    }
};


module.exports = {
    registerUser,
}