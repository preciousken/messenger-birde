// importing the required modules
const { default: mongoose } = require('mongoose');
const { User } = require('../model/user');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


const registerUser = async (req, res) => {

    try {
        // creating the error object
        var error;
        // getting the form data
        const body = req.body;



        // manually give the dateofbirth
        // body.dateOfBirth = new Date(Date.now())


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


   

        // query the database if the topics (interestIds) exist in the Database
        // const checker = []
        // const data = ["646271b444248aaa6138fe7e", "646275352e144f86a6f13bec", "646393def4bc2c7a6c6b38c2"]
        // data.forEach(async data => {
        //     let exist = await SubTip.findById(data)
        //     // if (!exist) {
        //     //     error = 'DATA_ERROR';
        //     //     res.status(401).json({
        //     //         status: false,
        //     //         message: "You've got some errors, Kindly provide valid topics of interest",
        //     //         error: error,
        //     //     });
        //     //     return;
        //     // }
        //     if(exist !== null){
        //         exist='true'
        //     }
        //     console.log(exist);
        //     checker.push(await exist)
        // });


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

                
                res.status(200).json({
                    status: true,
                    message: "Signed Up successfully, Go and confirm your email",
                    data: savedUser
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


module.exports={
    registerUser,
}